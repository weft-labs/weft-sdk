
# Merchant


## Properties

Name | Type
------------ | -------------
`address` | string
`settlementCount` | number
`firstSeenAt` | Date
`disputeCount` | number

## Example

```typescript
import type { Merchant } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "settlementCount": null,
  "firstSeenAt": null,
  "disputeCount": null,
} satisfies Merchant

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Merchant
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


