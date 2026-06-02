# MeApiKey


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | [optional] 
**created_at** | **datetime** |  | 
**last_used_at** | **datetime** |  | [optional] 
**created_by** | [**MeApiKeyCreator**](MeApiKeyCreator.md) |  | [optional] 

## Example

```python
from weft_sdk.generated.models.me_api_key import MeApiKey

# TODO update the JSON string below
json = "{}"
# create an instance of MeApiKey from a JSON string
me_api_key_instance = MeApiKey.from_json(json)
# print the JSON string representation of the object
print(MeApiKey.to_json())

# convert the object into a dict
me_api_key_dict = me_api_key_instance.to_dict()
# create an instance of MeApiKey from a dict
me_api_key_from_dict = MeApiKey.from_dict(me_api_key_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


