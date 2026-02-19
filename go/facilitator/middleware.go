package facilitator

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
)

const x402Version = 2

// RoutePaymentConfig defines the payment requirements for a route.
type RoutePaymentConfig struct {
	// Price in asset units (e.g. "0.01")
	Price string
	// Asset symbol (e.g. "USDC")
	Asset string
	// Blockchain network (e.g. "base-sepolia")
	Network string
	// Recipient address
	PayTo string
	// Human-readable description of the resource
	Description string
	// Maximum deadline in seconds for the payment
	MaxDeadlineSeconds int
}

func (r *RoutePaymentConfig) setDefaults() {
	if r.Network == "" {
		r.Network = "base-sepolia"
	}
	if r.MaxDeadlineSeconds == 0 {
		r.MaxDeadlineSeconds = 60
	}
}

// RouteMatcher determines whether a request path requires payment.
type RouteMatcher func(path string) *RoutePaymentConfig

// ExactRoutes creates a RouteMatcher from a map of exact path → config.
func ExactRoutes(routes map[string]RoutePaymentConfig) RouteMatcher {
	return func(path string) *RoutePaymentConfig {
		if cfg, ok := routes[path]; ok {
			cfg.setDefaults()
			return &cfg
		}
		return nil
	}
}

// PrefixRoutes creates a RouteMatcher that matches path prefixes.
func PrefixRoutes(routes map[string]RoutePaymentConfig) RouteMatcher {
	return func(path string) *RoutePaymentConfig {
		for prefix, cfg := range routes {
			if strings.HasPrefix(path, prefix) {
				cfg.setDefaults()
				return &cfg
			}
		}
		return nil
	}
}

// MiddlewareConfig configures the x402 payment middleware.
type MiddlewareConfig struct {
	// Client is the facilitator client to use for verify/settle.
	Client *HTTPFacilitatorClient
	// Matcher determines which routes require payment.
	Matcher RouteMatcher
}

// paymentRequiredBody is the 402 response body.
type paymentRequiredBody struct {
	X402Version int                    `json:"x402Version"`
	Error       string                 `json:"error"`
	Accepts     []paymentRequirements  `json:"accepts"`
}

type paymentRequirements struct {
	Scheme            string        `json:"scheme"`
	Network           string        `json:"network"`
	Asset             string        `json:"asset"`
	Amount            string        `json:"amount"`
	PayTo             string        `json:"payTo"`
	MaxTimeoutSeconds int           `json:"maxTimeoutSeconds"`
	Resource          *resourceInfo `json:"resource,omitempty"`
}

type resourceInfo struct {
	URL         string `json:"url"`
	Method      string `json:"method"`
	Description string `json:"description,omitempty"`
}

// PaymentMiddleware returns an http.Handler that enforces x402 payments on
// configured routes. Requests to non-payment routes pass through directly.
//
// Usage:
//
//	client, _ := facilitator.NewFacilitatorClient(nil)
//	handler := facilitator.PaymentMiddleware(facilitator.MiddlewareConfig{
//	    Client: client,
//	    Matcher: facilitator.ExactRoutes(map[string]facilitator.RoutePaymentConfig{
//	        "/api/resource": {Price: "0.01", Asset: "USDC", Network: "base-sepolia", PayTo: "0x..."},
//	    }),
//	})(yourHandler)
func PaymentMiddleware(cfg MiddlewareConfig) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			route := cfg.Matcher(r.URL.Path)
			if route == nil {
				next.ServeHTTP(w, r)
				return
			}

			paymentHeader := r.Header.Get("X-Payment")
			if paymentHeader == "" {
				paymentHeader = r.Header.Get("Payment-Signature")
			}

			reqURL := requestURL(r)
			requirements := paymentRequirements{
				Scheme:            "exact",
				Network:           route.Network,
				Asset:             route.Asset,
				Amount:            route.Price,
				PayTo:             route.PayTo,
				MaxTimeoutSeconds: route.MaxDeadlineSeconds,
				Resource: &resourceInfo{
					URL:         reqURL,
					Method:      r.Method,
					Description: route.Description,
				},
			}

			if paymentHeader == "" {
				writePaymentRequired(w, requirements)
				return
			}

			// Parse payment payload from header
			var paymentPayload interface{}
			if err := json.Unmarshal([]byte(paymentHeader), &paymentPayload); err != nil {
				// Treat as opaque token
				paymentPayload = map[string]string{"token": paymentHeader}
			}

			// Verify payment
			ctx := r.Context()
			verifyResult, err := cfg.Client.Verify(ctx, paymentPayload, requirements)
			if err != nil {
				writeError(w, http.StatusPaymentRequired, fmt.Sprintf("Payment verification failed: %v", err))
				return
			}
			if !verifyResult.Valid {
				msg := verifyResult.Message
				if msg == "" {
					msg = "Payment verification failed"
				}
				writeError(w, http.StatusPaymentRequired, msg)
				return
			}

			// Buffer the response to check status before settling
			recorder := &responseRecorder{
				ResponseWriter: w,
				statusCode:     http.StatusOK,
			}

			next.ServeHTTP(recorder, r)

			// If downstream returned error, don't settle
			if recorder.statusCode >= 400 {
				return
			}

			// Settle the payment
			settleResult, err := cfg.Client.Settle(ctx, paymentPayload, requirements)
			if err != nil {
				// Response already sent; log but can't change status
				return
			}
			if settleResult.Success && settleResult.TxHash != "" {
				w.Header().Set("X-Payment-TxHash", settleResult.TxHash)
			}
		})
	}
}

// responseRecorder captures the status code from the downstream handler.
type responseRecorder struct {
	http.ResponseWriter
	statusCode int
	written    bool
}

func (rr *responseRecorder) WriteHeader(code int) {
	rr.statusCode = code
	rr.ResponseWriter.WriteHeader(code)
}

func (rr *responseRecorder) Write(b []byte) (int, error) {
	if !rr.written {
		rr.written = true
	}
	return rr.ResponseWriter.Write(b)
}

// Ensure responseRecorder implements http.Flusher if the underlying writer does.
func (rr *responseRecorder) Flush() {
	if f, ok := rr.ResponseWriter.(http.Flusher); ok {
		f.Flush()
	}
}

func requestURL(r *http.Request) string {
	scheme := "https"
	if r.TLS == nil {
		scheme = "http"
	}
	host := r.Host
	if host == "" {
		host = "localhost"
	}
	return fmt.Sprintf("%s://%s%s", scheme, host, r.URL.Path)
}

func writePaymentRequired(w http.ResponseWriter, req paymentRequirements) {
	body := paymentRequiredBody{
		X402Version: x402Version,
		Error:       "Payment Required",
		Accepts:     []paymentRequirements{req},
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("X-Payment-Required", "true")
	w.WriteHeader(http.StatusPaymentRequired)
	json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// Ensure the context has at minimum a background context.
func ensureContext(ctx context.Context) context.Context {
	if ctx == nil {
		return context.Background()
	}
	return ctx
}
