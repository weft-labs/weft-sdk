
# WebhookEndpoint


## Properties

Name | Type
------------ | -------------
`id` | number
`url` | string
`events` | Array&lt;string&gt;
`active` | boolean
`description` | string
`createdAt` | Date
`updatedAt` | Date

## Example

```typescript
import type { WebhookEndpoint } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "url": null,
  "events": null,
  "active": null,
  "description": null,
  "createdAt": null,
  "updatedAt": null,
} satisfies WebhookEndpoint

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as WebhookEndpoint
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


