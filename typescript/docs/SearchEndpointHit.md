
# SearchEndpointHit


## Properties

Name | Type
------------ | -------------
`endpointId` | string
`url` | string
`resourceType` | string
`primaryProtocol` | string
`priceAtomic` | number
`priceUsd` | string
`priceCurrency` | string
`priceDecimals` | number
`operatedById` | string
`operatedByType` | string
`settledViaFacilitatorId` | string
`ranking` | [SearchEndpointRanking](SearchEndpointRanking.md)

## Example

```typescript
import type { SearchEndpointHit } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "endpointId": null,
  "url": null,
  "resourceType": null,
  "primaryProtocol": null,
  "priceAtomic": null,
  "priceUsd": null,
  "priceCurrency": null,
  "priceDecimals": null,
  "operatedById": null,
  "operatedByType": null,
  "settledViaFacilitatorId": null,
  "ranking": null,
} satisfies SearchEndpointHit

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchEndpointHit
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


