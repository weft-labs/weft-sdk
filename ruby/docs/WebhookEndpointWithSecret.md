# Weft::WebhookEndpointWithSecret

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **url** | **String** |  |  |
| **events** | **Array&lt;String&gt;** |  |  |
| **active** | **Boolean** |  |  |
| **description** | **String** |  | [optional] |
| **created_at** | **Time** |  |  |
| **updated_at** | **Time** |  |  |
| **secret** | **String** | Signing secret (whsec_*). Only returned once on creation. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::WebhookEndpointWithSecret.new(
  id: null,
  url: null,
  events: null,
  active: null,
  description: null,
  created_at: null,
  updated_at: null,
  secret: null
)
```

