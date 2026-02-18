
# Payment


## Properties

Name | Type
------------ | -------------
`id` | number
`txHash` | string
`payerAddress` | string
`recipientAddress` | string
`amount` | number
`amountFormatted` | string
`currency` | string
`network` | string
`resourceUrl` | string
`resourceHost` | string
`feeAmount` | number
`settlementLatencyMs` | number
`settledAt` | Date
`apiKeyName` | string

## Example

```typescript
import type { Payment } from '@weft/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "txHash": null,
  "payerAddress": null,
  "recipientAddress": null,
  "amount": null,
  "amountFormatted": null,
  "currency": null,
  "network": null,
  "resourceUrl": null,
  "resourceHost": null,
  "feeAmount": null,
  "settlementLatencyMs": null,
  "settledAt": null,
  "apiKeyName": null,
} satisfies Payment

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Payment
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


