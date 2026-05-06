# Weft::CreateWebhookEndpointRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **url** | **String** | HTTPS URL to send webhook events to |  |
| **events** | **Array&lt;String&gt;** | List of event types to subscribe to |  |
| **description** | **String** | Optional label for this endpoint | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::CreateWebhookEndpointRequest.new(
  url: null,
  events: null,
  description: null
)
```

