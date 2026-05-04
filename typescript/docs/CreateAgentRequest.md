
# CreateAgentRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`walletAddress` | string
`description` | string
`category` | string
`visibility` | string

## Example

```typescript
import type { CreateAgentRequest } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "walletAddress": null,
  "description": null,
  "category": null,
  "visibility": null,
} satisfies CreateAgentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateAgentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


