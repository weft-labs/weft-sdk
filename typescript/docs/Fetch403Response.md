
# Fetch403Response


## Properties

Name | Type
------------ | -------------
`error` | string
`details` | { [key: string]: any; }
`policy` | [SpendingPolicy](SpendingPolicy.md)
`balance` | [FetchBalanceSnapshot](FetchBalanceSnapshot.md)
`dashboardUrl` | string
`errorDescription` | string
`scope` | string

## Example

```typescript
import type { Fetch403Response } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "error": insufficient_scope,
  "details": null,
  "policy": null,
  "balance": null,
  "dashboardUrl": null,
  "errorDescription": The access token does not include the required scope.,
  "scope": balance,
} satisfies Fetch403Response

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Fetch403Response
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


