
# SearchPaymentOffer

One settlement route the endpoint\'s own 402 challenge published — a (rail × network × asset × payee) tuple a caller can settle against directly with its own SDK.

## Properties

Name | Type
------------ | -------------
`protocol` | string
`scheme` | string
`network` | string
`asset` | string
`amount` | string
`payTo` | string
`maxTimeoutSeconds` | number
`facilitator` | string

## Example

```typescript
import type { SearchPaymentOffer } from '@weftlabs/sdk'

// TODO: Update the object below with actual values
const example = {
  "protocol": null,
  "scheme": null,
  "network": null,
  "asset": null,
  "amount": null,
  "payTo": null,
  "maxTimeoutSeconds": null,
  "facilitator": null,
} satisfies SearchPaymentOffer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchPaymentOffer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
