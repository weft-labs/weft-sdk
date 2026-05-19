
# Wallet


## Properties

Name | Type
------------ | -------------
`address` | string
`balanceUsdc` | string
`network` | string

## Example

```typescript
import type { Wallet } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "balanceUsdc": 12.34,
  "network": null,
} satisfies Wallet

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Wallet
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


