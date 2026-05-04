# Weft::CreateAgentRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **name** | **String** | Agent display name |  |
| **wallet_address** | **String** | Ethereum wallet address for this agent |  |
| **description** | **String** | Short description (max 500 chars) | [optional] |
| **category** | **String** |  | [optional] |
| **visibility** | **String** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::CreateAgentRequest.new(
  name: null,
  wallet_address: null,
  description: null,
  category: null,
  visibility: null
)
```

