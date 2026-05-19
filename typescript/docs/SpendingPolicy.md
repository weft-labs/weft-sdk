
# SpendingPolicy


## Properties

Name | Type
------------ | -------------
`maxTxUsd` | string
`dailyLimitUsd` | string
`weeklyLimitUsd` | string

## Example

```typescript
import type { SpendingPolicy } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "maxTxUsd": 1.00,
  "dailyLimitUsd": 10.00,
  "weeklyLimitUsd": 50.00,
} satisfies SpendingPolicy

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SpendingPolicy
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


