# Weft::EnrolledResource

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **name** | **String** |  |  |
| **slug** | **String** |  |  |
| **description** | **String** |  | [optional] |
| **kind** | **String** |  |  |
| **visibility** | **String** |  |  |
| **wallet_address** | **String** | Declared wallet address, or &#x60;null&#x60; if none was provided. | [optional] |
| **category** | **String** | Legacy v3 taxonomy field. Returns a string only for &#x60;agent&#x60;-kind resources that carry a &#x60;category&#x60; in their metadata; &#x60;null&#x60; for all other kinds and for agents without one. Always &#x60;null&#x60; on enrollment (category is a post-claim concern).  |  |
| **verified** | **Boolean** |  |  |
| **claimed** | **Boolean** | True once the resource has an owning provider. Always false at enrollment. |  |
| **created_at** | **Time** |  |  |
| **stats** | [**ResourceStats**](ResourceStats.md) |  |  |
| **claim_token** | **String** | Single-use token for the magic claim URL. Surfaced only on enrollment. |  |
| **claim_url** | **String** | Dashboard path the agent hands to its human to claim the resource. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::EnrolledResource.new(
  id: null,
  name: null,
  slug: null,
  description: null,
  kind: agent,
  visibility: public_profile,
  wallet_address: null,
  category: null,
  verified: null,
  claimed: null,
  created_at: null,
  stats: null,
  claim_token: null,
  claim_url: null
)
```

