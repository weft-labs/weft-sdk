# Weft::SearchAgentCard

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **name** | **String** |  | [optional] |
| **description** | **String** |  | [optional] |
| **url** | **String** |  | [optional] |
| **version** | **String** |  | [optional] |
| **protocol_version** | **String** |  | [optional] |
| **capabilities** | **Hash&lt;String, Object&gt;** |  | [optional] |
| **default_input_modes** | **Array&lt;String&gt;** |  | [optional] |
| **default_output_modes** | **Array&lt;String&gt;** |  | [optional] |
| **skills** | [**Array&lt;SearchSkill&gt;**](SearchSkill.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchAgentCard.new(
  name: null,
  description: null,
  url: null,
  version: null,
  protocol_version: null,
  capabilities: null,
  default_input_modes: null,
  default_output_modes: null,
  skills: null
)
```

