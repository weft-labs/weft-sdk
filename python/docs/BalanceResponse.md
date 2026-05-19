# BalanceResponse

Buyer's wallet snapshot. Note: unlike `/me` / `/payments` / `/api_keys`, this endpoint does NOT use a `data:` envelope — the response object is the snapshot directly. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**promo** | [**PromoBalance**](PromoBalance.md) |  | 
**wallet** | [**Wallet**](Wallet.md) |  | 
**spent_today_usd** | **str** | USD spent in the current calendar day (UTC), 2dp. | 
**spent_week_usd** | **str** | USD spent in the current calendar week (UTC, Monday start), 2dp. | 
**policy** | [**SpendingPolicy**](SpendingPolicy.md) |  | 

## Example

```python
from weft_sdk.generated.models.balance_response import BalanceResponse

# TODO update the JSON string below
json = "{}"
# create an instance of BalanceResponse from a JSON string
balance_response_instance = BalanceResponse.from_json(json)
# print the JSON string representation of the object
print(BalanceResponse.to_json())

# convert the object into a dict
balance_response_dict = balance_response_instance.to_dict()
# create an instance of BalanceResponse from a dict
balance_response_from_dict = BalanceResponse.from_dict(balance_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


