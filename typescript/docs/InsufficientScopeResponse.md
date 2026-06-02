
# InsufficientScopeResponse

RFC 6750 §3.1 `insufficient_scope` error. Returned with HTTP 403 and a `WWW-Authenticate: Bearer error=\"insufficient_scope\", scope=\"...\"` header when an OAuth access token authenticates successfully but does not carry the scope the endpoint requires. Only OAuth bearer tokens are scope-gated; `wk_`-prefixed API keys are unscoped and never see this response. 

## Properties

Name | Type
------------ | -------------
`error` | string
`errorDescription` | string
`scope` | string

## Example

```typescript
import type { InsufficientScopeResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "error": insufficient_scope,
  "errorDescription": The access token does not include the required scope.,
  "scope": balance,
} satisfies InsufficientScopeResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as InsufficientScopeResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


