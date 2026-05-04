# EnrolledResourceResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**EnrolledResource**](EnrolledResource.md) |  | 

## Example

```python
from weft_sdk.generated.models.enrolled_resource_response import EnrolledResourceResponse

# TODO update the JSON string below
json = "{}"
# create an instance of EnrolledResourceResponse from a JSON string
enrolled_resource_response_instance = EnrolledResourceResponse.from_json(json)
# print the JSON string representation of the object
print(EnrolledResourceResponse.to_json())

# convert the object into a dict
enrolled_resource_response_dict = enrolled_resource_response_instance.to_dict()
# create an instance of EnrolledResourceResponse from a dict
enrolled_resource_response_from_dict = EnrolledResourceResponse.from_dict(enrolled_resource_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


