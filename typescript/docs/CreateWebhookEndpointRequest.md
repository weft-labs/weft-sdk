
# CreateWebhookEndpointRequest


## Properties

Name | Type
------------ | -------------
`url` | string
`events` | Array&lt;string&gt;
`description` | string

## Example

```typescript
import type { CreateWebhookEndpointRequest } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "url": null,
  "events": null,
  "description": null,
} satisfies CreateWebhookEndpointRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateWebhookEndpointRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


