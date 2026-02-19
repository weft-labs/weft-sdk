# ApiKeyCreated


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | [optional] 
**key_prefix** | **str** |  | 
**raw_key** | **str** | Full API key (shown only once at creation) | 
**created_at** | **datetime** |  | 

## Example

```python
from weft_sdk.generated.models.api_key_created import ApiKeyCreated

# TODO update the JSON string below
json = "{}"
# create an instance of ApiKeyCreated from a JSON string
api_key_created_instance = ApiKeyCreated.from_json(json)
# print the JSON string representation of the object
print(ApiKeyCreated.to_json())

# convert the object into a dict
api_key_created_dict = api_key_created_instance.to_dict()
# create an instance of ApiKeyCreated from a dict
api_key_created_from_dict = ApiKeyCreated.from_dict(api_key_created_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


