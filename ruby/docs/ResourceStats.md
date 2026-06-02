# Weft::ResourceStats

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **total_paid** | **Integer** | Total atomic units paid out by this resource. |  |
| **total_received** | **Integer** | Total atomic units received by this resource. |  |
| **payments_made** | **Integer** |  |  |
| **payments_received** | **Integer** |  |  |
| **unique_counterparties** | **Integer** |  |  |
| **first_seen** | **Time** |  |  |
| **last_active** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::ResourceStats.new(
  total_paid: null,
  total_received: null,
  payments_made: null,
  payments_received: null,
  unique_counterparties: null,
  first_seen: null,
  last_active: null
)
```

