# SearchEndpointRanking


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**similarity** | **float** |  | [optional] 
**price_atomic** | **int** | Price tie-breaker in atomic units — the probe-observed price when one exists, else the pipeline-inferred price. &#x60;price_source&#x60; says which. Null when no price is recorded; nulls sort last.  | [optional] 
**price_source** | **str** | Where &#x60;price_atomic&#x60; came from. &#x60;probe&#x60; &#x3D; observed live in the endpoint&#39;s own 402 payment-required challenge — authoritative, and refreshed on every probe. &#x60;inferred&#x60; &#x3D; derived from a spec (OpenAPI) or a resale edge by the extraction pipeline, so it can lag a provider&#39;s re-pricing. Null when the endpoint carries no price.  | [optional] 
**rank_reason** | **str** |  | [optional] 
**probe_status** | **str** |  | [optional] 
**median_ttfb_ms** | **int** |  | [optional] 
**min_total_latency_ms** | **int** |  | [optional] 
**max_total_latency_ms** | **int** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_endpoint_ranking import SearchEndpointRanking

# TODO update the JSON string below
json = "{}"
# create an instance of SearchEndpointRanking from a JSON string
search_endpoint_ranking_instance = SearchEndpointRanking.from_json(json)
# print the JSON string representation of the object
print(SearchEndpointRanking.to_json())

# convert the object into a dict
search_endpoint_ranking_dict = search_endpoint_ranking_instance.to_dict()
# create an instance of SearchEndpointRanking from a dict
search_endpoint_ranking_from_dict = SearchEndpointRanking.from_dict(search_endpoint_ranking_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


