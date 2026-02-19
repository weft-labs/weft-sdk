# Weft::Error

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **code** | **String** |  |  |
| **message** | **String** |  |  |
| **details** | **Object** |  | [optional] |
| **request_id** | **String** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Error.new(
  code: null,
  message: null,
  details: null,
  request_id: null
)
```

