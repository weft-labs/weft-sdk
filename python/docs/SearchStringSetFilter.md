# SearchStringSetFilter


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eq** | **str** |  | [optional]
**var_in** | **List[str]** |  | [optional]

## Example

```python
from weft_sdk.generated.models.search_string_set_filter import SearchStringSetFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchStringSetFilter from a JSON string
search_string_set_filter_instance = SearchStringSetFilter.from_json(json)
# print the JSON string representation of the object
print(SearchStringSetFilter.to_json())

# convert the object into a dict
search_string_set_filter_dict = search_string_set_filter_instance.to_dict()
# create an instance of SearchStringSetFilter from a dict
search_string_set_filter_from_dict = SearchStringSetFilter.from_dict(search_string_set_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
