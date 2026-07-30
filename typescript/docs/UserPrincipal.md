
# UserPrincipal

The buyer User represented by an account API key or OAuth token.

## Properties

Name | Type
------------ | -------------
`principalType` | string
`id` | number
`email` | string
`displayName` | string
`status` | string
`buyerEnabled` | boolean
`sellerEnabled` | boolean
`provisioningStatus` | string
`wallet` | [PrincipalWallet](PrincipalWallet.md)

## Example

```typescript
import type { UserPrincipal } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "principalType": null,
  "id": null,
  "email": null,
  "displayName": null,
  "status": null,
  "buyerEnabled": null,
  "sellerEnabled": null,
  "provisioningStatus": null,
  "wallet": null,
} satisfies UserPrincipal

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserPrincipal
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
