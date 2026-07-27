# Weft::SearchEndpointRanking

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **similarity** | **Float** |  | [optional] |
| **price_atomic** | **Integer** | Price tie-breaker in atomic units — the probe-observed price when one exists, else the pipeline-inferred price. &#x60;price_source&#x60; says which. Null when no price is recorded; nulls sort last.  | [optional] |
| **price_source** | **String** | Where &#x60;price_atomic&#x60; came from. &#x60;probe&#x60; &#x3D; observed live in the endpoint&#39;s own 402 payment-required challenge — authoritative, and refreshed on every probe. &#x60;inferred&#x60; &#x3D; derived from a spec (OpenAPI) or a resale edge by the extraction pipeline, so it can lag a provider&#39;s re-pricing. Null when the endpoint carries no price.  | [optional] |
| **rank_reason** | **String** |  | [optional] |
| **probe_status** | **String** |  | [optional] |
| **median_ttfb_ms** | **Integer** |  | [optional] |
| **min_total_latency_ms** | **Integer** |  | [optional] |
| **max_total_latency_ms** | **Integer** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchEndpointRanking.new(
  similarity: null,
  price_atomic: null,
  price_source: null,
  rank_reason: null,
  probe_status: null,
  median_ttfb_ms: null,
  min_total_latency_ms: null,
  max_total_latency_ms: null
)
```

