# Weft::PeriodStats

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **this_week_volume** | **String** |  |  |
| **last_week_volume** | **String** |  |  |
| **volume_change** | **Float** |  | [optional] |
| **this_week_count** | **Integer** |  |  |
| **last_week_count** | **Integer** |  |  |
| **count_change** | **Float** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::PeriodStats.new(
  this_week_volume: null,
  last_week_volume: null,
  volume_change: null,
  this_week_count: null,
  last_week_count: null,
  count_change: null
)
```

