# EnrolledResource

The `:created` view of a ghost resource. Adds `stats`, the single-use `claim_token`, and the `claim_url` to the base resource shape. The claim fields appear ONLY on this enrollment response — never in list or read views. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**slug** | **str** |  | 
**description** | **str** |  | [optional] 
**kind** | **str** |  | 
**visibility** | **str** |  | 
**wallet_address** | **str** | Declared wallet address, or &#x60;null&#x60; if none was provided. | [optional] 
**category** | **str** | Legacy v3 taxonomy field. Returns a string only for &#x60;agent&#x60;-kind resources that carry a &#x60;category&#x60; in their metadata; &#x60;null&#x60; for all other kinds and for agents without one. Always &#x60;null&#x60; on enrollment (category is a post-claim concern).  | 
**verified** | **bool** |  | 
**claimed** | **bool** | True once the resource has an owning provider. Always false at enrollment. | 
**created_at** | **datetime** |  | 
**stats** | [**ResourceStats**](ResourceStats.md) |  | 
**claim_token** | **str** | Single-use token for the magic claim URL. Surfaced only on enrollment. | 
**claim_url** | **str** | Dashboard path the agent hands to its human to claim the resource. | 

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


