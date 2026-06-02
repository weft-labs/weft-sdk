
# AccountDetails

The Organization that owns the authenticated API key — the principal in API v1 (the key represents an Org, not a person). `api_key` carries audit info about the key itself, including the user who minted it (`created_by`, which may be `null` if that user has left the Org). 

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`slug` | string
`kind` | string
`apiKey` | [MeApiKey](MeApiKey.md)

## Example

```typescript
import type { AccountDetails } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "slug": null,
  "kind": null,
  "apiKey": null,
} satisfies AccountDetails

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountDetails
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


