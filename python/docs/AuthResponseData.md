# AuthResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**user** | [**User**](User.md) |  | 
**token** | **str** |  | [optional] 
**confirmation_required** | **bool** |  | 

## Example

```python
from weft_sdk.generated.models.auth_response_data import AuthResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of AuthResponseData from a JSON string
auth_response_data_instance = AuthResponseData.from_json(json)
# print the JSON string representation of the object
print(AuthResponseData.to_json())

# convert the object into a dict
auth_response_data_dict = auth_response_data_instance.to_dict()
# create an instance of AuthResponseData from a dict
auth_response_data_from_dict = AuthResponseData.from_dict(auth_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


