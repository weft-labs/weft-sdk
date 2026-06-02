# Weft::MeApiKey

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **name** | **String** |  | [optional] |
| **created_at** | **Time** |  |  |
| **last_used_at** | **Time** |  | [optional] |
| **created_by** | [**MeApiKeyCreator**](MeApiKeyCreator.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::MeApiKey.new(
  id: null,
  name: null,
  created_at: null,
  last_used_at: null,
  created_by: null
)
```

