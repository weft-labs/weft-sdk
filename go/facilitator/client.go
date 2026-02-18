package facilitator

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

const DefaultURL = "https://x402.weft.network"
const EnvURL = "X402_FACILITATOR_URL"
const DefaultCacheTTL = 5 * time.Minute

var ErrInvalidURL = errors.New("invalid URL")
var ErrFeeNotFound = errors.New("fee information not found in /supported response")

type Config struct {
	URL        string
	HTTPClient *http.Client
	Timeout    time.Duration
}

type FeeInfo struct {
	Amount  string `json:"amount"`
	Asset   string `json:"asset"`
	Network string `json:"network"`
}

type FeeCacheConfig struct {
	TTL time.Duration
}

type feeCache struct {
	feeInfo   *FeeInfo
	fetchedAt time.Time
	ttl       time.Duration
}

type HTTPFacilitatorClient struct {
	url        string
	httpClient *http.Client
}

func ValidateURL(url string) error {
	if url == "" || strings.TrimSpace(url) == "" {
		return fmt.Errorf("%w: URL cannot be empty", ErrInvalidURL)
	}
	if !strings.HasPrefix(url, "http://") && !strings.HasPrefix(url, "https://") {
		return fmt.Errorf("%w: URL must start with http:// or https://, got: %s", ErrInvalidURL, url)
	}
	return nil
}

func ResolveURL(config *Config) string {
	if config != nil && config.URL != "" {
		return config.URL
	}
	if envURL := os.Getenv(EnvURL); envURL != "" {
		return envURL
	}
	return DefaultURL
}

func NewFacilitatorClient(config *Config) (*HTTPFacilitatorClient, error) {
	url := ResolveURL(config)
	if err := ValidateURL(url); err != nil {
		return nil, err
	}

	httpClient := http.DefaultClient
	timeout := 30 * time.Second
	if config != nil {
		if config.HTTPClient != nil {
			httpClient = config.HTTPClient
		}
		if config.Timeout > 0 {
			timeout = config.Timeout
		}
	}

	if config == nil || config.HTTPClient == nil {
		httpClient = &http.Client{Timeout: timeout}
	}

	return &HTTPFacilitatorClient{url: url, httpClient: httpClient}, nil
}

func (c *HTTPFacilitatorClient) URL() string {
	return c.url
}

type VerifyRequest struct {
	X402Version         int         `json:"x402Version"`
	PaymentPayload      interface{} `json:"paymentPayload"`
	PaymentRequirements interface{} `json:"paymentRequirements"`
}

type VerifyResponse struct {
	Valid   bool   `json:"valid"`
	Message string `json:"message,omitempty"`
}

type SettleRequest struct {
	X402Version         int         `json:"x402Version"`
	PaymentPayload      interface{} `json:"paymentPayload"`
	PaymentRequirements interface{} `json:"paymentRequirements"`
}

type SettleResponse struct {
	Success bool   `json:"success"`
	TxHash  string `json:"txHash,omitempty"`
	Message string `json:"message,omitempty"`
}

type SupportedKind struct {
	X402Version int    `json:"x402Version"`
	Scheme      string `json:"scheme"`
	Network     string `json:"network"`
}

type SupportedResponse struct {
	Kinds      []SupportedKind     `json:"kinds"`
	Extensions []string            `json:"extensions,omitempty"`
	Signers    map[string][]string `json:"signers,omitempty"`
	Fee        *FeeInfo            `json:"fee,omitempty"`
}

func (c *HTTPFacilitatorClient) Verify(ctx context.Context, payload, requirements interface{}) (*VerifyResponse, error) {
	reqBody := VerifyRequest{
		X402Version:         2,
		PaymentPayload:      payload,
		PaymentRequirements: requirements,
	}

	body, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal verify request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.url+"/verify", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create verify request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("verify request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("facilitator verify failed (%d): %s", resp.StatusCode, string(body))
	}

	var verifyResp VerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&verifyResp); err != nil {
		return nil, fmt.Errorf("failed to decode verify response: %w", err)
	}

	return &verifyResp, nil
}

func (c *HTTPFacilitatorClient) Settle(ctx context.Context, payload, requirements interface{}) (*SettleResponse, error) {
	reqBody := SettleRequest{
		X402Version:         2,
		PaymentPayload:      payload,
		PaymentRequirements: requirements,
	}

	body, err := json.Marshal(reqBody)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal settle request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", c.url+"/settle", bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("failed to create settle request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("settle request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("facilitator settle failed (%d): %s", resp.StatusCode, string(body))
	}

	var settleResp SettleResponse
	if err := json.NewDecoder(resp.Body).Decode(&settleResp); err != nil {
		return nil, fmt.Errorf("failed to decode settle response: %w", err)
	}

	return &settleResp, nil
}

func (c *HTTPFacilitatorClient) GetSupported(ctx context.Context) (*SupportedResponse, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", c.url+"/supported", nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create supported request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("supported request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("facilitator supported failed (%d): %s", resp.StatusCode, string(body))
	}

	var supportedResp SupportedResponse
	if err := json.NewDecoder(resp.Body).Decode(&supportedResp); err != nil {
		return nil, fmt.Errorf("failed to decode supported response: %w", err)
	}

	return &supportedResp, nil
}
