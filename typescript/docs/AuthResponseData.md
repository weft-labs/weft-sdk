
# AuthResponseData


## Properties

Name | Type
------------ | -------------
`user` | [User](User.md)
`token` | string
`confirmationRequired` | boolean

## Example

```typescript
import type { AuthResponseData } from '@weft/sdk'

// TODO: Update the object below with actual values
const example = {
  "user": null,
  "token": null,
  "confirmationRequired": null,
} satisfies AuthResponseData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AuthResponseData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


