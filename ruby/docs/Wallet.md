# Weft::Wallet

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **address** | **String** | EVM address of the buyer&#39;s Privy-managed wallet. Null if no wallet provisioned. |  |
| **balance_usdc** | **String** | Live Base USDC balance, 2dp. Returns \&quot;0.00\&quot; if the upstream wallet provider is unreachable. |  |
| **tempo_usd** | **String** | Aggregated USD value of the allowlisted Tempo TIP-20 dollar tokens on the wallet&#39;s paired Tempo chain, 2dp. &#x60;null&#x60; when the value is UNKNOWN — the Tempo RPC read failed, or no dollar token is allowlisted for that chain yet (e.g. Tempo mainnet pre-launch). A null here is never \&quot;0.00\&quot;; it means \&quot;we couldn&#39;t determine it\&quot;, and &#x60;total_usd&#x60; then reflects the Base component only.  |  |
| **total_usd** | **String** | Single aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, 2dp. When &#x60;tempo_usd&#x60; is null (unavailable/unallowlisted) this equals &#x60;balance_usdc&#x60; alone. Null when the Base USDC provider is unreachable, because the surface never claims zero for a component it could not read.  |  |
| **network** | **String** | Wallet network (e.g. &#x60;base-sepolia&#x60;). |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Wallet.new(
  address: null,
  balance_usdc: 12.34,
  tempo_usd: 3.00,
  total_usd: 15.34,
  network: null
)
```

