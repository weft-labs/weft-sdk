
# BalanceResponse

Buyer\'s wallet snapshot. Note: unlike `/me` / `/payments` / `/api_keys`, this endpoint does NOT use a `data:` envelope — the response object is the snapshot directly. 

## Properties

Name | Type
------------ | -------------
`promo` | [PromoBalance](PromoBalance.md)
`wallet` | [Wallet](Wallet.md)
`spentTodayUsd` | string
`spentWeekUsd` | string
`policy` | [SpendingPolicy](SpendingPolicy.md)

## Example

```typescript
import type { BalanceResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "promo": null,
  "wallet": null,
  "spentTodayUsd": 0.0005,
  "spentWeekUsd": 3.10,
  "policy": null,
} satisfies BalanceResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as BalanceResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


