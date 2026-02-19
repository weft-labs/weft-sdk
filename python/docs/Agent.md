# Agent


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**slug** | **str** |  | 
**wallet_address** | **str** |  | 
**description** | **str** |  | [optional] 
**category** | **str** |  | 
**visibility** | **str** |  | 
**verified** | **bool** |  | 
**claimed** | **bool** | Whether the agent is claimed by a user | 
**stats** | [**AgentStats**](AgentStats.md) |  | [optional] 
**created_at** | **datetime** |  | 

## Example

```python
from weft_sdk.generated.models.agent import Agent

# TODO update the JSON string below
json = "{}"
# create an instance of Agent from a JSON string
agent_instance = Agent.from_json(json)
# print the JSON string representation of the object
print(Agent.to_json())

# convert the object into a dict
agent_dict = agent_instance.to_dict()
# create an instance of Agent from a dict
agent_from_dict = Agent.from_dict(agent_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


