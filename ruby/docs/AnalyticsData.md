# Weft::AnalyticsData

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **daily_volume** | [**Array&lt;DailyVolumePoint&gt;**](DailyVolumePoint.md) |  |  |
| **daily_count** | [**Array&lt;DailyCountPoint&gt;**](DailyCountPoint.md) |  |  |
| **period_stats** | [**PeriodStats**](PeriodStats.md) |  |  |
| **top_payers** | [**Array&lt;TopPayer&gt;**](TopPayer.md) |  |  |
| **revenue_by_endpoint** | [**Array&lt;EndpointRevenue&gt;**](EndpointRevenue.md) |  |  |
| **network_breakdown** | [**Array&lt;NetworkBreakdown&gt;**](NetworkBreakdown.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AnalyticsData.new(
  daily_volume: null,
  daily_count: null,
  period_stats: null,
  top_payers: null,
  revenue_by_endpoint: null,
  network_breakdown: null
)
```

