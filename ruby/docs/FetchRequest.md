# Weft::FetchRequest

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **url** | **String** | Target URL. Must pass Weft&#39;s URL safety check (no SSRF / private IP ranges). |  |
| **max_cost_usd** | **String** | Hard ceiling on what the buyer is willing to pay. Defaults to &#x60;0.10&#x60; USD. | [optional][default to &#39;0.10&#39;] |
| **method** | **String** | HTTP method to use against the upstream. | [optional][default to &#39;GET&#39;] |
| **body** | [**FetchRequestBody**](FetchRequestBody.md) |  | [optional] |
| **headers** | **Hash&lt;String, String&gt;** | Headers forwarded to the upstream. Up to 32 headers, 4 KB total. The following are silently stripped: &#x60;host&#x60;, &#x60;authorization&#x60;, &#x60;cookie&#x60;, &#x60;proxy-authorization&#x60;, &#x60;x-forwarded-*&#x60;, &#x60;x-real-ip&#x60;, &#x60;x-payment&#x60;, &#x60;connection&#x60;, &#x60;upgrade&#x60;.  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchRequest.new(
  url: https://x402.api.agentmail.to/v0/inboxes,
  max_cost_usd: 0.05,
  method: null,
  body: null,
  headers: {Accept&#x3D;application/json, User-Agent&#x3D;my-agent/1.0}
)
```

