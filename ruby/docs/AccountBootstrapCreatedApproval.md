# Weft::AccountBootstrapCreatedApproval

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **method** | **String** |  |  |
| **expires_in** | **Integer** |  |  |
| **interval** | **Integer** | Minimum OAuth device-token polling interval in seconds. |  |
| **user_code** | **String** | Show this code to the human; approval requires a matching normalized code. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::AccountBootstrapCreatedApproval.new(
  method: null,
  expires_in: null,
  interval: null,
  user_code: null
)
```
