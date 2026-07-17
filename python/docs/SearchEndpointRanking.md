# SearchEndpointRanking


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**similarity** | **float** |  | [optional] 
**price_atomic** | **int** |  | [optional] 
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


