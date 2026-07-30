# Weft::UserPrincipal

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **principal_type** | **String** |  |  |
| **id** | **Integer** |  |  |
| **email** | **String** |  |  |
| **display_name** | **String** |  | [optional] |
| **status** | **String** |  |  |
| **buyer_enabled** | **Boolean** |  |  |
| **seller_enabled** | **Boolean** |  |  |
| **provisioning_status** | **String** |  |  |
| **wallet** | [**PrincipalWallet**](PrincipalWallet.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::UserPrincipal.new(
  principal_type: null,
  id: null,
  email: null,
  display_name: null,
  status: null,
  buyer_enabled: null,
  seller_enabled: null,
  provisioning_status: null,
  wallet: null
)
```
