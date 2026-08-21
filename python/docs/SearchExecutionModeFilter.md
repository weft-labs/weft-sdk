# SearchExecutionModeFilter


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eq** | **str** |  | [optional]
**var_in** | **List[str]** |  | [optional]

## Example

```python
from weft_sdk.generated.models.search_execution_mode_filter import SearchExecutionModeFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchExecutionModeFilter from a JSON string
search_execution_mode_filter_instance = SearchExecutionModeFilter.from_json(json)
# print the JSON string representation of the object
print(SearchExecutionModeFilter.to_json())

# convert the object into a dict
search_execution_mode_filter_dict = search_execution_mode_filter_instance.to_dict()
# create an instance of SearchExecutionModeFilter from a dict
search_execution_mode_filter_from_dict = SearchExecutionModeFilter.from_dict(search_execution_mode_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
