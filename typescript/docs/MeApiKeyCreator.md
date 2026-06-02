
# MeApiKeyCreator

The user who minted this API key, surfaced for audit rendering only. `null` if that user has since left the Organization. NEVER use for authorization. 

## Properties

Name | Type
------------ | -------------
`id` | number
`email` | string
`displayName` | string

## Example

```typescript
import type { MeApiKeyCreator } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "displayName": null,
} satisfies MeApiKeyCreator

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MeApiKeyCreator
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


