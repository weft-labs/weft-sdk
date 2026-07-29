# SearchEndpointCall

The machine-readable call contract for this endpoint: the verb, the provider-declared argument schema, and the worked examples. Always present; an endpoint whose provider declares nothing carries an empty `method` and null members rather than an absent block, so a caller can always read `input_schema` without a presence check. Combine with the hit's `url` to construct the request. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**method** | **str** | The HTTP verb to send. Empty string when neither the index nor the provider&#39;s own 402 challenge / OpenAPI spec declares one.  | [optional] 
**input_schema** | **object** | The provider&#39;s OWN structured declaration of the arguments this endpoint takes — the machine-usable form of what &#x60;usage_instructions&#x60; states in prose. Null when the provider declares nothing.  | [optional] 
**example_request** | **object** | A worked set of arguments grouped by slot (&#x60;query&#x60; / &#x60;body&#x60; / &#x60;path&#x60;). Every value is one the PROVIDER published; never synthesized.  | [optional] 
**example_response** | **object** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_endpoint_call import SearchEndpointCall

# TODO update the JSON string below
json = "{}"
# create an instance of SearchEndpointCall from a JSON string
search_endpoint_call_instance = SearchEndpointCall.from_json(json)
# print the JSON string representation of the object
print(SearchEndpointCall.to_json())

# convert the object into a dict
search_endpoint_call_dict = search_endpoint_call_instance.to_dict()
# create an instance of SearchEndpointCall from a dict
search_endpoint_call_from_dict = SearchEndpointCall.from_dict(search_endpoint_call_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


