# EnrolledResource

A Resource as returned by `POST /api/v1/resources/enroll`. Extends the public Resource shape with the single-use `claim_token` and `claim_url`. These two fields appear ONLY on the enrollment response — never on list/show endpoints — and let the enrolling client hand the magic URL to its human controller. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**kind** | **str** |  | 
**name** | **str** |  | 
**slug** | **str** |  | 
**description** | **str** |  | [optional] 
**wallet_address** | **str** | Provider&#39;s wallet address; null while ghost (no Provider attached). | [optional] 
**category** | **str** | Domain category. Only populated for &#x60;kind: agent&#x60; Resources during the v3 → provider/resource transition; null for newer kinds.  | [optional] 
**visibility** | **str** |  | 
**verified** | **bool** |  | 
**claimed** | **bool** | True when the Resource has a Provider attached. Ghost Resources (claimed&#x3D;false) are publicly discoverable but cannot be edited until a human claims them.  | 
**created_at** | **datetime** |  | 
**claim_token** | **str** | Single-use token. ~256 bits of entropy. Surfaced exactly once, in this response. Used to claim the Resource at &#x60;/dashboard/claims/{claim_token}&#x60;.  | 
**claim_url** | **str** | Absolute path the agent&#39;s human controller visits to claim the Resource. | 

## Example

```python
from weft_sdk.generated.models.enrolled_resource import EnrolledResource

# TODO update the JSON string below
json = "{}"
# create an instance of EnrolledResource from a JSON string
enrolled_resource_instance = EnrolledResource.from_json(json)
# print the JSON string representation of the object
print(EnrolledResource.to_json())

# convert the object into a dict
enrolled_resource_dict = enrolled_resource_instance.to_dict()
# create an instance of EnrolledResource from a dict
enrolled_resource_from_dict = EnrolledResource.from_dict(enrolled_resource_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


