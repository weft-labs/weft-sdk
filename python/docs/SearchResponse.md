# SearchResponse

Spec-11 search envelope. `paid_usd`, `tx_hash`, and `artifact_id` are reserved for a later release that adds per-call billing and artifact persistence; they are always `null` in v1. `_mock: true` is set only by the mock backend. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**results** | [**List[SearchResult]**](SearchResult.md) |  | 
**paid_usd** | **str** | Always &#x60;null&#x60; in v1. | [optional] 
**tx_hash** | **str** | Always &#x60;null&#x60; in v1. | [optional] 
**artifact_id** | **str** | Always &#x60;null&#x60; in v1. | [optional] 
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


