# Weft::SearchRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **query** | **String** | Free-text query. Required and non-empty. |  |
| **max_results** | **Integer** | Max number of hits to return. Invalid values are rejected, not clamped. | [optional][default to 10] |
| **filters** | [**SearchFilterSpec**](SearchFilterSpec.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchRequest.new(
  query: send email from an agent,
  max_results: null,
  filters: null
)
```

