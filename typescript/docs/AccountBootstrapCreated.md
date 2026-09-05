
# AccountBootstrapCreated


## Properties

Name | Type
------------ | -------------
`id` | string
`status` | string
`capabilities` | Set&lt;string&gt;
`expiresAt` | Date
`approval` | [AccountBootstrapCreatedApproval](AccountBootstrapCreatedApproval.md)
`temporaryApiKey` | string
`deviceCode` | string

## Example

```typescript
import type { AccountBootstrapCreated } from '@weftlabs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "status": null,
  "capabilities": null,
  "expiresAt": null,
  "approval": null,
  "temporaryApiKey": null,
  "deviceCode": null,
} satisfies AccountBootstrapCreated

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AccountBootstrapCreated
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
