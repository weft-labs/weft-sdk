
# AccountBootstrapRequest


## Properties

Name | Type
------------ | -------------
`email` | string
`agentName` | string
`hostName` | string
`reason` | string
`oauthClientId` | string
`requestedScopes` | Set&lt;string&gt;

## Example

```typescript
import type { AccountBootstrapRequest } from '@weftlabs/sdk'

// TODO: Update the object below with actual values
const example = {
  "email": null,
  "agentName": null,
  "hostName": null,
  "reason": null,
  "oauthClientId": null,
  "requestedScopes": null,
} satisfies AccountBootstrapRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountBootstrapRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
