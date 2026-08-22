# Weft::SearchFilterSpec

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **price** | [**SearchPriceUsdFilter**](SearchPriceUsdFilter.md) |  | [optional] |
| **price_atomic** | [**SearchPriceAtomicFilter**](SearchPriceAtomicFilter.md) |  | [optional] |
| **type** | [**SearchResourceTypeFilter**](SearchResourceTypeFilter.md) |  | [optional] |
| **protocol** | [**SearchProtocolFilter**](SearchProtocolFilter.md) |  | [optional] |
| **category** | [**SearchStringSetFilter**](SearchStringSetFilter.md) |  | [optional] |
| **method** | [**SearchMethodFilter**](SearchMethodFilter.md) |  | [optional] |
| **execution_mode** | [**SearchExecutionModeFilter**](SearchExecutionModeFilter.md) |  | [optional] |
| **weft_fetch_compatible** | **Boolean** | True requires at least one access method whose paid request is supported by the current Weft fetch runtime. For async operations this can mean submission-only coverage followed by the provider workflow. | [optional] |
| **include_unknown_prices** | **Boolean** | With a price constraint, also retain dynamic and unknown prices. | [optional][default to false] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchFilterSpec.new(
  price: null,
  price_atomic: null,
  type: null,
  protocol: null,
  category: null,
  method: null,
  execution_mode: null,
  weft_fetch_compatible: null,
  include_unknown_prices: null
)
```
