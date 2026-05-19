# Weft::SearchRanking

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **popularity_score** | **Float** |  | [optional] |
| **settlement_count_30d** | **Integer** |  | [optional] |
| **success_rate_30d** | **Float** |  | [optional] |
| **p50_latency_ms** | **Integer** |  | [optional] |
| **first_seen_at** | **Time** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchRanking.new(
  popularity_score: null,
  settlement_count_30d: null,
  success_rate_30d: null,
  p50_latency_ms: null,
  first_seen_at: null
)
```

