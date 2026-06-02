
# EnrolledResource

The `:created` view of a ghost resource. Adds `stats`, the single-use `claim_token`, and the `claim_url` to the base resource shape. The claim fields appear ONLY on this enrollment response — never in list or read views. 

## Properties

Name | Type
------------ | -------------
`id` | number
`name` | string
`slug` | string
`description` | string
`kind` | string
`visibility` | string
`walletAddress` | string
`category` | string
`verified` | boolean
`claimed` | boolean
`createdAt` | Date
`stats` | [ResourceStats](ResourceStats.md)
`claimToken` | string
`claimUrl` | string

## Example

```typescript
import type { EnrolledResource } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "slug": null,
  "description": null,
  "kind": agent,
  "visibility": public_profile,
  "walletAddress": null,
  "category": null,
  "verified": null,
  "claimed": null,
  "createdAt": null,
  "stats": null,
  "claimToken": null,
  "claimUrl": null,
} satisfies EnrolledResource

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnrolledResource
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


