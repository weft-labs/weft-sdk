
# PeriodStats


## Properties

Name | Type
------------ | -------------
`thisWeekVolume` | string
`lastWeekVolume` | string
`volumeChange` | number
`thisWeekCount` | number
`lastWeekCount` | number
`countChange` | number

## Example

```typescript
import type { PeriodStats } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "thisWeekVolume": null,
  "lastWeekVolume": null,
  "volumeChange": null,
  "thisWeekCount": null,
  "lastWeekCount": null,
  "countChange": null,
} satisfies PeriodStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as PeriodStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


