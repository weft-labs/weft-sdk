# PasswordUpdateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**reset_password_token** | **str** |  | 
**password** | **str** |  | 
**password_confirmation** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.password_update_request import PasswordUpdateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PasswordUpdateRequest from a JSON string
password_update_request_instance = PasswordUpdateRequest.from_json(json)
# print the JSON string representation of the object
print(PasswordUpdateRequest.to_json())

# convert the object into a dict
password_update_request_dict = password_update_request_instance.to_dict()
# create an instance of PasswordUpdateRequest from a dict
password_update_request_from_dict = PasswordUpdateRequest.from_dict(password_update_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


