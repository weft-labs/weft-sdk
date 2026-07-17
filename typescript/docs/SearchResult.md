
# SearchResult


## Properties

Name | Type
------------ | -------------
`provider` | [SearchProviderRef](SearchProviderRef.md)
`capability` | [SearchCapabilityRef](SearchCapabilityRef.md)
`endpoints` | [Array&lt;SearchEndpointHit&gt;](SearchEndpointHit.md)
`score` | number

## Example

```typescript
import type { SearchResult } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "provider": null,
  "capability": null,
  "endpoints": null,
  "score": null,
} satisfies SearchResult

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchResult
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


