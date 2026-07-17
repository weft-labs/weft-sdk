# Weft::SearchResult

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **provider** | [**SearchProviderRef**](SearchProviderRef.md) |  |  |
| **capability** | [**SearchCapabilityRef**](SearchCapabilityRef.md) |  |  |
| **endpoints** | [**Array&lt;SearchEndpointHit&gt;**](SearchEndpointHit.md) |  |  |
| **score** | **Float** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResult.new(
  provider: null,
  capability: null,
  endpoints: null,
  score: null
)
```

