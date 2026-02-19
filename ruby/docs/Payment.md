# Weft::Payment

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **tx_hash** | **String** |  |  |
| **payer_address** | **String** |  |  |
| **recipient_address** | **String** |  |  |
| **amount** | **Integer** | Amount in atomic units (1 USDC &#x3D; 1,000,000) |  |
| **amount_formatted** | **String** | Human-readable amount (e.g. \&quot;1.00 USDC\&quot;) |  |
| **currency** | **String** |  |  |
| **network** | **String** | CAIP-2 chain identifier |  |
| **resource_url** | **String** |  | [optional] |
| **resource_host** | **String** |  | [optional] |
| **fee_amount** | **Integer** |  | [optional] |
| **settlement_latency_ms** | **Integer** |  | [optional] |
| **settled_at** | **Time** |  |  |
| **api_key_name** | **String** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Payment.new(
  id: null,
  tx_hash: null,
  payer_address: null,
  recipient_address: null,
  amount: null,
  amount_formatted: null,
  currency: null,
  network: null,
  resource_url: null,
  resource_host: null,
  fee_amount: null,
  settlement_latency_ms: null,
  settled_at: null,
  api_key_name: null
)
```

