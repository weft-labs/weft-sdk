# Weft::PasswordUpdateRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **reset_password_token** | **String** |  |  |
| **password** | **String** |  |  |
| **password_confirmation** | **String** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::PasswordUpdateRequest.new(
  reset_password_token: null,
  password: null,
  password_confirmation: null
)
```

