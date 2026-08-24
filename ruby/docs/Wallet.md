# Weft::Wallet

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **provider** | **String** | Crossmint is the only buyer-wallet provider. |  |
| **address** | **String** | Base smart-wallet address. Null only when Crossmint is unavailable. |  |
| **balance_usdc** | **String** | Live Base USDC balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |  |
| **total_usd** | **String** | Single aggregated USD balance (Base USDC), exact to the micro-dollar. Null when the provider is unreachable, because the surface never claims zero for a component it could not read.  |  |
| **network** | **String** | Selected Crossmint environment (&#x60;base_sepolia&#x60; or &#x60;base_mainnet&#x60;).  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Wallet.new(
  provider: null,
  address: null,
  balance_usdc: 12.34,
  total_usd: 12.34,
  network: null
)
```
