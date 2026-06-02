
# ResourceEnrollmentRequest

`slug` and `category` are accepted but silently ignored — the server generates the slug from `name`, and category is a post-claim concern. 

## Properties

Name | Type
------------ | -------------
`kind` | string
`name` | string
`description` | string
`walletAddress` | string

## Example

```typescript
import type { ResourceEnrollmentRequest } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "kind": agent,
  "name": Self-Enrolled Bot,
  "description": null,
  "walletAddress": null,
} satisfies ResourceEnrollmentRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ResourceEnrollmentRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


