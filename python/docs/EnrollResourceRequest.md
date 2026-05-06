# EnrollResourceRequest

Public self-enrollment payload. `slug` and `category` are intentionally not accepted — the server generates the slug from `name`, and category is set after the human claims the Resource. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**kind** | **str** | Resource type. Determines which storefront and dashboard surfaces apply after claim.  | 
**name** | **str** | Display name. Becomes the basis for the server-generated &#x60;slug&#x60;. | 
**description** | **str** | Optional human-readable description. | [optional] 
**wallet_address** | **str** | Optional Ethereum address declared at enrollment time. Stored as &#x60;declared_wallet_address&#x60; on the ghost Resource for later reconciliation; never used as the canonical Provider wallet.  | [optional] 

## Example

```python
from weft_sdk.generated.models.enroll_resource_request import EnrollResourceRequest

# TODO update the JSON string below
json = "{}"
# create an instance of EnrollResourceRequest from a JSON string
enroll_resource_request_instance = EnrollResourceRequest.from_json(json)
# print the JSON string representation of the object
print(EnrollResourceRequest.to_json())

# convert the object into a dict
enroll_resource_request_dict = enroll_resource_request_instance.to_dict()
# create an instance of EnrollResourceRequest from a dict
enroll_resource_request_from_dict = EnrollResourceRequest.from_dict(enroll_resource_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


