# SearchResponse

The weft-search-platform `POST /v1/search` response envelope. The mock backend emits the same shape and adds `_mock: true`. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**query_trace_id** | **UUID** | Opaque trace id for the served query, matching the platform &#x60;query_trace_id&#x60;. | 
**query** | **str** |  | 
**applied_filters** | [**SearchFilterSpec**](SearchFilterSpec.md) | The &#x60;FilterSpec&#x60; actually applied to recall, echoed back so the caller sees exactly what constrained the results. In the current contract this is the caller&#39;s &#x60;filters&#x60; verbatim (empty object when none were sent).  | [optional] 
**decomposition_source** | **str** | Origin of &#x60;applied_filters&#x60;. &#x60;CALLER&#x60; today (the mock and the B1 platform have no query decomposer yet); &#x60;CLASSIFIER&#x60; / &#x60;MERGED&#x60; / &#x60;FALLBACK&#x60; arrive additively when the decomposer lands.  | [optional] 
**embedder_model** | **str** |  | 
**candidates_considered** | **int** |  | 
**warnings** | [**List[SearchResponseWarningsInner]**](SearchResponseWarningsInner.md) |  | 
**results** | [**List[SearchResult]**](SearchResult.md) |  | 
**mock** | **bool** | Present and &#x60;true&#x60; only when served by the mock backend. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_response import SearchResponse

# TODO update the JSON string below
json = "{}"
# create an instance of SearchResponse from a JSON string
search_response_instance = SearchResponse.from_json(json)
# print the JSON string representation of the object
print(SearchResponse.to_json())

# convert the object into a dict
search_response_dict = search_response_instance.to_dict()
# create an instance of SearchResponse from a dict
search_response_from_dict = SearchResponse.from_dict(search_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


