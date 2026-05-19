# Weft::Merchant

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **address** | **String** | EVM address that received the payment. |  |
| **settlement_count** | **Integer** | All-time settlement count for this merchant address. |  |
| **first_seen_at** | **Time** | First time Weft observed a payment to this address. |  |
| **dispute_count** | **Integer** | All-time dispute count for this merchant address. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Merchant.new(
  address: null,
  settlement_count: null,
  first_seen_at: null,
  dispute_count: null
)
```

