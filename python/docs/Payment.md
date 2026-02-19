# Payment


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**tx_hash** | **str** |  | 
**payer_address** | **str** |  | 
**recipient_address** | **str** |  | 
**amount** | **int** | Amount in atomic units (1 USDC &#x3D; 1,000,000) | 
**amount_formatted** | **str** | Human-readable amount (e.g. \&quot;1.00 USDC\&quot;) | 
**currency** | **str** |  | 
**network** | **str** | CAIP-2 chain identifier | 
**resource_url** | **str** |  | [optional] 
**resource_host** | **str** |  | [optional] 
**fee_amount** | **int** |  | [optional] 
**settlement_latency_ms** | **int** |  | [optional] 
**settled_at** | **datetime** |  | 
**api_key_name** | **str** |  | 

## Example

```python
from weft_sdk.generated.models.payment import Payment

# TODO update the JSON string below
json = "{}"
# create an instance of Payment from a JSON string
payment_instance = Payment.from_json(json)
# print the JSON string representation of the object
print(Payment.to_json())

# convert the object into a dict
payment_dict = payment_instance.to_dict()
# create an instance of Payment from a dict
payment_from_dict = Payment.from_dict(payment_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


