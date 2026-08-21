
# CuratedMarketplaceContract


## Properties

Name | Type
------------ | -------------
`schemaVersion` | number
`snapshot` | { [key: string]: any; }
`provider` | { [key: string]: any; }
`service` | { [key: string]: any; }
`operation` | { [key: string]: any; }
`request` | { [key: string]: any; }
`accessMethods` | Array&lt;{ [key: string]: any; }&gt;
`evidence` | Array&lt;{ [key: string]: any; }&gt;

## Example

```typescript
import type { CuratedMarketplaceContract } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "schemaVersion": null,
  "snapshot": null,
  "provider": null,
  "service": null,
  "operation": null,
  "request": null,
  "accessMethods": null,
  "evidence": null,
} satisfies CuratedMarketplaceContract

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CuratedMarketplaceContract
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
