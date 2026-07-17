
# SearchPriceAtomicFilter

The same price constraint in integer micro-USD (1 USDC = 1_000_000 micro-USD) — the settlement form. Set exactly one operator: a scalar (`lte` / `gte` / `eq`) OR a range (`range_gte` + `range_lte` together, lower ≤ upper). Mutually exclusive with `price`. An unpriced resource is excluded from any price-filtered query. 

## Properties

Name | Type
------------ | -------------
`lte` | number
`gte` | number
`eq` | number
`rangeGte` | number
`rangeLte` | number

## Example

```typescript
import type { SearchPriceAtomicFilter } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "lte": null,
  "gte": null,
  "eq": null,
  "rangeGte": null,
  "rangeLte": null,
} satisfies SearchPriceAtomicFilter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchPriceAtomicFilter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


