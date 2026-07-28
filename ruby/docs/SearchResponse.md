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
| **match_quality** | **String** | Calibrated confidence in this result set — read this instead of thresholding a raw similarity score. &#x60;strong&#x60;: the top match is confidently on-intent, proceed. &#x60;weak&#x60;: above the relevance floor but inside the band where plausible-but-wrong matches live, verify the result before paying. &#x60;none&#x60;: nothing cleared the floor — &#x60;results&#x60; is empty and &#x60;reason&#x60; / &#x60;suggestion&#x60; say why. Results below the floor are never returned as near-misses.  | [optional][default to &#39;none&#39;] |
| **reason** | **String** | Machine-readable cause of an empty result set, non-null exactly when &#x60;match_quality&#x60; is &#x60;none&#x60;. &#x60;below_relevance_floor&#x60;: candidates ranked but the best scored under the floor. &#x60;filter_collapsed_pool&#x60;: a caller filter cut the pool before ranking and nothing relevant survived — relax the filter. &#x60;no_catalog_coverage&#x60;: recall returned no candidates at all on an unfiltered query. &#x60;unsupported_filter_value&#x60;: a filter value matches zero stored values, so it could never have matched. &#x60;index_unavailable&#x60;: no active index — an operational fault, paired with the &#x60;EMPTY_INDEX&#x60; warning.  | [optional] |
| **suggestion** | **String** | Human/agent-readable explanation of &#x60;reason&#x60;, carrying the concrete numbers behind it (pool sizes, the best discarded score against the floor, the values actually stored for a filter). Non-null exactly when &#x60;reason&#x60; is.  | [optional] |
| **results** | [**Array&lt;SearchResult&gt;**](SearchResult.md) | Ranked &#x60;(Provider + Capability)&#x60; results; empty when the index is empty or nothing cleared the relevance floor. Results BELOW the floor are never returned — an empty list plus a &#x60;reason&#x60; is the honest answer, not a list of near-misses in the same shape as a genuine match.  |  |
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
  match_quality: null,
  reason: null,
  suggestion: null,
  results: null,
  _mock: null
)
```

