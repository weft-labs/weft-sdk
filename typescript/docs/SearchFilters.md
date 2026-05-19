
# SearchFilters

Optional narrowing applied after the embedding score is computed. Unknown keys are rejected. Price filters use the agent\'s cheapest skill for `max_price_usd` and the most-expensive skill for `min_price_usd`, so an agent stays in results as long as any one of its skills satisfies the band. 

## Properties

Name | Type
------------ | -------------
`minPriceUsd` | string
`maxPriceUsd` | string
`paymentProtocol` | string
`agentProtocol` | string
`domain` | string

## Example

```typescript
import type { SearchFilters } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "minPriceUsd": 0.01,
  "maxPriceUsd": 0.10,
  "paymentProtocol": null,
  "agentProtocol": null,
  "domain": null,
} satisfies SearchFilters

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchFilters
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


