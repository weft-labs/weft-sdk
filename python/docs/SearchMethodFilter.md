# SearchMethodFilter


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eq** | **str** |  | [optional]
**var_in** | **List[str]** |  | [optional]

## Example

```python
from weft_sdk.generated.models.search_method_filter import SearchMethodFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchMethodFilter from a JSON string
search_method_filter_instance = SearchMethodFilter.from_json(json)
# print the JSON string representation of the object
print(SearchMethodFilter.to_json())

# convert the object into a dict
search_method_filter_dict = search_method_filter_instance.to_dict()
# create an instance of SearchMethodFilter from a dict
search_method_filter_from_dict = SearchMethodFilter.from_dict(search_method_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
