# Wallet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** | EVM address of the buyer&#39;s Privy-managed wallet. Null if no wallet provisioned. | 
**balance_usdc** | **str** | Live USDC balance, 2dp. Returns \&quot;0.00\&quot; if the upstream wallet provider is unreachable. | 
**network** | **str** | Wallet network (e.g. &#x60;base-sepolia&#x60;). | 

## Example

```python
from weft_sdk.generated.models.wallet import Wallet

# TODO update the JSON string below
json = "{}"
# create an instance of Wallet from a JSON string
wallet_instance = Wallet.from_json(json)
# print the JSON string representation of the object
print(Wallet.to_json())

# convert the object into a dict
wallet_dict = wallet_instance.to_dict()
# create an instance of Wallet from a dict
wallet_from_dict = Wallet.from_dict(wallet_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


