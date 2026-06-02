# ResourceStats

Aggregate public payment stats for the resource.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total_paid** | **int** | Total atomic units paid out by this resource. | 
**total_received** | **int** | Total atomic units received by this resource. | 
**payments_made** | **int** |  | 
**payments_received** | **int** |  | 
**unique_counterparties** | **int** |  | 
**first_seen** | **datetime** |  | 
**last_active** | **datetime** |  | 

## Example

```python
from weft_sdk.generated.models.resource_stats import ResourceStats

# TODO update the JSON string below
json = "{}"
# create an instance of ResourceStats from a JSON string
resource_stats_instance = ResourceStats.from_json(json)
# print the JSON string representation of the object
print(ResourceStats.to_json())

# convert the object into a dict
resource_stats_dict = resource_stats_instance.to_dict()
# create an instance of ResourceStats from a dict
resource_stats_from_dict = ResourceStats.from_dict(resource_stats_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


