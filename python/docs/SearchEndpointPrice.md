# SearchEndpointPrice

Price + provenance + freshness for this (endpoint × capability) pairing. Always present; an unpriced endpoint carries null amounts rather than an absent block, so a caller never has to distinguish \"free\" from \"we do not know\". 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**indexed_usd** | **str** | The indexed price in USD as a decimal string (e.g. \&quot;0.008\&quot;) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced.  | [optional] 
**atomic** | **int** | The same price in integer micro-USD — the settlement grain, exact. Null exactly when &#x60;indexed_usd&#x60; is. Use this for settlement.  | [optional] 
**source** | **str** | Where the amount came from. &#x60;probe&#x60; &#x3D; observed live in the endpoint&#39;s own 402 payment-required challenge — an observation, the strongest evidence we hold. &#x60;inferred&#x60; &#x3D; derived from a spec (OpenAPI) or a resale edge by the extraction pipeline, so it can lag a provider&#39;s re-pricing. Null when the endpoint carries no price.  | [optional] 
**last_observed_at** | **datetime** | When the amount was observed. Null when unrecorded. | [optional] 
**live_verified** | **bool** | Whether this amount was confirmed against a live 402 challenge for THIS response. Search does not issue a payment-required probe at query time, so this is &#x60;false&#x60; today — treat an unflagged price as indexed, not verified.  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_endpoint_price import SearchEndpointPrice

# TODO update the JSON string below
json = "{}"
# create an instance of SearchEndpointPrice from a JSON string
search_endpoint_price_instance = SearchEndpointPrice.from_json(json)
# print the JSON string representation of the object
print(SearchEndpointPrice.to_json())

# convert the object into a dict
search_endpoint_price_dict = search_endpoint_price_instance.to_dict()
# create an instance of SearchEndpointPrice from a dict
search_endpoint_price_from_dict = SearchEndpointPrice.from_dict(search_endpoint_price_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


