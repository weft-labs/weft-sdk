
# SearchEndpointPrice

Price + provenance + freshness for this (endpoint × capability) pairing. Always present; an unpriced endpoint carries null amounts rather than an absent block, so a caller never has to distinguish \"free\" from \"we do not know\". 

## Properties

Name | Type
------------ | -------------
`indexedUsd` | string
`atomic` | number
`source` | string
`lastObservedAt` | Date
`liveVerified` | boolean

## Example

```typescript
import type { SearchEndpointPrice } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "indexedUsd": null,
  "atomic": null,
  "source": null,
  "lastObservedAt": null,
  "liveVerified": null,
} satisfies SearchEndpointPrice

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchEndpointPrice
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


