# FetchBalanceSnapshot

Compact balance snapshot returned inside `FetchErrorResponse`. Less rich than `BalanceResponse` — just the three fields a CLI needs to explain why a fetch failed. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**promo_usd** | **str** |  | 
**wallet_usdc** | **str** |  | 
**spent_today_usd** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.fetch_balance_snapshot import FetchBalanceSnapshot

# TODO update the JSON string below
json = "{}"
# create an instance of FetchBalanceSnapshot from a JSON string
fetch_balance_snapshot_instance = FetchBalanceSnapshot.from_json(json)
# print the JSON string representation of the object
print(FetchBalanceSnapshot.to_json())

# convert the object into a dict
fetch_balance_snapshot_dict = fetch_balance_snapshot_instance.to_dict()
# create an instance of FetchBalanceSnapshot from a dict
fetch_balance_snapshot_from_dict = FetchBalanceSnapshot.from_dict(fetch_balance_snapshot_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


