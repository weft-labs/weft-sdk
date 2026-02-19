# ApiKeyCreatedResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**ApiKeyCreated**](ApiKeyCreated.md) |  | 

## Example

```python
from weft_sdk.generated.models.api_key_created_response import ApiKeyCreatedResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ApiKeyCreatedResponse from a JSON string
api_key_created_response_instance = ApiKeyCreatedResponse.from_json(json)
# print the JSON string representation of the object
print(ApiKeyCreatedResponse.to_json())

# convert the object into a dict
api_key_created_response_dict = api_key_created_response_instance.to_dict()
# create an instance of ApiKeyCreatedResponse from a dict
api_key_created_response_from_dict = ApiKeyCreatedResponse.from_dict(api_key_created_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


