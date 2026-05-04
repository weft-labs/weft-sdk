
# EnrolledResource

A Resource as returned by `POST /api/v1/resources/enroll`. Extends the public Resource shape with the single-use `claim_token` and `claim_url`. These two fields appear ONLY on the enrollment response — never on list/show endpoints — and let the enrolling client hand the magic URL to its human controller. 

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
`claimToken` | string
`claimUrl` | string

## Example

```typescript
import type { EnrolledResource } from '@weft-labs/sdk'

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


