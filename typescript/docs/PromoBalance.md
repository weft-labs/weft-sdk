
# PromoBalance

Freemium promo credit. v1 returns zero values; once the promo ledger ships (deferred from spec 10), real balances appear here without a shape change. 

## Properties

Name | Type
------------ | -------------
`balanceUsd` | string
`scope` | string
`expiresAt` | Date

## Example

```typescript
import type { PromoBalance } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "balanceUsd": 0.00,
  "scope": weft-search,
  "expiresAt": null,
} satisfies PromoBalance

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PromoBalance
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


