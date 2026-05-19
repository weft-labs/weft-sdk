# SearchEndpoints

Per-protocol entry points for the agent. Any field may be `null` if the agent does not expose that protocol surface. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**a2a** | **str** |  | [optional] 
**mcp** | **str** |  | [optional] 
**openapi** | **str** | URL to the agent&#39;s OpenAPI document. | [optional] 
**weft_fetch_target** | **str** | Base URL the &#x60;weft_fetch&#x60; MCP tool should target for this agent. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_endpoints import SearchEndpoints

# TODO update the JSON string below
json = "{}"
# create an instance of SearchEndpoints from a JSON string
search_endpoints_instance = SearchEndpoints.from_json(json)
# print the JSON string representation of the object
print(SearchEndpoints.to_json())

# convert the object into a dict
search_endpoints_dict = search_endpoints_instance.to_dict()
# create an instance of SearchEndpoints from a dict
search_endpoints_from_dict = SearchEndpoints.from_dict(search_endpoints_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


