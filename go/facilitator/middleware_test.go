package facilitator

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestMiddlewarePassthrough(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// No routes match /free
	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: "https://example.com"})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	req := httptest.NewRequest("GET", "/free", nil)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}
	if rec.Body.String() != "OK" {
		t.Fatalf("expected OK, got %s", rec.Body.String())
	}
}

func TestMiddleware402WhenNoPaymentHeader(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", Network: "base-sepolia", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: "https://example.com"})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	req := httptest.NewRequest("GET", "/paid", nil)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)

	if rec.Code != http.StatusPaymentRequired {
		t.Fatalf("expected 402, got %d", rec.Code)
	}

	if ct := rec.Header().Get("Content-Type"); ct != "application/json" {
		t.Fatalf("expected application/json, got %s", ct)
	}
	if xpr := rec.Header().Get("X-Payment-Required"); xpr != "true" {
		t.Fatalf("expected X-Payment-Required: true, got %s", xpr)
	}

	var body paymentRequiredBody
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if body.X402Version != 2 {
		t.Fatalf("expected x402Version 2, got %d", body.X402Version)
	}
	if len(body.Accepts) != 1 {
		t.Fatalf("expected 1 accept, got %d", len(body.Accepts))
	}
	if body.Accepts[0].Amount != "0.01" {
		t.Fatalf("expected amount 0.01, got %s", body.Accepts[0].Amount)
	}
	if body.Accepts[0].Asset != "USDC" {
		t.Fatalf("expected asset USDC, got %s", body.Accepts[0].Asset)
	}
	if body.Accepts[0].PayTo != "0xabc" {
		t.Fatalf("expected payTo 0xabc, got %s", body.Accepts[0].PayTo)
	}
}

func TestMiddlewarePrefixRoutes(t *testing.T) {
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	matcher := PrefixRoutes(map[string]RoutePaymentConfig{
		"/api/": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: "https://example.com"})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	// /api/resource matches prefix
	req := httptest.NewRequest("GET", "/api/resource", nil)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)
	if rec.Code != http.StatusPaymentRequired {
		t.Fatalf("expected 402 for /api/resource, got %d", rec.Code)
	}

	// /public does not match
	req = httptest.NewRequest("GET", "/public", nil)
	rec = httptest.NewRecorder()
	mw.ServeHTTP(rec, req)
	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200 for /public, got %d", rec.Code)
	}
}

func TestMiddlewareVerifyAndSettle(t *testing.T) {
	// Mock facilitator server
	facilitatorServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/verify":
			json.NewEncoder(w).Encode(VerifyResponse{Valid: true})
		case "/settle":
			json.NewEncoder(w).Encode(SettleResponse{Success: true, TxHash: "0xtx123"})
		default:
			w.WriteHeader(http.StatusNotFound)
		}
	}))
	defer facilitatorServer.Close()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("paid content"))
	})

	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: facilitatorServer.URL})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	paymentJSON := `{"token":"abc123"}`
	req := httptest.NewRequest("GET", "/paid", nil)
	req.Header.Set("X-Payment", paymentJSON)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rec.Code)
	}
	if rec.Body.String() != "paid content" {
		t.Fatalf("expected 'paid content', got %s", rec.Body.String())
	}
}

func TestMiddlewareVerifyFails(t *testing.T) {
	facilitatorServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(VerifyResponse{Valid: false, Message: "invalid payment"})
	}))
	defer facilitatorServer.Close()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("should not reach"))
	})

	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: facilitatorServer.URL})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	req := httptest.NewRequest("GET", "/paid", nil)
	req.Header.Set("X-Payment", `{"token":"bad"}`)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)

	if rec.Code != http.StatusPaymentRequired {
		t.Fatalf("expected 402, got %d", rec.Code)
	}
}

func TestMiddlewareDefaultValues(t *testing.T) {
	cfg := RoutePaymentConfig{Price: "0.01", Asset: "USDC", PayTo: "0xabc"}
	cfg.setDefaults()

	if cfg.Network != "base-sepolia" {
		t.Fatalf("expected default network base-sepolia, got %s", cfg.Network)
	}
	if cfg.MaxDeadlineSeconds != 60 {
		t.Fatalf("expected default max deadline 60, got %d", cfg.MaxDeadlineSeconds)
	}
}

func TestExactRoutesNilForUnmatched(t *testing.T) {
	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	if result := matcher("/free"); result != nil {
		t.Fatal("expected nil for unmatched route")
	}

	if result := matcher("/paid"); result == nil {
		t.Fatal("expected non-nil for matched route")
	}
}

func TestRequestURL(t *testing.T) {
	req := httptest.NewRequest("GET", "/api/resource", nil)
	req.Host = "example.com"

	url := requestURL(req)
	expected := "http://example.com/api/resource"
	if url != expected {
		t.Fatalf("expected %s, got %s", expected, url)
	}
}

func TestMiddlewarePaymentSignatureHeader(t *testing.T) {
	// Verify that Payment-Signature header is also accepted
	facilitatorServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/verify":
			json.NewEncoder(w).Encode(VerifyResponse{Valid: true})
		case "/settle":
			json.NewEncoder(w).Encode(SettleResponse{Success: true})
		default:
			w.WriteHeader(http.StatusNotFound)
		}
	}))
	defer facilitatorServer.Close()

	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "OK")
	})

	matcher := ExactRoutes(map[string]RoutePaymentConfig{
		"/paid": {Price: "0.01", Asset: "USDC", PayTo: "0xabc"},
	})

	client, _ := NewFacilitatorClient(&Config{URL: facilitatorServer.URL})
	mw := PaymentMiddleware(MiddlewareConfig{Client: client, Matcher: matcher})(handler)

	req := httptest.NewRequest("GET", "/paid", nil)
	req.Header.Set("Payment-Signature", `{"token":"abc"}`)
	rec := httptest.NewRecorder()
	mw.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected 200 with Payment-Signature header, got %d", rec.Code)
	}
}
