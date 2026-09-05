
# SearchAccessMethod


## Properties

Name | Type
------------ | -------------
`accessMethodId` | string
`protocol` | string
`scheme` | string
`network` | string
`asset` | string
`assetDecimals` | number
`price` | object
`merchant` | object
`terms` | object
`status` | string
`weftFetch` | [SearchWeftFetchCompatibility](SearchWeftFetchCompatibility.md)

## Example

```typescript
import type { SearchAccessMethod } from '@weftlabs/sdk'

// TODO: Update the object below with actual values
const example = {
  "accessMethodId": null,
  "protocol": null,
  "scheme": null,
  "network": null,
  "asset": null,
  "assetDecimals": null,
  "price": null,
  "merchant": null,
  "terms": null,
  "status": null,
  "weftFetch": null,
} satisfies SearchAccessMethod

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchAccessMethod
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
