
# EnrollResourceRequest

Public self-enrollment payload. `slug` and `category` are intentionally not accepted — the server generates the slug from `name`, and category is set after the human claims the Resource. 

## Properties

Name | Type
------------ | -------------
`kind` | string
`name` | string
`description` | string
`walletAddress` | string

## Example

```typescript
import type { EnrollResourceRequest } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "kind": null,
  "name": null,
  "description": null,
  "walletAddress": null,
} satisfies EnrollResourceRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnrollResourceRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


