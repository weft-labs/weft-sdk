# Weft::ApiKeyCreated

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **name** | **String** |  | [optional] |
| **key_prefix** | **String** |  |  |
| **raw_key** | **String** | Full API key (shown only once at creation) |  |
| **created_at** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::ApiKeyCreated.new(
  id: null,
  name: null,
  key_prefix: null,
  raw_key: null,
  created_at: null
)
```

