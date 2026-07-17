# Weft::SearchProtocolFilter

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **eq** | **String** | Primary protocol is exactly this value. | [optional] |
| **_in** | **Array&lt;String&gt;** | Primary protocol is one of these values. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchProtocolFilter.new(
  eq: null,
  _in: null
)
```

