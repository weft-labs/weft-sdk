# Weft::AccountBootstrapCreated

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  |  |
| **status** | **String** |  |  |
| **capabilities** | **Array&lt;String&gt;** |  |  |
| **expires_at** | **Time** |  |  |
| **approval** | [**AccountBootstrapCreatedApproval**](AccountBootstrapCreatedApproval.md) |  |  |
| **temporary_api_key** | **String** | Returned once. Store as a secret; it cannot be recovered. |  |
| **device_code** | **String** | Returned once. Poll the OAuth token endpoint with this secret. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AccountBootstrapCreated.new(
  id: null,
  status: null,
  capabilities: null,
  expires_at: null,
  approval: null,
  temporary_api_key: null,
  device_code: null
)
```
