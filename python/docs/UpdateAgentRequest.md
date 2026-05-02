# UpdateAgentRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**category** | **str** |  | [optional] 
**visibility** | **str** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.update_agent_request import UpdateAgentRequest

# TODO update the JSON string below
json = "{}"
# create an instance of UpdateAgentRequest from a JSON string
update_agent_request_instance = UpdateAgentRequest.from_json(json)
# print the JSON string representation of the object
print(UpdateAgentRequest.to_json())

# convert the object into a dict
update_agent_request_dict = update_agent_request_instance.to_dict()
# create an instance of UpdateAgentRequest from a dict
update_agent_request_from_dict = UpdateAgentRequest.from_dict(update_agent_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


