# BalanceResponse

Buyer's wallet snapshot. Note: unlike `/me` / `/payments` / `/api_keys`, this endpoint does NOT use a `data:` envelope — the response object is the snapshot directly.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**promo** | [**PromoBalance**](PromoBalance.md) |  |
**wallet** | [**Wallet**](Wallet.md) |  |
**spent_today_usd** | **str** | USD spent in the current calendar day (UTC). Exact to the micro-dollar so sub-cent micro-payments survive (\&quot;0.0005\&quot;, \&quot;0.42\&quot;), never narrower than two decimals; a zero total renders as \&quot;0.00\&quot;. |
**spent_week_usd** | **str** | USD spent in the current calendar week (UTC, Monday start). Exact to the micro-dollar (\&quot;0.0005\&quot;, \&quot;3.10\&quot;), never narrower than two decimals; a zero total renders as \&quot;0.00\&quot;. |
**policy_used_today_usd** | **str** | USD currently counted against the daily spending limit: pending authorizations at their maximum plus settled payments at the amount that moved. Exact to the micro-dollar; zero renders as \&quot;0.00\&quot;. |
**policy_used_week_usd** | **str** | USD currently counted against the weekly spending limit: pending authorizations at their maximum plus settled payments at the amount that moved. Exact to the micro-dollar; zero renders as \&quot;0.00\&quot;. |
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
