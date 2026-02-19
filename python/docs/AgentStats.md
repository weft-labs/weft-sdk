# AgentStats


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_paid** | **int** |  | [optional] 
**total_received** | **int** |  | [optional] 
**payments_made** | **int** |  | [optional] 
**payments_received** | **int** |  | [optional] 
**unique_counterparties** | **int** |  | [optional] 
**first_seen** | **datetime** |  | [optional] 
**last_active** | **datetime** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.agent_stats import AgentStats

# TODO update the JSON string below
json = "{}"
# create an instance of AgentStats from a JSON string
agent_stats_instance = AgentStats.from_json(json)
# print the JSON string representation of the object
print(AgentStats.to_json())

# convert the object into a dict
agent_stats_dict = agent_stats_instance.to_dict()
# create an instance of AgentStats from a dict
agent_stats_from_dict = AgentStats.from_dict(agent_stats_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


