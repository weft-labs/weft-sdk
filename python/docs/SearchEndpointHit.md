# SearchEndpointHit


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**endpoint_id** | **str** |  | [optional] 
**url** | **str** |  | [optional] 
**resource_type** | **str** |  | [optional] 
**primary_protocol** | **str** |  | [optional] 
**price_atomic** | **int** | Price in atomic units (micro-USD) for this endpoint. Use this for settlement (exact, integer). Null when unpriced.  | [optional] 
**price_usd** | **str** | Server-derived price in USD as a decimal string (&#x3D; &#x60;price_atomic&#x60; / 1e6, e.g. \&quot;0.008\&quot; for &#x60;price_atomic&#x60; 8000) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced (mirrors &#x60;price_atomic&#x60;). For settlement use &#x60;price_atomic&#x60;.  | [optional] 
**price_currency** | **str** |  | [optional] 
**price_decimals** | **int** |  | [optional] 
**operated_by_id** | **str** |  | [optional] 
**operated_by_type** | **str** |  | [optional] 
**settled_via_facilitator_id** | **str** |  | [optional] 
**ranking** | [**SearchEndpointRanking**](SearchEndpointRanking.md) |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_endpoint_hit import SearchEndpointHit

# TODO update the JSON string below
json = "{}"
# create an instance of SearchEndpointHit from a JSON string
search_endpoint_hit_instance = SearchEndpointHit.from_json(json)
# print the JSON string representation of the object
print(SearchEndpointHit.to_json())

# convert the object into a dict
search_endpoint_hit_dict = search_endpoint_hit_instance.to_dict()
# create an instance of SearchEndpointHit from a dict
search_endpoint_hit_from_dict = SearchEndpointHit.from_dict(search_endpoint_hit_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


