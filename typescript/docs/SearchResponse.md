
# SearchResponse

The weft-search-platform `POST /v1/search` response envelope. The mock backend emits the same shape and adds `_mock: true`. 

## Properties

Name | Type
------------ | -------------
`queryTraceId` | string
`query` | string
`appliedFilters` | [SearchFilterSpec](SearchFilterSpec.md)
`decompositionSource` | string
`embedderModel` | string
`candidatesConsidered` | number
`warnings` | [Array&lt;SearchResponseWarningsInner&gt;](SearchResponseWarningsInner.md)
`results` | [Array&lt;SearchResult&gt;](SearchResult.md)
`mock` | boolean

## Example

```typescript
import type { SearchResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "queryTraceId": null,
  "query": null,
  "appliedFilters": null,
  "decompositionSource": null,
  "embedderModel": null,
  "candidatesConsidered": null,
  "warnings": null,
  "results": null,
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


