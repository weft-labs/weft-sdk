# SearchProviderRef


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**provider_id** | **str** |  | [optional] 
**display_name** | **str** |  | [optional] 
**origin_domains** | **List[str]** |  | [optional] 
**verification_state** | **str** |  | [optional] 
**identity_confidence** | **float** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_provider_ref import SearchProviderRef

# TODO update the JSON string below
json = "{}"
# create an instance of SearchProviderRef from a JSON string
search_provider_ref_instance = SearchProviderRef.from_json(json)
# print the JSON string representation of the object
print(SearchProviderRef.to_json())

# convert the object into a dict
search_provider_ref_dict = search_provider_ref_instance.to_dict()
# create an instance of SearchProviderRef from a dict
search_provider_ref_from_dict = SearchProviderRef.from_dict(search_provider_ref_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


