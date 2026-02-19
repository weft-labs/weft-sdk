# MessageResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**message** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.message_response_data import MessageResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of MessageResponseData from a JSON string
message_response_data_instance = MessageResponseData.from_json(json)
# print the JSON string representation of the object
print(MessageResponseData.to_json())

# convert the object into a dict
message_response_data_dict = message_response_data_instance.to_dict()
# create an instance of MessageResponseData from a dict
message_response_data_from_dict = MessageResponseData.from_dict(message_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


