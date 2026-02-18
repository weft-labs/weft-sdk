
# AccountDetails


## Properties

Name | Type
------------ | -------------
`id` | number
`email` | string
`status` | string
`displayName` | string
`publicProfile` | boolean
`publicSlug` | string
`createdAt` | Date

## Example

```typescript
import type { AccountDetails } from '@weft/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "email": null,
  "status": null,
  "displayName": null,
  "publicProfile": null,
  "publicSlug": null,
  "createdAt": null,
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


