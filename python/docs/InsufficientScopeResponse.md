# InsufficientScopeResponse

RFC 6750 §3.1 `insufficient_scope` error. Returned with HTTP 403 and a `WWW-Authenticate: Bearer error=\"insufficient_scope\", scope=\"...\"` header when an OAuth access token authenticates successfully but does not carry the scope the endpoint requires. Only OAuth bearer tokens are scope-gated; `wk_`-prefixed API keys are unscoped and never see this response. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | **str** |  | 
**error_description** | **str** |  | 
**scope** | **str** | Space-delimited list of scopes the endpoint requires. | 

## Example

```python
from weft_sdk.generated.models.insufficient_scope_response import InsufficientScopeResponse

# TODO update the JSON string below
json = "{}"
# create an instance of InsufficientScopeResponse from a JSON string
insufficient_scope_response_instance = InsufficientScopeResponse.from_json(json)
# print the JSON string representation of the object
print(InsufficientScopeResponse.to_json())

# convert the object into a dict
insufficient_scope_response_dict = insufficient_scope_response_instance.to_dict()
# create an instance of InsufficientScopeResponse from a dict
insufficient_scope_response_from_dict = InsufficientScopeResponse.from_dict(insufficient_scope_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


