# Weft::SearchEndpointPrice

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **indexed_usd** | **String** | The indexed price in USD as a decimal string (e.g. \&quot;0.008\&quot;) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced.  | [optional] |
| **atomic** | **Integer** | The same price in integer micro-USD — the settlement grain, exact. Null exactly when &#x60;indexed_usd&#x60; is. Use this for settlement.  | [optional] |
| **source** | **String** | Where the amount came from. &#x60;probe&#x60; &#x3D; observed live in the endpoint&#39;s own 402 payment-required challenge — an observation, the strongest evidence we hold. &#x60;inferred&#x60; &#x3D; derived from a spec (OpenAPI) or a resale edge by the extraction pipeline, so it can lag a provider&#39;s re-pricing. Null when the endpoint carries no price.  | [optional] |
| **last_observed_at** | **Time** | When the amount was observed. Null when unrecorded. | [optional] |
| **live_verified** | **Boolean** | Whether this amount was confirmed against a live 402 challenge for THIS response. Search does not issue a payment-required probe at query time, so this is &#x60;false&#x60; today — treat an unflagged price as indexed, not verified.  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchEndpointPrice.new(
  indexed_usd: null,
  atomic: null,
  source: null,
  last_observed_at: null,
  live_verified: null
)
```
