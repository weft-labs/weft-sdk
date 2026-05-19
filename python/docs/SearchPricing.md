# SearchPricing

Aggregate pricing at the agent level. `recipient_address` is intentionally absent from the index — under x402 it is delivered per-request in the `402 Payment Required` challenge from the agent. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**protocol** | **str** |  | [optional] 
**scheme** | **str** |  | [optional] 
**amount_usd** | **str** | Default per-call amount; individual skills may override via &#x60;price_usd&#x60;. | [optional] 
**network** | **str** | Settlement network (e.g. &#x60;base-sepolia&#x60;). | [optional] 

## Example

```python
from weft_sdk.generated.models.search_pricing import SearchPricing

# TODO update the JSON string below
json = "{}"
# create an instance of SearchPricing from a JSON string
search_pricing_instance = SearchPricing.from_json(json)
# print the JSON string representation of the object
print(SearchPricing.to_json())

# convert the object into a dict
search_pricing_dict = search_pricing_instance.to_dict()
# create an instance of SearchPricing from a dict
search_pricing_from_dict = SearchPricing.from_dict(search_pricing_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


