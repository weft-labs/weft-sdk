# Weft::Resource

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **kind** | **String** |  |  |
| **name** | **String** |  |  |
| **slug** | **String** |  |  |
| **description** | **String** |  | [optional] |
| **wallet_address** | **String** | Provider&#39;s wallet address; null while ghost (no Provider attached). | [optional] |
| **category** | **String** | Domain category. Only populated for &#x60;kind: agent&#x60; Resources during the v3 → provider/resource transition; null for newer kinds.  | [optional] |
| **visibility** | **String** |  |  |
| **verified** | **Boolean** |  |  |
| **claimed** | **Boolean** | True when the Resource has a Provider attached. Ghost Resources (claimed&#x3D;false) are publicly discoverable but cannot be edited until a human claims them.  |  |
| **created_at** | **Time** |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::Resource.new(
  id: null,
  kind: null,
  name: null,
  slug: null,
  description: null,
  wallet_address: null,
  category: null,
  visibility: null,
  verified: null,
  claimed: null,
  created_at: null
)
```

