# Weft::Error

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **code** | **String** | Stable machine-readable error code (snake_case). |  |
| **message** | **String** | Human-readable error description. |  |
| **details** | **Object** | Optional structured context about the failure. | [optional] |
| **request_id** | **String** | Correlates with server logs; include when reporting bugs. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Error.new(
  code: validation_failed,
  message: Email has already been taken,
  details: null,
  request_id: req_01HX9F3K7B2N4P8Q1R6T8Y2Z5
)
```

