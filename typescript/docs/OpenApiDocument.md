
# OpenApiDocument

An OpenAPI 3.1 document published by a `data_api` Resource. The published spec describes the Resource\'s own endpoints (paths, request/response shapes, tags). Pricing is intentionally absent — x402 negotiates price per-request via the `402 Payment Required` challenge from the resource server.  The document also carries a `x-weft.profileUrl` extension that deep-links back to the Resource\'s public storefront on weft. 

## Properties

Name | Type
------------ | -------------
`openapi` | string
`info` | object
`paths` | object
`components` | object

## Example

```typescript
import type { OpenApiDocument } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "openapi": 3.1.0,
  "info": null,
  "paths": null,
  "components": null,
} satisfies OpenApiDocument

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as OpenApiDocument
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


