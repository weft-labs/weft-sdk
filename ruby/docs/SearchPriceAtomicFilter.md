# Weft::SearchPriceAtomicFilter

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **lte** | **Integer** | Price ≤ this many micro-USD (inclusive ceiling). | [optional] |
| **gte** | **Integer** | Price ≥ this many micro-USD (inclusive floor). | [optional] |
| **eq** | **Integer** | Price exactly this many micro-USD. | [optional] |
| **range_gte** | **Integer** | Range lower bound (inclusive), micro-USD. Set with range_lte. | [optional] |
| **range_lte** | **Integer** | Range upper bound (inclusive), micro-USD. Set with range_gte. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchPriceAtomicFilter.new(
  lte: null,
  gte: null,
  eq: null,
  range_gte: null,
  range_lte: null
)
```

