# Weft::AuthResponseData

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **user** | [**User**](User.md) |  |  |
| **token** | **String** |  | [optional] |
| **confirmation_required** | **Boolean** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AuthResponseData.new(
  user: null,
  token: null,
  confirmation_required: null
)
```

