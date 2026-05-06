# Weft::EnrollResourceRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **kind** | **String** | Resource type. Determines which storefront and dashboard surfaces apply after claim.  |  |
| **name** | **String** | Display name. Becomes the basis for the server-generated &#x60;slug&#x60;. |  |
| **description** | **String** | Optional human-readable description. | [optional] |
| **wallet_address** | **String** | Optional Ethereum address declared at enrollment time. Stored as &#x60;declared_wallet_address&#x60; on the ghost Resource for later reconciliation; never used as the canonical Provider wallet.  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::EnrollResourceRequest.new(
  kind: null,
  name: null,
  description: null,
  wallet_address: null
)
```

