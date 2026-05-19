# Merchant


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** | EVM address that received the payment. | 
**settlement_count** | **int** | All-time settlement count for this merchant address. | 
**first_seen_at** | **datetime** | First time Weft observed a payment to this address. | 
**dispute_count** | **int** | All-time dispute count for this merchant address. | 

## Example

```python
from weft_sdk.generated.models.merchant import Merchant

# TODO update the JSON string below
json = "{}"
# create an instance of Merchant from a JSON string
merchant_instance = Merchant.from_json(json)
# print the JSON string representation of the object
print(Merchant.to_json())

# convert the object into a dict
merchant_dict = merchant_instance.to_dict()
# create an instance of Merchant from a dict
merchant_from_dict = Merchant.from_dict(merchant_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


