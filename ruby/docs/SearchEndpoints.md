# Weft::SearchEndpoints

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **a2a** | **String** |  | [optional] |
| **mcp** | **String** |  | [optional] |
| **openapi** | **String** | URL to the agent&#39;s OpenAPI document. | [optional] |
| **weft_fetch_target** | **String** | Base URL the &#x60;weft_fetch&#x60; MCP tool should target for this agent. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchEndpoints.new(
  a2a: null,
  mcp: null,
  openapi: null,
  weft_fetch_target: null
)
```

