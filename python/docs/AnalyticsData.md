# AnalyticsData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**daily_volume** | [**List[DailyVolumePoint]**](DailyVolumePoint.md) |  | 
**daily_count** | [**List[DailyCountPoint]**](DailyCountPoint.md) |  | 
**period_stats** | [**PeriodStats**](PeriodStats.md) |  | 
**top_payers** | [**List[TopPayer]**](TopPayer.md) |  | 
**revenue_by_endpoint** | [**List[EndpointRevenue]**](EndpointRevenue.md) |  | 
**network_breakdown** | [**List[NetworkBreakdown]**](NetworkBreakdown.md) |  | 

## Example

```python
from weft_sdk.generated.models.analytics_data import AnalyticsData

# TODO update the JSON string below
json = "{}"
# create an instance of AnalyticsData from a JSON string
analytics_data_instance = AnalyticsData.from_json(json)
# print the JSON string representation of the object
print(AnalyticsData.to_json())

# convert the object into a dict
analytics_data_dict = analytics_data_instance.to_dict()
# create an instance of AnalyticsData from a dict
analytics_data_from_dict = AnalyticsData.from_dict(analytics_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


