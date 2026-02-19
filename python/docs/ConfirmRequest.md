# ConfirmRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**confirmation_token** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.confirm_request import ConfirmRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ConfirmRequest from a JSON string
confirm_request_instance = ConfirmRequest.from_json(json)
# print the JSON string representation of the object
print(ConfirmRequest.to_json())

# convert the object into a dict
confirm_request_dict = confirm_request_instance.to_dict()
# create an instance of ConfirmRequest from a dict
confirm_request_from_dict = ConfirmRequest.from_dict(confirm_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


