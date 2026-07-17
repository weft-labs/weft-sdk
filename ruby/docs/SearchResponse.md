# Weft::SearchResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **query_trace_id** | **String** | Opaque trace id for the served query, matching the platform &#x60;query_trace_id&#x60;. |  |
| **query** | **String** |  |  |
| **applied_filters** | [**SearchFilterSpec**](SearchFilterSpec.md) | The &#x60;FilterSpec&#x60; actually applied to recall, echoed back so the caller sees exactly what constrained the results. In the current contract this is the caller&#39;s &#x60;filters&#x60; verbatim (empty object when none were sent).  | [optional] |
| **decomposition_source** | **String** | Origin of &#x60;applied_filters&#x60;. &#x60;CALLER&#x60; today (the mock and the B1 platform have no query decomposer yet); &#x60;CLASSIFIER&#x60; / &#x60;MERGED&#x60; / &#x60;FALLBACK&#x60; arrive additively when the decomposer lands.  | [optional] |
| **embedder_model** | **String** |  |  |
| **candidates_considered** | **Integer** |  |  |
| **warnings** | [**Array&lt;SearchResponseWarningsInner&gt;**](SearchResponseWarningsInner.md) |  |  |
| **results** | [**Array&lt;SearchResult&gt;**](SearchResult.md) |  |  |
| **_mock** | **Boolean** | Present and &#x60;true&#x60; only when served by the mock backend. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResponse.new(
  query_trace_id: null,
  query: null,
  applied_filters: null,
  decomposition_source: null,
  embedder_model: null,
  candidates_considered: null,
  warnings: null,
  results: null,
  _mock: null
)
```

