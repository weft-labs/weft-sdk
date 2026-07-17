# Weft::SearchPriceUsdFilter

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **lte** | **String** | Price ≤ this many USD (inclusive ceiling), e.g. \&quot;0.009\&quot;. | [optional] |
| **gte** | **String** | Price ≥ this many USD (inclusive floor), e.g. \&quot;0.001\&quot;. | [optional] |
| **eq** | **String** | Price exactly this many USD, e.g. \&quot;1.5\&quot;. | [optional] |
| **range_gte** | **String** | Range lower bound (inclusive), USD. Set with range_lte. | [optional] |
| **range_lte** | **String** | Range upper bound (inclusive), USD. Set with range_gte. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchPriceUsdFilter.new(
  lte: null,
  gte: null,
  eq: null,
  range_gte: null,
  range_lte: null
)
```

