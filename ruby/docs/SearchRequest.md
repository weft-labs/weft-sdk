# Weft::SearchRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **query** | **String** | Free-text query. Required and non-empty. |  |
| **limit** | **Integer** | Max number of hits to return. Clamped to [1, 50]. | [optional][default to 10] |
| **filters** | [**SearchFilters**](SearchFilters.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchRequest.new(
  query: send email from an agent,
  limit: null,
  filters: null
)
```

