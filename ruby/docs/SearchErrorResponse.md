# Weft::SearchErrorResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **error** | **String** | Stable error code. |  |
| **details** | **Hash&lt;String, Object&gt;** | Optional context. Shape varies by error code. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchErrorResponse.new(
  error: null,
  details: null
)
```

