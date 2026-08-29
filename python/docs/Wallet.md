# Wallet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**provider** | **str** | Crossmint is the only buyer-wallet provider. |
**address** | **str** | Base smart-wallet address. Null only when Crossmint is unavailable. |
**balance_usdc** | **str** | Live Base USDC balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |
**balance_tempo_usd** | **str** | Live aggregate Tempo dollar-token balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |
**total_usd** | **str** | Single aggregated USD balance across Base USDC and Tempo dollar tokens, exact to the micro-dollar. Null when either pocket is unreachable, because the surface never claims zero for a component it could not read.  |
**network** | **str** | Selected Crossmint environment (&#x60;base_sepolia&#x60; or &#x60;base_mainnet&#x60;).  |

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
