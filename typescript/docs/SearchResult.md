
# SearchResult


## Properties

Name | Type
------------ | -------------
`id` | string
`score` | number
`protocol` | string
`domain` | Array&lt;string&gt;
`reseller` | string
`upstream` | string
`agentCard` | [SearchAgentCard](SearchAgentCard.md)
`pricing` | [SearchPricing](SearchPricing.md)
`ranking` | [SearchRanking](SearchRanking.md)
`endpoints` | [SearchEndpoints](SearchEndpoints.md)

## Example

```typescript
import type { SearchResult } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "score": null,
  "protocol": null,
  "domain": null,
  "reseller": null,
  "upstream": null,
  "agentCard": null,
  "pricing": null,
  "ranking": null,
  "endpoints": null,
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


