# Weft::Agent

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **name** | **String** |  |  |
| **slug** | **String** |  |  |
| **wallet_address** | **String** |  |  |
| **description** | **String** |  | [optional] |
| **category** | **String** |  |  |
| **visibility** | **String** |  |  |
| **verified** | **Boolean** |  |  |
| **claimed** | **Boolean** | Whether the agent is claimed by a user |  |
| **stats** | [**AgentStats**](AgentStats.md) |  | [optional] |
| **created_at** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Agent.new(
  id: null,
  name: null,
  slug: null,
  wallet_address: null,
  description: null,
  category: null,
  visibility: null,
  verified: null,
  claimed: null,
  stats: null,
  created_at: null
)
```

