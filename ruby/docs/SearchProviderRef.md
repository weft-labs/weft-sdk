# Weft::SearchProviderRef

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **provider_id** | **String** |  | [optional] |
| **display_name** | **String** |  | [optional] |
| **origin_domains** | **Array&lt;String&gt;** |  | [optional] |
| **verification_state** | **String** |  | [optional] |
| **identity_confidence** | **Float** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchProviderRef.new(
  provider_id: null,
  display_name: null,
  origin_domains: null,
  verification_state: null,
  identity_confidence: null
)
```

