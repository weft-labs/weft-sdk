# Weft::SearchPricing

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **protocol** | **String** |  | [optional] |
| **scheme** | **String** |  | [optional] |
| **amount_usd** | **String** | Default per-call amount; individual skills may override via &#x60;price_usd&#x60;. | [optional] |
| **network** | **String** | Settlement network (e.g. &#x60;base-sepolia&#x60;). | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchPricing.new(
  protocol: null,
  scheme: per_call,
  amount_usd: null,
  network: null
)
```

