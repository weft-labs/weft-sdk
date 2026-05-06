
# Resource

A Resource is the unit of agent-economy supply: an agent, a paid data API, or an MCP server. Resources without a Provider (`claimed: false`) are \"ghost\" Resources — discoverable on their public profile until claimed by a human controller, after which they belong to a Provider/Organization. 

## Properties

Name | Type
------------ | -------------
`id` | number
`kind` | string
`name` | string
`slug` | string
`description` | string
`walletAddress` | string
`category` | string
`visibility` | string
`verified` | boolean
`claimed` | boolean
`createdAt` | Date

## Example

```typescript
import type { Resource } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "kind": null,
  "name": null,
  "slug": null,
  "description": null,
  "walletAddress": null,
  "category": null,
  "visibility": null,
  "verified": null,
  "claimed": null,
  "createdAt": null,
} satisfies Resource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Resource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


