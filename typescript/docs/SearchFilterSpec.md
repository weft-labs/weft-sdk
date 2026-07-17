
# SearchFilterSpec

Structured hard constraints on the query — the weft-search-platform `FilterSpec` v1 typed subset, vendored verbatim (D1 contract). Every field is optional; an empty object is the no-filter query. Set fields are ANDed. Each sub-filter takes exactly one operator; unknown filter keys and unknown operators are rejected (`422 INVALID_FILTERS`).  `price` (USD decimal strings) and `price_atomic` (integer micro-USD) are two representations of ONE price constraint — the reasoning form and the settlement form. They are MUTUALLY EXCLUSIVE: setting both is `422 INVALID_FILTERS`. A JSON number in `price` is rejected (only decimal strings), so `{lte: 5}` can never be mis-read as 5 micro-dollars.  The canonical enum value sets are pinned to the platform spec by the CI drift gate (`docs/contracts/search-platform.openapi.yaml`). 

## Properties

Name | Type
------------ | -------------
`price` | [SearchPriceUsdFilter](SearchPriceUsdFilter.md)
`priceAtomic` | [SearchPriceAtomicFilter](SearchPriceAtomicFilter.md)
`type` | [SearchResourceTypeFilter](SearchResourceTypeFilter.md)
`protocol` | [SearchProtocolFilter](SearchProtocolFilter.md)

## Example

```typescript
import type { SearchFilterSpec } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "price": null,
  "priceAtomic": null,
  "type": null,
  "protocol": null,
} satisfies SearchFilterSpec

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchFilterSpec
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


