# Weft::BalanceResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo** | [**PromoBalance**](PromoBalance.md) |  |  |
| **wallet** | [**Wallet**](Wallet.md) |  |  |
| **spent_today_usd** | **String** | USD spent in the current calendar day (UTC). Up to 6 decimals with trailing zeros trimmed so sub-cent micro-payments survive (\&quot;0.0005\&quot;, \&quot;0.42\&quot;); a zero total renders as \&quot;0\&quot;. |  |
| **spent_week_usd** | **String** | USD spent in the current calendar week (UTC, Monday start). Up to 6 decimals with trailing zeros trimmed (\&quot;0.0005\&quot;, \&quot;3.10\&quot;); a zero total renders as \&quot;0\&quot;. |  |
| **policy** | [**SpendingPolicy**](SpendingPolicy.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::BalanceResponse.new(
  promo: null,
  wallet: null,
  spent_today_usd: 0.0005,
  spent_week_usd: 3.10,
  policy: null
)
```

