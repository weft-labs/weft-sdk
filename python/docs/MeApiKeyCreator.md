# MeApiKeyCreator

The user who minted this API key, surfaced for audit rendering only. `null` if that user has since left the Organization. NEVER use for authorization. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**email** | **str** |  | 
**display_name** | **str** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.me_api_key_creator import MeApiKeyCreator

# TODO update the JSON string below
json = "{}"
# create an instance of MeApiKeyCreator from a JSON string
me_api_key_creator_instance = MeApiKeyCreator.from_json(json)
# print the JSON string representation of the object
print(MeApiKeyCreator.to_json())

# convert the object into a dict
me_api_key_creator_dict = me_api_key_creator_instance.to_dict()
# create an instance of MeApiKeyCreator from a dict
me_api_key_creator_from_dict = MeApiKeyCreator.from_dict(me_api_key_creator_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


