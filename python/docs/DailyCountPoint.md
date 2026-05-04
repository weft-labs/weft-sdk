# DailyCountPoint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**var_date** | **date** |  | 
**count** | **int** |  | 
**label** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.daily_count_point import DailyCountPoint

# TODO update the JSON string below
json = "{}"
# create an instance of DailyCountPoint from a JSON string
daily_count_point_instance = DailyCountPoint.from_json(json)
# print the JSON string representation of the object
print(DailyCountPoint.to_json())

# convert the object into a dict
daily_count_point_dict = daily_count_point_instance.to_dict()
# create an instance of DailyCountPoint from a dict
daily_count_point_from_dict = DailyCountPoint.from_dict(daily_count_point_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


