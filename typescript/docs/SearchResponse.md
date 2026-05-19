
# SearchResponse

Spec-11 search envelope. `paid_usd`, `tx_hash`, and `artifact_id` are reserved for a later release that adds per-call billing and artifact persistence; they are always `null` in v1. `_mock: true` is set only by the mock backend. 

## Properties

Name | Type
------------ | -------------
`results` | [Array&lt;SearchResult&gt;](SearchResult.md)
`paidUsd` | string
`txHash` | string
`artifactId` | string
`mock` | boolean

## Example

```typescript
import type { SearchResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "results": null,
  "paidUsd": null,
  "txHash": null,
  "artifactId": null,
  "mock": null,
} satisfies SearchResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


