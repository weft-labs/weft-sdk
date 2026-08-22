# Weft::AccountBootstrapRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **email** | **String** |  |  |
| **agent_name** | **String** |  |  |
| **host_name** | **String** |  | [optional] |
| **reason** | **String** |  | [optional] |
| **oauth_client_id** | **String** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional] |
| **requested_scopes** | **Array&lt;String&gt;** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AccountBootstrapRequest.new(
  email: null,
  agent_name: null,
  host_name: null,
  reason: null,
  oauth_client_id: null,
  requested_scopes: null
)
```
