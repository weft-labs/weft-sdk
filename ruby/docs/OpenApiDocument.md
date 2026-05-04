# Weft::OpenApiDocument

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **openapi** | **String** |  |  |
| **info** | **Object** |  |  |
| **paths** | **Object** |  |  |
| **components** | **Object** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::OpenApiDocument.new(
  openapi: 3.1.0,
  info: null,
  paths: null,
  components: null
)
```

