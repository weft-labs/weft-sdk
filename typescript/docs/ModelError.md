
# ModelError

A single error inside an `ErrorResponse` envelope. `code` is the stable machine-readable identifier (snake_case), `message` is human-readable, `details` carries optional structured context (e.g. validation field breakdown), and `request_id` correlates with server logs for debugging. 

## Properties

Name | Type
------------ | -------------
`code` | string
`message` | string
`details` | object
`requestId` | string

## Example

```typescript
import type { ModelError } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "code": validation_failed,
  "message": Email has already been taken,
  "details": null,
  "requestId": req_01HX9F3K7B2N4P8Q1R6T8Y2Z5,
} satisfies ModelError

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ModelError
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


