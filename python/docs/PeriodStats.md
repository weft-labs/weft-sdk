# PeriodStats


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**this_week_volume** | **str** |  | 
**last_week_volume** | **str** |  | 
**volume_change** | **float** |  | [optional] 
**this_week_count** | **int** |  | 
**last_week_count** | **int** |  | 
**count_change** | **float** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.period_stats import PeriodStats

# TODO update the JSON string below
json = "{}"
# create an instance of PeriodStats from a JSON string
period_stats_instance = PeriodStats.from_json(json)
# print the JSON string representation of the object
print(PeriodStats.to_json())

# convert the object into a dict
period_stats_dict = period_stats_instance.to_dict()
# create an instance of PeriodStats from a dict
period_stats_from_dict = PeriodStats.from_dict(period_stats_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


