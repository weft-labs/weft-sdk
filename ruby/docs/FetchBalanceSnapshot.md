# Weft::FetchBalanceSnapshot

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo_usd** | **String** |  |  |
| **wallet_usdc** | **String** |  |  |
| **spent_today_usd** | **String** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchBalanceSnapshot.new(
  promo_usd: 0.00,
  wallet_usdc: 12.34,
  spent_today_usd: 0.42
)
```

