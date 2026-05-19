# Weft::FetchResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **status** | **Integer** | HTTP status returned by the upstream after the paid replay. |  |
| **headers** | **Hash&lt;String, String&gt;** | Response headers from the upstream. |  |
| **body_base64** | **String** | Base64-encoded response body. Empty string for empty bodies. |  |
| **paid_usd** | **String** | USD amount actually settled. Null for free upstreams. |  |
| **tx_hash** | **String** | Settlement transaction hash. Null for free upstreams. |  |
| **artifact_id** | **String** | Internal artifact identifier if the response was persisted. |  |
| **merchant** | [**Merchant**](Merchant.md) | Merchant reputation snapshot. Null for free upstreams. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchResponse.new(
  status: 200,
  headers: null,
  body_base64: null,
  paid_usd: 0.002,
  tx_hash: null,
  artifact_id: null,
  merchant: null
)
```

