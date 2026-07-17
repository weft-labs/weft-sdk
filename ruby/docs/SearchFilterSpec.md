# Weft::SearchFilterSpec

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **price** | [**SearchPriceUsdFilter**](SearchPriceUsdFilter.md) |  | [optional] |
| **price_atomic** | [**SearchPriceAtomicFilter**](SearchPriceAtomicFilter.md) |  | [optional] |
| **type** | [**SearchResourceTypeFilter**](SearchResourceTypeFilter.md) |  | [optional] |
| **protocol** | [**SearchProtocolFilter**](SearchProtocolFilter.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchFilterSpec.new(
  price: null,
  price_atomic: null,
  type: null,
  protocol: null
)
```

