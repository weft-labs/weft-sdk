# SearchAgentCard

A2A-spec-shaped AgentCard. Free-form `capabilities` and per-skill metadata follow the upstream A2A schema; documented here only at the surface level Weft's index actually populates. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**url** | **str** |  | [optional] 
**version** | **str** |  | [optional] 
**protocol_version** | **str** |  | [optional] 
**capabilities** | **Dict[str, object]** |  | [optional] 
**default_input_modes** | **List[str]** |  | [optional] 
**default_output_modes** | **List[str]** |  | [optional] 
**skills** | [**List[SearchSkill]**](SearchSkill.md) |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_agent_card import SearchAgentCard

# TODO update the JSON string below
json = "{}"
# create an instance of SearchAgentCard from a JSON string
search_agent_card_instance = SearchAgentCard.from_json(json)
# print the JSON string representation of the object
print(SearchAgentCard.to_json())

# convert the object into a dict
search_agent_card_dict = search_agent_card_instance.to_dict()
# create an instance of SearchAgentCard from a dict
search_agent_card_from_dict = SearchAgentCard.from_dict(search_agent_card_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


