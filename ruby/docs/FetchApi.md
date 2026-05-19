# Weft::FetchApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**fetch**](FetchApi.md#fetch) | **POST** /api/v1/fetch | Pay-and-fetch any URL (x402 proxy) |


## fetch

> <FetchResponse> fetch(fetch_request)

Pay-and-fetch any URL (x402 proxy)

Universal x402 fetch proxy. The caller provides a target `url`, a hard `max_cost_usd` ceiling, and optional `method` / `body` / `headers`. Weft:    1. Issues the request.   2. On `402 Payment Required`, parses the merchant's challenge.   3. Compares the asking price to `max_cost_usd` and the      buyer's policy (`max_tx_usd`, daily/weekly limits).   4. Signs an EIP-3009 transfer from the buyer's wallet.   5. Replays the request with the `X-Payment` header.   6. Streams the upstream artifact back, base64-encoded under      `body_base64`, with `paid_usd`, `tx_hash`, and the      merchant's reputation snapshot.  Errors are structured with a stable `error` code, and each error response carries the buyer's `policy`, `balance`, and a `dashboard_url` so a CLI can render an actionable message without a second round-trip.  Account-scoped: the bearer must be a buyer-scoped API key.  **Forwarded headers:** the caller's `headers` are passed through to the upstream, except a denylist of hop-by-hop and Weft-internal headers (`host`, `authorization`, `cookie`, `proxy-authorization`, `x-forwarded-*`, `x-real-ip`, `x-payment`, `connection`, `upgrade`). Up to 32 headers, 4 KB of combined value bytes. 

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::FetchApi.new
fetch_request = Weft::FetchRequest.new({url: 'https://x402.api.agentmail.to/v0/inboxes'}) # FetchRequest | 

begin
  # Pay-and-fetch any URL (x402 proxy)
  result = api_instance.fetch(fetch_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling FetchApi->fetch: #{e}"
end
```

#### Using the fetch_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<FetchResponse>, Integer, Hash)> fetch_with_http_info(fetch_request)

```ruby
begin
  # Pay-and-fetch any URL (x402 proxy)
  data, status_code, headers = api_instance.fetch_with_http_info(fetch_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <FetchResponse>
rescue Weft::ApiError => e
  puts "Error when calling FetchApi->fetch_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **fetch_request** | [**FetchRequest**](FetchRequest.md) |  |  |

### Return type

[**FetchResponse**](FetchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

