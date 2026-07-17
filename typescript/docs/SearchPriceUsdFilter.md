
# SearchPriceUsdFilter

Price constraint in USD, as decimal STRINGS (the reasoning form). Set exactly one operator: a scalar (`lte` / `gte` / `eq`) OR a range (`range_gte` + `range_lte` together, lower ≤ upper). Each value is a string matching `^\\d+(\\.\\d{1,6})?$` (≤ 6 decimals, ≥ 0); a JSON number is rejected. Mutually exclusive with `price_atomic`. An unpriced resource is excluded from any price-filtered query. 

## Properties

Name | Type
------------ | -------------
`lte` | string
`gte` | string
`eq` | string
`rangeGte` | string
`rangeLte` | string

## Example

```typescript
import type { SearchPriceUsdFilter } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "lte": null,
  "gte": null,
  "eq": null,
  "rangeGte": null,
  "rangeLte": null,
} satisfies SearchPriceUsdFilter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchPriceUsdFilter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


