# ResourceEnrollmentRequest

`slug` and `category` are accepted but silently ignored — the server generates the slug from `name`, and category is a post-claim concern. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **str** | Resource kind. Must be one of the supported kinds (currently &#x60;agent&#x60;); an unknown value is rejected with a 422.  | 
**name** | **str** | Human-readable name; the server derives the slug from it. | 
**description** | **str** |  | [optional] 
**wallet_address** | **str** | Declared EVM wallet address for the ghost resource. Stored as a claim (unverified) until the resource is claimed.  | [optional] 

## Example

```python
from weft_sdk.generated.models.resource_enrollment_request import ResourceEnrollmentRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ResourceEnrollmentRequest from a JSON string
resource_enrollment_request_instance = ResourceEnrollmentRequest.from_json(json)
# print the JSON string representation of the object
print(ResourceEnrollmentRequest.to_json())

# convert the object into a dict
resource_enrollment_request_dict = resource_enrollment_request_instance.to_dict()
# create an instance of ResourceEnrollmentRequest from a dict
resource_enrollment_request_from_dict = ResourceEnrollmentRequest.from_dict(resource_enrollment_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


