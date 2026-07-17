# SearchResourceTypeFilter

Resource-type constraint. Set exactly one of `eq` / `in`.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eq** | **str** | Resource type is exactly this value. | [optional] 
**var_in** | **List[str]** | Resource type is one of these values. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_resource_type_filter import SearchResourceTypeFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchResourceTypeFilter from a JSON string
search_resource_type_filter_instance = SearchResourceTypeFilter.from_json(json)
# print the JSON string representation of the object
print(SearchResourceTypeFilter.to_json())

# convert the object into a dict
search_resource_type_filter_dict = search_resource_type_filter_instance.to_dict()
# create an instance of SearchResourceTypeFilter from a dict
search_resource_type_filter_from_dict = SearchResourceTypeFilter.from_dict(search_resource_type_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


