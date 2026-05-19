
# SearchErrorResponse

Bespoke error envelope returned by `/api/v1/search` for `422`, `502`, and `500` responses. It differs from the standard `ErrorResponse` envelope (no nested `code`/`message`/`request_id`); SDK clients should handle both shapes for this endpoint until the controller is migrated to the standard envelope. 

## Properties

Name | Type
------------ | -------------
`error` | string
`details` | { [key: string]: any; }

## Example

```typescript
import type { SearchErrorResponse } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "error": null,
  "details": null,
} satisfies SearchErrorResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchErrorResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


