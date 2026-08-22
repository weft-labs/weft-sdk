# SearchCuratedOperation


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  |
**name** | **str** |  |
**description** | **str** |  | [optional]

## Example

```python
from weft_sdk.generated.models.search_curated_operation import SearchCuratedOperation

# TODO update the JSON string below
json = "{}"
# create an instance of SearchCuratedOperation from a JSON string
search_curated_operation_instance = SearchCuratedOperation.from_json(json)
# print the JSON string representation of the object
print(SearchCuratedOperation.to_json())

# convert the object into a dict
search_curated_operation_dict = search_curated_operation_instance.to_dict()
# create an instance of SearchCuratedOperation from a dict
search_curated_operation_from_dict = SearchCuratedOperation.from_dict(search_curated_operation_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
