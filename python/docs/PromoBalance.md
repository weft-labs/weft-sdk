# PromoBalance

Freemium promo credit. v1 returns zero values; once the promo ledger ships (deferred from spec 10), real balances appear here without a shape change. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**balance_usd** | **str** |  | 
**scope** | **str** | Where the promo can be spent. | 
**expires_at** | **datetime** |  | 

## Example

```python
from weft_sdk.generated.models.promo_balance import PromoBalance

# TODO update the JSON string below
json = "{}"
# create an instance of PromoBalance from a JSON string
promo_balance_instance = PromoBalance.from_json(json)
# print the JSON string representation of the object
print(PromoBalance.to_json())

# convert the object into a dict
promo_balance_dict = promo_balance_instance.to_dict()
# create an instance of PromoBalance from a dict
promo_balance_from_dict = PromoBalance.from_dict(promo_balance_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


