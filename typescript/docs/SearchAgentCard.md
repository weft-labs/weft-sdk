
# SearchAgentCard

A2A-spec-shaped AgentCard. Free-form `capabilities` and per-skill metadata follow the upstream A2A schema; documented here only at the surface level Weft\'s index actually populates. 

## Properties

Name | Type
------------ | -------------
`name` | string
`description` | string
`url` | string
`version` | string
`protocolVersion` | string
`capabilities` | { [key: string]: any; }
`defaultInputModes` | Array&lt;string&gt;
`defaultOutputModes` | Array&lt;string&gt;
`skills` | [Array&lt;SearchSkill&gt;](SearchSkill.md)

## Example

```typescript
import type { SearchAgentCard } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "description": null,
  "url": null,
  "version": null,
  "protocolVersion": null,
  "capabilities": null,
  "defaultInputModes": null,
  "defaultOutputModes": null,
  "skills": null,
} satisfies SearchAgentCard

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as SearchAgentCard
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


