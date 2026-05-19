# Weft::Wallet

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **address** | **String** | EVM address of the buyer&#39;s Privy-managed wallet. Null if no wallet provisioned. |  |
| **balance_usdc** | **String** | Live USDC balance, 2dp. Returns \&quot;0.00\&quot; if the upstream wallet provider is unreachable. |  |
| **network** | **String** | Wallet network (e.g. &#x60;base-sepolia&#x60;). |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Wallet.new(
  address: null,
  balance_usdc: 12.34,
  network: null
)
```

