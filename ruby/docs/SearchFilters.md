# Weft::SearchFilters

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **min_price_usd** | **String** | Decimal USD floor; agent must have at least one skill priced at or above this. | [optional] |
| **max_price_usd** | **String** | Decimal USD ceiling; agent must have at least one skill priced at or below this. | [optional] |
| **payment_protocol** | **String** | Payment protocol the agent settles on. | [optional] |
| **agent_protocol** | **String** | Agent protocol surface (Agent-to-Agent, MCP, or raw OpenAPI). | [optional] |
| **domain** | **String** | Substring match against any of the agent&#39;s declared domain tags (e.g. &#x60;email&#x60;, &#x60;sales&#x60;, &#x60;enrichment&#x60;).  | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchFilters.new(
  min_price_usd: 0.01,
  max_price_usd: 0.10,
  payment_protocol: null,
  agent_protocol: null,
  domain: null
)
```

