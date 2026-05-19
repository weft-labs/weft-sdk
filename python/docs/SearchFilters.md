# SearchFilters

Optional narrowing applied after the embedding score is computed. Unknown keys are rejected. Price filters use the agent's cheapest skill for `max_price_usd` and the most-expensive skill for `min_price_usd`, so an agent stays in results as long as any one of its skills satisfies the band. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**min_price_usd** | **str** | Decimal USD floor; agent must have at least one skill priced at or above this. | [optional] 
**max_price_usd** | **str** | Decimal USD ceiling; agent must have at least one skill priced at or below this. | [optional] 
**payment_protocol** | **str** | Payment protocol the agent settles on. | [optional] 
**agent_protocol** | **str** | Agent protocol surface (Agent-to-Agent, MCP, or raw OpenAPI). | [optional] 
**domain** | **str** | Substring match against any of the agent&#39;s declared domain tags (e.g. &#x60;email&#x60;, &#x60;sales&#x60;, &#x60;enrichment&#x60;).  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_filters import SearchFilters

# TODO update the JSON string below
json = "{}"
# create an instance of SearchFilters from a JSON string
search_filters_instance = SearchFilters.from_json(json)
# print the JSON string representation of the object
print(SearchFilters.to_json())

# convert the object into a dict
search_filters_dict = search_filters_instance.to_dict()
# create an instance of SearchFilters from a dict
search_filters_from_dict = SearchFilters.from_dict(search_filters_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


