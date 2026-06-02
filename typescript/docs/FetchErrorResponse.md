
# FetchErrorResponse

Bespoke error envelope for `/api/v1/fetch`. Every error carries the buyer\'s current `policy`, `balance`, and a `dashboard_url` so a CLI can render an actionable message without a second round-trip.  `error` values include the fixed codes listed below plus the `POLICY_VIOLATION_<REASON>` family, where `<REASON>` is the violated policy field (`MAX_TX`, `DAILY`, or `WEEKLY` — see `PolicyViolation::REASONS`). 

## Properties

Name | Type
------------ | -------------
`error` | string
`details` | { [key: string]: any; }
`policy` | [SpendingPolicy](SpendingPolicy.md)
`balance` | [FetchBalanceSnapshot](FetchBalanceSnapshot.md)
`dashboardUrl` | string

## Example

```typescript
import type { FetchErrorResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "error": EXCEEDED_MAX_COST,
  "details": null,
  "policy": null,
  "balance": null,
  "dashboardUrl": null,
} satisfies FetchErrorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FetchErrorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


