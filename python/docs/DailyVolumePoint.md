# DailyVolumePoint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**var_date** | **date** |  | 
**volume** | **float** | Volume in USDC | 
**label** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.daily_volume_point import DailyVolumePoint

# TODO update the JSON string below
json = "{}"
# create an instance of DailyVolumePoint from a JSON string
daily_volume_point_instance = DailyVolumePoint.from_json(json)
# print the JSON string representation of the object
print(DailyVolumePoint.to_json())

# convert the object into a dict
daily_volume_point_dict = daily_volume_point_instance.to_dict()
# create an instance of DailyVolumePoint from a dict
daily_volume_point_from_dict = DailyVolumePoint.from_dict(daily_volume_point_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


