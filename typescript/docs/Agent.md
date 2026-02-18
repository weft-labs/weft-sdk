
# Agent


## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`slug` | string
`walletAddress` | string
`description` | string
`category` | string
`visibility` | string
`verified` | boolean
`claimed` | boolean
`stats` | [AgentStats](AgentStats.md)
`createdAt` | Date

## Example

```typescript
import type { Agent } from '@weft/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "slug": null,
  "walletAddress": null,
  "description": null,
  "category": null,
  "visibility": null,
  "verified": null,
  "claimed": null,
  "stats": null,
  "createdAt": null,
} satisfies Agent

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Agent
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


