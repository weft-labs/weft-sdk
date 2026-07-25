# Weft::SearchEndpointHit

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **endpoint_id** | **String** |  | [optional] |
| **shared_endpoint_id** | **String** | URL-level endpoint grouping id shared by method variants of the same URL. &#x60;endpoint_id&#x60; remains the per-operation id. Null on rows the platform has not grouped.  | [optional] |
| **url** | **String** |  | [optional] |
| **method** | **String** | Normalized HTTP method for this callable operation (e.g. &#x60;GET&#x60;, &#x60;POST&#x60;). Empty string for rows the platform carries no method for.  | [optional] |
| **resource_type** | **String** |  | [optional] |
| **primary_protocol** | **String** |  | [optional] |
| **price_atomic** | **Integer** | Price in atomic units (micro-USD) for this endpoint. Use this for settlement (exact, integer). Null when unpriced.  | [optional] |
| **price_usd** | **String** | Server-derived price in USD as a decimal string (&#x3D; &#x60;price_atomic&#x60; / 1e6, e.g. \&quot;0.008\&quot; for &#x60;price_atomic&#x60; 8000) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced (mirrors &#x60;price_atomic&#x60;). For settlement use &#x60;price_atomic&#x60;.  | [optional] |
| **price_currency** | **String** |  | [optional] |
| **price_decimals** | **Integer** |  | [optional] |
| **operated_by_id** | **String** |  | [optional] |
| **operated_by_type** | **String** |  | [optional] |
| **settled_via_facilitator_id** | **String** |  | [optional] |
| **ranking** | [**SearchEndpointRanking**](SearchEndpointRanking.md) |  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchEndpointHit.new(
  endpoint_id: null,
  shared_endpoint_id: null,
  url: null,
  method: null,
  resource_type: null,
  primary_protocol: null,
  price_atomic: null,
  price_usd: null,
  price_currency: null,
  price_decimals: null,
  operated_by_id: null,
  operated_by_type: null,
  settled_via_facilitator_id: null,
  ranking: null
)
```

