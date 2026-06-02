# Weft::SearchResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **results** | [**Array&lt;SearchResponseResultsInner&gt;**](SearchResponseResultsInner.md) |  |  |
| **paid_usd** | **String** | Always &#x60;null&#x60; in v1. | [optional] |
| **tx_hash** | **String** | Always &#x60;null&#x60; in v1. | [optional] |
| **artifact_id** | **String** | Always &#x60;null&#x60; in v1. | [optional] |
| **_mock** | **Boolean** | Present and &#x60;true&#x60; only when served by the mock backend. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResponse.new(
  results: null,
  paid_usd: null,
  tx_hash: null,
  artifact_id: null,
  _mock: null
)
```

