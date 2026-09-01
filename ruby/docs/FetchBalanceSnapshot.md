# Weft::FetchBalanceSnapshot

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo_usd** | **String** |  |  |
| **wallet_usdc** | **String** | Live Base USDC balance read server-side through Crossmint. Null when Crossmint is unavailable; never treat null as zero.  |  |
| **total_usd** | **String** | Aggregated USD balance across Base USDC and Tempo dollar tokens, exact to the micro-dollar. Null when either pocket is unreachable.  |  |
| **spent_today_usd** | **String** | Settled USD spend in the current calendar day (UTC). |  |
| **policy_used_today_usd** | **String** | USD counted against today&#39;s policy limit, including pending authorizations and settled spend. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchBalanceSnapshot.new(
  promo_usd: 0.00,
  wallet_usdc: 12.34,
  total_usd: 12.34,
  spent_today_usd: 0.42,
  policy_used_today_usd: 0.72
)
```
