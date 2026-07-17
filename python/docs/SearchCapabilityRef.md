# SearchCapabilityRef


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**capability_id** | **str** |  | [optional] 
**capability_type** | **str** |  | [optional] 
**resolution_confidence** | **float** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_capability_ref import SearchCapabilityRef

# TODO update the JSON string below
json = "{}"
# create an instance of SearchCapabilityRef from a JSON string
search_capability_ref_instance = SearchCapabilityRef.from_json(json)
# print the JSON string representation of the object
print(SearchCapabilityRef.to_json())

# convert the object into a dict
search_capability_ref_dict = search_capability_ref_instance.to_dict()
# create an instance of SearchCapabilityRef from a dict
search_capability_ref_from_dict = SearchCapabilityRef.from_dict(search_capability_ref_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


