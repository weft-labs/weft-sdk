# Weft::BalanceResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo** | [**PromoBalance**](PromoBalance.md) |  |  |
| **wallet** | [**Wallet**](Wallet.md) |  |  |
| **spent_today_usd** | **String** | USD spent in the current calendar day (UTC). Exact to the micro-dollar so sub-cent micro-payments survive (\&quot;0.0005\&quot;, \&quot;0.42\&quot;), never narrower than two decimals; a zero total renders as \&quot;0.00\&quot;. |  |
| **spent_week_usd** | **String** | USD spent in the current calendar week (UTC, Monday start). Exact to the micro-dollar (\&quot;0.0005\&quot;, \&quot;3.10\&quot;), never narrower than two decimals; a zero total renders as \&quot;0.00\&quot;. |  |
| **policy_used_today_usd** | **String** | USD currently counted against the daily spending limit: pending authorizations at their maximum plus settled payments at the amount that moved. Exact to the micro-dollar; zero renders as \&quot;0.00\&quot;. |  |
| **policy_used_week_usd** | **String** | USD currently counted against the weekly spending limit: pending authorizations at their maximum plus settled payments at the amount that moved. Exact to the micro-dollar; zero renders as \&quot;0.00\&quot;. |  |
| **policy** | [**SpendingPolicy**](SpendingPolicy.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::BalanceResponse.new(
  promo: null,
  wallet: null,
  spent_today_usd: 0.0005,
  spent_week_usd: 3.10,
  policy_used_today_usd: 0.30,
  policy_used_week_usd: 3.30,
  policy: null
)
```
