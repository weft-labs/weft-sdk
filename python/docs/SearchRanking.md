# SearchRanking


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**popularity_score** | **float** |  | [optional] 
**settlement_count_30d** | **int** |  | [optional] 
**success_rate_30d** | **float** |  | [optional] 
**p50_latency_ms** | **int** |  | [optional] 
**first_seen_at** | **datetime** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_ranking import SearchRanking

# TODO update the JSON string below
json = "{}"
# create an instance of SearchRanking from a JSON string
search_ranking_instance = SearchRanking.from_json(json)
# print the JSON string representation of the object
print(SearchRanking.to_json())

# convert the object into a dict
search_ranking_dict = search_ranking_instance.to_dict()
# create an instance of SearchRanking from a dict
search_ranking_from_dict = SearchRanking.from_dict(search_ranking_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


