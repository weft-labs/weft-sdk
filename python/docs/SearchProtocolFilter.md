# SearchProtocolFilter

Payment-protocol constraint. Set exactly one of `eq` / `in`.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**eq** | **str** | Primary protocol is exactly this value. | [optional] 
**var_in** | **List[str]** | Primary protocol is one of these values. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_protocol_filter import SearchProtocolFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchProtocolFilter from a JSON string
search_protocol_filter_instance = SearchProtocolFilter.from_json(json)
# print the JSON string representation of the object
print(SearchProtocolFilter.to_json())

# convert the object into a dict
search_protocol_filter_dict = search_protocol_filter_instance.to_dict()
# create an instance of SearchProtocolFilter from a dict
search_protocol_filter_from_dict = SearchProtocolFilter.from_dict(search_protocol_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


