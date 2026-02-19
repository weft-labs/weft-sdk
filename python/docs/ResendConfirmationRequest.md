# ResendConfirmationRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.resend_confirmation_request import ResendConfirmationRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ResendConfirmationRequest from a JSON string
resend_confirmation_request_instance = ResendConfirmationRequest.from_json(json)
# print the JSON string representation of the object
print(ResendConfirmationRequest.to_json())

# convert the object into a dict
resend_confirmation_request_dict = resend_confirmation_request_instance.to_dict()
# create an instance of ResendConfirmationRequest from a dict
resend_confirmation_request_from_dict = ResendConfirmationRequest.from_dict(resend_confirmation_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


