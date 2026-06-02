# Weft::InsufficientScopeResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **error** | **String** |  |  |
| **error_description** | **String** |  |  |
| **scope** | **String** | Space-delimited list of scopes the endpoint requires. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::InsufficientScopeResponse.new(
  error: insufficient_scope,
  error_description: The access token does not include the required scope.,
  scope: balance
)
```

