# Error

A single error inside an `ErrorResponse` envelope. `code` is the stable machine-readable identifier (snake_case), `message` is human-readable, `details` carries optional structured context (e.g. validation field breakdown), and `request_id` correlates with server logs for debugging. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **str** | Stable machine-readable error code (snake_case). | 
**message** | **str** | Human-readable error description. | 
**details** | **object** | Optional structured context about the failure. | [optional] 
**request_id** | **str** | Correlates with server logs; include when reporting bugs. | [optional] 

## Example

```python
from weft_sdk.generated.models.error import Error

# TODO update the JSON string below
json = "{}"
# create an instance of Error from a JSON string
error_instance = Error.from_json(json)
# print the JSON string representation of the object
print(Error.to_json())

# convert the object into a dict
error_dict = error_instance.to_dict()
# create an instance of Error from a dict
error_from_dict = Error.from_dict(error_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


