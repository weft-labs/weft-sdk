# Weft::SearchEndpointRanking

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **similarity** | **Float** |  | [optional] |
| **price_atomic** | **Integer** |  | [optional] |
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
  rank_reason: null,
  probe_status: null,
  median_ttfb_ms: null,
  min_total_latency_ms: null,
  max_total_latency_ms: null
)
```

