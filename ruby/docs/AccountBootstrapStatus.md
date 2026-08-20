# Weft::AccountBootstrapStatus

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  |  |
| **status** | **String** |  |  |
| **capabilities** | **Array&lt;String&gt;** |  |  |
| **expires_at** | **Time** |  |  |
| **approval** | [**AccountBootstrapApproval**](AccountBootstrapApproval.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AccountBootstrapStatus.new(
  id: null,
  status: null,
  capabilities: null,
  expires_at: null,
  approval: null
)
```
