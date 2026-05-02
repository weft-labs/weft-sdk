
# TopPayer


## Properties

Name | Type
------------ | -------------
`address` | string
`truncated` | string
`volume` | string
`volumeRaw` | number
`count` | number

## Example

```typescript
import type { TopPayer } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "address": null,
  "truncated": null,
  "volume": null,
  "volumeRaw": null,
  "count": null,
} satisfies TopPayer

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as TopPayer
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


