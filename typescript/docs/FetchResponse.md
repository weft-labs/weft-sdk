
# FetchResponse

Successful fetch envelope. `body_base64` is the upstream artifact bytes, base64-encoded. `paid_usd`, `held_usd`, `payment_status`, `tx_hash`, and `merchant` are populated only when the upstream charged for the response.  `paid_usd` is \"0\" (never the nominal charge amount) until the charge is CONFIRMED settled on-chain — a signed-but-unsettled hold reports its amount in `held_usd` instead. This is a deliberate honesty fix: earlier versions of this endpoint returned the nominal amount in `paid_usd` unconditionally, even when the charge never settled. 

## Properties

Name | Type
------------ | -------------
`status` | number
`headers` | { [key: string]: string; }
`bodyBase64` | string
`paidUsd` | string
`heldUsd` | string
`paymentStatus` | string
`txHash` | string
`artifactId` | number
`merchant` | [Merchant](Merchant.md)

## Example

```typescript
import type { FetchResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "status": 200,
  "headers": null,
  "bodyBase64": null,
  "paidUsd": 0.002,
  "heldUsd": 0.002,
  "paymentStatus": pending,
  "txHash": null,
  "artifactId": null,
  "merchant": null,
} satisfies FetchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FetchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


