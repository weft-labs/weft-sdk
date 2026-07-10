# FetchBalanceSnapshot

Compact balance snapshot returned inside `FetchErrorResponse`. Less rich than `BalanceResponse` — just the fields a CLI needs to explain why a fetch failed. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**promo_usd** | **str** |  | 
**wallet_usdc** | **str** | Live Base USDC balance. | 
**tempo_usd** | **str** | Aggregated USD of allowlisted Tempo dollar tokens, 2dp. &#x60;null&#x60; when UNKNOWN (RPC read failed or no token allowlisted for the paired chain) — never \&quot;0.00\&quot; for an unread component.  | 
**total_usd** | **str** | Aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, 2dp. Equals &#x60;wallet_usdc&#x60; alone when &#x60;tempo_usd&#x60; is null. Null when the Base USDC provider is unreachable.  | 
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


