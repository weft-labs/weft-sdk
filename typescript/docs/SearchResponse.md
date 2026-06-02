
# SearchResponse

Spec-11 search envelope. `paid_usd`, `tx_hash`, and `artifact_id` are reserved for a later release that adds per-call billing and artifact persistence; they are always `null` in v1. `_mock: true` is set only by the mock backend.  Result rows: the mock backend (`SEARCH_BACKEND=mock`, the default while the real index is unshipped) emits the rich, SDK-facing `SearchResult` shape. The legacy `platform` backend proxies the upstream search service and passes its result rows through verbatim — Weft does not own or reshape that payload, so those rows are typed as a free-form object. SDK clients on v1 should treat unknown row shapes defensively until the platform backend is retrofitted to the `SearchResult` contract (specs 07 + 10).  Because the `PlatformSearchResult` branch is intentionally permissive (free-form, to admit the un-owned platform rows), the `anyOf` is satisfied by any object — so the committee response-validation gate does NOT strictly validate result-row shapes; the rich `SearchResult` contract is instead guarded by the `/api/v1/search` request spec. 

## Properties

Name | Type
------------ | -------------
`results` | [Array&lt;SearchResponseResultsInner&gt;](SearchResponseResultsInner.md)
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


