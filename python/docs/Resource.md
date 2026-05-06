# Resource

A Resource is the unit of agent-economy supply: an agent, a paid data API, or an MCP server. Resources without a Provider (`claimed: false`) are \"ghost\" Resources — discoverable on their public profile until claimed by a human controller, after which they belong to a Provider/Organization. 

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

## Example

```python
from weft_sdk.generated.models.resource import Resource

# TODO update the JSON string below
json = "{}"
# create an instance of Resource from a JSON string
resource_instance = Resource.from_json(json)
# print the JSON string representation of the object
print(Resource.to_json())

# convert the object into a dict
resource_dict = resource_instance.to_dict()
# create an instance of Resource from a dict
resource_from_dict = Resource.from_dict(resource_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


