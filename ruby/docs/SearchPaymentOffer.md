# Weft::SearchPaymentOffer

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **protocol** | **String** | The payment rail (e.g. &#x60;x402&#x60;, &#x60;mpp&#x60;). |  |
| **scheme** | **String** |  | [optional] |
| **network** | **String** |  | [optional] |
| **asset** | **String** |  | [optional] |
| **amount** | **String** |  | [optional] |
| **pay_to** | **String** |  | [optional] |
| **max_timeout_seconds** | **Integer** |  | [optional] |
| **facilitator** | **String** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchPaymentOffer.new(
  protocol: null,
  scheme: null,
  network: null,
  asset: null,
  amount: null,
  pay_to: null,
  max_timeout_seconds: null,
  facilitator: null
)
```

