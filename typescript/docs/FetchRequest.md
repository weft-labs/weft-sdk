
# FetchRequest


## Properties

Name | Type
------------ | -------------
`url` | string
`maxCostUsd` | string
`method` | string
`body` | [FetchRequestBody](FetchRequestBody.md)
`headers` | { [key: string]: string; }

## Example

```typescript
import type { FetchRequest } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "url": https://x402.api.agentmail.to/v0/inboxes,
  "maxCostUsd": 0.05,
  "method": null,
  "body": null,
  "headers": {Accept=application/json, User-Agent=my-agent/1.0},
} satisfies FetchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as FetchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


