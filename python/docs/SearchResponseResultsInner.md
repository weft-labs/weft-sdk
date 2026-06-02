# SearchResponseResultsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** | Stable agent identifier (e.g. &#x60;weft:agent:agentmail&#x60;). | 
**score** | **float** | Cosine similarity score, clipped to [0, 1]. | 
**protocol** | **str** | Agent protocol surface. | 
**domain** | **List[str]** | Domain tags declared by the agent. | 
**reseller** | **str** | Reseller slug if this agent is fronted by an aggregator (e.g. &#x60;locus&#x60;). | [optional] 
**upstream** | **str** | Upstream provider hostname when fronted by a reseller. | [optional] 
**agent_card** | [**SearchAgentCard**](SearchAgentCard.md) |  | 
**pricing** | [**SearchPricing**](SearchPricing.md) |  | 
**ranking** | [**SearchRanking**](SearchRanking.md) |  | 
**endpoints** | [**SearchEndpoints**](SearchEndpoints.md) |  | 

## Example

```python
from weft_sdk.generated.models.search_response_results_inner import SearchResponseResultsInner

# TODO update the JSON string below
json = "{}"
# create an instance of SearchResponseResultsInner from a JSON string
search_response_results_inner_instance = SearchResponseResultsInner.from_json(json)
# print the JSON string representation of the object
print(SearchResponseResultsInner.to_json())

# convert the object into a dict
search_response_results_inner_dict = search_response_results_inner_instance.to_dict()
# create an instance of SearchResponseResultsInner from a dict
search_response_results_inner_from_dict = SearchResponseResultsInner.from_dict(search_response_results_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


