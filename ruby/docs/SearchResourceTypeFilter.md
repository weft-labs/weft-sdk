# Weft::SearchResourceTypeFilter

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **eq** | **String** | Resource type is exactly this value. | [optional] |
| **_in** | **Array&lt;String&gt;** | Resource type is one of these values. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResourceTypeFilter.new(
  eq: null,
  _in: null
)
```

