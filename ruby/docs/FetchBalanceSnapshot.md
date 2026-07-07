# Weft::FetchBalanceSnapshot

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **promo_usd** | **String** |  |  |
| **wallet_usdc** | **String** | Live Base USDC balance. |  |
| **tempo_usd** | **String** | Aggregated USD of allowlisted Tempo dollar tokens, 2dp. &#x60;null&#x60; when UNKNOWN (RPC read failed or no token allowlisted for the paired chain) — never \&quot;0.00\&quot; for an unread component.  |  |
| **total_usd** | **String** | Aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, 2dp. Equals &#x60;wallet_usdc&#x60; alone when &#x60;tempo_usd&#x60; is null. Null when the Base USDC provider is unreachable.  |  |
| **spent_today_usd** | **String** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchBalanceSnapshot.new(
  promo_usd: 0.00,
  wallet_usdc: 12.34,
  tempo_usd: 3.00,
  total_usd: 15.34,
  spent_today_usd: 0.42
)
```

