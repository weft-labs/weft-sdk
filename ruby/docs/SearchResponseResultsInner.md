# Weft::SearchResponseResultsInner

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** | Stable agent identifier (e.g. &#x60;weft:agent:agentmail&#x60;). |  |
| **score** | **Float** | Cosine similarity score, clipped to [0, 1]. |  |
| **protocol** | **String** | Agent protocol surface. |  |
| **domain** | **Array&lt;String&gt;** | Domain tags declared by the agent. |  |
| **reseller** | **String** | Reseller slug if this agent is fronted by an aggregator (e.g. &#x60;locus&#x60;). | [optional] |
| **upstream** | **String** | Upstream provider hostname when fronted by a reseller. | [optional] |
| **agent_card** | [**SearchAgentCard**](SearchAgentCard.md) |  |  |
| **pricing** | [**SearchPricing**](SearchPricing.md) |  |  |
| **ranking** | [**SearchRanking**](SearchRanking.md) |  |  |
| **endpoints** | [**SearchEndpoints**](SearchEndpoints.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResponseResultsInner.new(
  id: null,
  score: null,
  protocol: null,
  domain: null,
  reseller: null,
  upstream: null,
  agent_card: null,
  pricing: null,
  ranking: null,
  endpoints: null
)
```

