# SpendingPolicy


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**max_tx_usd** | **str** | Maximum USD per single transaction. | 
**daily_limit_usd** | **str** | Maximum USD spent in a 24-hour window. | 
**weekly_limit_usd** | **str** | Maximum USD spent in a 7-day window. | 

## Example

```python
from weft_sdk.generated.models.spending_policy import SpendingPolicy

# TODO update the JSON string below
json = "{}"
# create an instance of SpendingPolicy from a JSON string
spending_policy_instance = SpendingPolicy.from_json(json)
# print the JSON string representation of the object
print(SpendingPolicy.to_json())

# convert the object into a dict
spending_policy_dict = spending_policy_instance.to_dict()
# create an instance of SpendingPolicy from a dict
spending_policy_from_dict = SpendingPolicy.from_dict(spending_policy_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


