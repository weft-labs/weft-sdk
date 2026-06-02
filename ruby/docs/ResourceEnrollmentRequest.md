# Weft::ResourceEnrollmentRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **kind** | **String** | Resource kind. Must be one of the supported kinds (currently &#x60;agent&#x60;); an unknown value is rejected with a 422.  |  |
| **name** | **String** | Human-readable name; the server derives the slug from it. |  |
| **description** | **String** |  | [optional] |
| **wallet_address** | **String** | Declared EVM wallet address for the ghost resource. Stored as a claim (unverified) until the resource is claimed.  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::ResourceEnrollmentRequest.new(
  kind: agent,
  name: Self-Enrolled Bot,
  description: null,
  wallet_address: null
)
```

