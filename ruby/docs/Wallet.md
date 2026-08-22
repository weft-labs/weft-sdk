# Weft::Wallet

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **provider** | **String** | Crossmint is the only buyer-wallet provider. |  |
| **address** | **String** | Base smart-wallet address. Null only when Crossmint is unavailable. |  |
| **tempo_address** | **String** | Paired Tempo smart-wallet address. Null only when Crossmint is unavailable. |  |
| **balance_usdc** | **String** | Live Base USDC balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |  |
| **tempo_usd** | **String** | Aggregated USD value of the allowlisted Tempo TIP-20 dollar tokens on the wallet&#39;s paired Tempo chain, exact to the micro-dollar. &#x60;null&#x60; when the value is UNKNOWN — the Tempo RPC read failed, or no dollar token is allowlisted for that chain yet (e.g. Tempo mainnet pre-launch). A null here is never \&quot;0.00\&quot;; it means \&quot;we couldn&#39;t determine it\&quot;, and &#x60;total_usd&#x60; then reflects the Base component only.  |  |
| **total_usd** | **String** | Single aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, exact to the micro-dollar. When &#x60;tempo_usd&#x60; is null (unavailable/unallowlisted) this equals &#x60;balance_usdc&#x60; alone. Null when the Base USDC provider is unreachable, because the surface never claims zero for a component it could not read.  |  |
| **network** | **String** | Selected Crossmint environment (&#x60;base_sepolia&#x60; or &#x60;base_mainnet&#x60;).  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Wallet.new(
  provider: null,
  address: null,
  tempo_address: null,
  balance_usdc: 12.34,
  tempo_usd: 3.00,
  total_usd: 15.34,
  network: null
)
```
