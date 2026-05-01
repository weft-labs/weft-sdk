
# AnalyticsData


## Properties

Name | Type
------------ | -------------
`dailyVolume` | [Array&lt;DailyVolumePoint&gt;](DailyVolumePoint.md)
`dailyCount` | [Array&lt;DailyCountPoint&gt;](DailyCountPoint.md)
`periodStats` | [PeriodStats](PeriodStats.md)
`topPayers` | [Array&lt;TopPayer&gt;](TopPayer.md)
`revenueByEndpoint` | [Array&lt;EndpointRevenue&gt;](EndpointRevenue.md)
`networkBreakdown` | [Array&lt;NetworkBreakdown&gt;](NetworkBreakdown.md)

## Example

```typescript
import type { AnalyticsData } from '@weft-labs/sdk'

// TODO: Update the object below with actual values
const example = {
  "dailyVolume": null,
  "dailyCount": null,
  "periodStats": null,
  "topPayers": null,
  "revenueByEndpoint": null,
  "networkBreakdown": null,
} satisfies AnalyticsData

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as AnalyticsData
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


