
# SearchProviderRef


## Properties

Name | Type
------------ | -------------
`providerId` | string
`displayName` | string
`originDomains` | Array&lt;string&gt;
`verificationState` | string
`identityConfidence` | number

## Example

```typescript
import type { SearchProviderRef } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "providerId": null,
  "displayName": null,
  "originDomains": null,
  "verificationState": null,
  "identityConfidence": null,
} satisfies SearchProviderRef

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchProviderRef
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


