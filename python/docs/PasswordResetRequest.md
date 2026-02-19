# PasswordResetRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.password_reset_request import PasswordResetRequest

# TODO update the JSON string below
json = "{}"
# create an instance of PasswordResetRequest from a JSON string
password_reset_request_instance = PasswordResetRequest.from_json(json)
# print the JSON string representation of the object
print(PasswordResetRequest.to_json())

# convert the object into a dict
password_reset_request_dict = password_reset_request_instance.to_dict()
# create an instance of PasswordResetRequest from a dict
password_reset_request_from_dict = PasswordResetRequest.from_dict(password_reset_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


