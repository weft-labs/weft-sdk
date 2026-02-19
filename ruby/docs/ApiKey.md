# Weft::ApiKey

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **name** | **String** |  | [optional] |
| **key_prefix** | **String** | First 16 characters of the key for identification |  |
| **last_used_at** | **Time** |  | [optional] |
| **revoked_at** | **Time** |  | [optional] |
| **created_at** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::ApiKey.new(
  id: null,
  name: null,
  key_prefix: null,
  last_used_at: null,
  revoked_at: null,
  created_at: null
)
```

