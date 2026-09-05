
# SearchStringSetFilter


## Properties

Name | Type
------------ | -------------
`eq` | string
`_in` | Array&lt;string&gt;

## Example

```typescript
import type { SearchStringSetFilter } from '@weftlabs/sdk'

// TODO: Update the object below with actual values
const example = {
  "eq": null,
  "_in": null,
} satisfies SearchStringSetFilter

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchStringSetFilter
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
