# Weft::BalanceResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo** | [**PromoBalance**](PromoBalance.md) |  |  |
| **wallet** | [**Wallet**](Wallet.md) |  |  |
| **spent_today_usd** | **String** | USD spent in the current calendar day (UTC), 2dp. |  |
| **spent_week_usd** | **String** | USD spent in the current calendar week (UTC, Monday start), 2dp. |  |
| **policy** | [**SpendingPolicy**](SpendingPolicy.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::BalanceResponse.new(
  promo: null,
  wallet: null,
  spent_today_usd: 0.42,
  spent_week_usd: 3.10,
  policy: null
)
```

