# Weft::AgentStats

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **total_paid** | **Integer** |  | [optional] |
| **total_received** | **Integer** |  | [optional] |
| **payments_made** | **Integer** |  | [optional] |
| **payments_received** | **Integer** |  | [optional] |
| **unique_counterparties** | **Integer** |  | [optional] |
| **first_seen** | **Time** |  | [optional] |
| **last_active** | **Time** |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AgentStats.new(
  total_paid: null,
  total_received: null,
  payments_made: null,
  payments_received: null,
  unique_counterparties: null,
  first_seen: null,
  last_active: null
)
```

