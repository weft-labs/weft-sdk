
# SearchSkill


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`tags` | Array&lt;string&gt;
`examples` | Array&lt;string&gt;
`inputModes` | Array&lt;string&gt;
`outputModes` | Array&lt;string&gt;
`streaming` | boolean
`endpoint` | [SearchSkillEndpoint](SearchSkillEndpoint.md)
`priceUsd` | string

## Example

```typescript
import type { SearchSkill } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "tags": null,
  "examples": null,
  "inputModes": null,
  "outputModes": null,
  "streaming": null,
  "endpoint": null,
  "priceUsd": null,
} satisfies SearchSkill

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchSkill
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


