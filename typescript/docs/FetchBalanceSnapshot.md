
# FetchBalanceSnapshot

Compact balance snapshot returned inside `FetchErrorResponse`. Less rich than `BalanceResponse` — just the three fields a CLI needs to explain why a fetch failed. 

## Properties

Name | Type
------------ | -------------
`promoUsd` | string
`walletUsdc` | string
`spentTodayUsd` | string

## Example

```typescript
import type { FetchBalanceSnapshot } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "promoUsd": 0.00,
  "walletUsdc": 12.34,
  "spentTodayUsd": 0.42,
} satisfies FetchBalanceSnapshot

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FetchBalanceSnapshot
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


