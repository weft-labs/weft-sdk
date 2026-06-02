# ResourceEnrollmentResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**EnrolledResource**](EnrolledResource.md) |  | 

## Example

```python
from weft_sdk.generated.models.resource_enrollment_response import ResourceEnrollmentResponse

# TODO update the JSON string below
json = "{}"
# create an instance of ResourceEnrollmentResponse from a JSON string
resource_enrollment_response_instance = ResourceEnrollmentResponse.from_json(json)
# print the JSON string representation of the object
print(ResourceEnrollmentResponse.to_json())

# convert the object into a dict
resource_enrollment_response_dict = resource_enrollment_response_instance.to_dict()
# create an instance of ResourceEnrollmentResponse from a dict
resource_enrollment_response_from_dict = ResourceEnrollmentResponse.from_dict(resource_enrollment_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


