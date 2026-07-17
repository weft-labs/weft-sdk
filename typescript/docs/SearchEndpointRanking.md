
# SearchEndpointRanking


## Properties

Name | Type
------------ | -------------
`similarity` | number
`priceAtomic` | number
`rankReason` | string
`probeStatus` | string
`medianTtfbMs` | number
`minTotalLatencyMs` | number
`maxTotalLatencyMs` | number

## Example

```typescript
import type { SearchEndpointRanking } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "similarity": null,
  "priceAtomic": null,
  "rankReason": null,
  "probeStatus": null,
  "medianTtfbMs": null,
  "minTotalLatencyMs": null,
  "maxTotalLatencyMs": null,
} satisfies SearchEndpointRanking

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchEndpointRanking
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


