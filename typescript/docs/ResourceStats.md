
# ResourceStats

Aggregate public payment stats for the resource.

## Properties

Name | Type
------------ | -------------
`totalPaid` | number
`totalReceived` | number
`paymentsMade` | number
`paymentsReceived` | number
`uniqueCounterparties` | number
`firstSeen` | Date
`lastActive` | Date

## Example

```typescript
import type { ResourceStats } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "totalPaid": null,
  "totalReceived": null,
  "paymentsMade": null,
  "paymentsReceived": null,
  "uniqueCounterparties": null,
  "firstSeen": null,
  "lastActive": null,
} satisfies ResourceStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResourceStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


