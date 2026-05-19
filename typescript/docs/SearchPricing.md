
# SearchPricing

Aggregate pricing at the agent level. `recipient_address` is intentionally absent from the index — under x402 it is delivered per-request in the `402 Payment Required` challenge from the agent. 

## Properties

Name | Type
------------ | -------------
`protocol` | string
`scheme` | string
`amountUsd` | string
`network` | string

## Example

```typescript
import type { SearchPricing } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "protocol": null,
  "scheme": per_call,
  "amountUsd": null,
  "network": null,
} satisfies SearchPricing

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchPricing
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


