# OpenApiDocument

An OpenAPI 3.1 document published by a `data_api` Resource. The published spec describes the Resource's own endpoints (paths, request/response shapes, tags). Pricing is intentionally absent — x402 negotiates price per-request via the `402 Payment Required` challenge from the resource server.  The document also carries a `x-weft.profileUrl` extension that deep-links back to the Resource's public storefront on weft. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**openapi** | **str** |  | 
**info** | **object** |  | 
**paths** | **object** |  | 
**components** | **object** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.open_api_document import OpenApiDocument

# TODO update the JSON string below
json = "{}"
# create an instance of OpenApiDocument from a JSON string
open_api_document_instance = OpenApiDocument.from_json(json)
# print the JSON string representation of the object
print(OpenApiDocument.to_json())

# convert the object into a dict
open_api_document_dict = open_api_document_instance.to_dict()
# create an instance of OpenApiDocument from a dict
open_api_document_from_dict = OpenApiDocument.from_dict(open_api_document_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


