
# SearchEndpointHit


## Properties

Name | Type
------------ | -------------
`endpointId` | string
`url` | string
`resourceType` | string
`primaryProtocol` | string
`call` | [SearchEndpointCall](SearchEndpointCall.md)
`price` | [SearchEndpointPrice](SearchEndpointPrice.md)
`payment` | [Array&lt;SearchPaymentOffer&gt;](SearchPaymentOffer.md)
`operatorType` | string
`operatedById` | string
`settledViaFacilitatorId` | string
`settlements` | number
`lastVerifiedAt` | Date
`latencyP50Ms` | number

## Example

```typescript
import type { SearchEndpointHit } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "endpointId": null,
  "url": null,
  "resourceType": null,
  "primaryProtocol": null,
  "call": null,
  "price": null,
  "payment": null,
  "operatorType": null,
  "operatedById": null,
  "settledViaFacilitatorId": null,
  "settlements": null,
  "lastVerifiedAt": null,
  "latencyP50Ms": null,
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


