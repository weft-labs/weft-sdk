
# SearchCapabilityRef


## Properties

Name | Type
------------ | -------------
`capabilityId` | string
`capabilityType` | string
`resolutionConfidence` | number

## Example

```typescript
import type { SearchCapabilityRef } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "capabilityId": null,
  "capabilityType": null,
  "resolutionConfidence": null,
} satisfies SearchCapabilityRef

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchCapabilityRef
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


