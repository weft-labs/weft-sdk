# Weft::SearchSkill

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  | [optional] |
| **name** | **String** |  | [optional] |
| **description** | **String** |  | [optional] |
| **tags** | **Array&lt;String&gt;** |  | [optional] |
| **examples** | **Array&lt;String&gt;** |  | [optional] |
| **input_modes** | **Array&lt;String&gt;** |  | [optional] |
| **output_modes** | **Array&lt;String&gt;** |  | [optional] |
| **streaming** | **Boolean** | True for skills that require streaming transport (e.g. websockets). Streaming skills are filtered out of results by default so non-streaming clients only see callable skills.  | [optional] |
| **endpoint** | [**SearchSkillEndpoint**](SearchSkillEndpoint.md) |  | [optional] |
| **price_usd** | **String** | Per-call price in USD for this individual skill. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchSkill.new(
  id: null,
  name: null,
  description: null,
  tags: null,
  examples: null,
  input_modes: null,
  output_modes: null,
  streaming: null,
  endpoint: null,
  price_usd: null
)
```

