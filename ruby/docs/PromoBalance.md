# Weft::PromoBalance

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **balance_usd** | **String** |  |  |
| **scope** | **String** | Where the promo can be spent. |  |
| **expires_at** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::PromoBalance.new(
  balance_usd: 0.00,
  scope: weft-search,
  expires_at: null
)
```

