# Wallet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**provider** | **str** | Crossmint is the only buyer-wallet provider. |
**address** | **str** | Base smart-wallet address. Null only when Crossmint is unavailable. |
**tempo_address** | **str** | Paired Tempo smart-wallet address. Null only when Crossmint is unavailable. |
**balance_usdc** | **str** | Live Base USDC balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |
**tempo_usd** | **str** | Aggregated USD value of the allowlisted Tempo TIP-20 dollar tokens on the wallet&#39;s paired Tempo chain, exact to the micro-dollar. &#x60;null&#x60; when the value is UNKNOWN — the Tempo RPC read failed, or no dollar token is allowlisted for that chain yet (e.g. Tempo mainnet pre-launch). A null here is never \&quot;0.00\&quot;; it means \&quot;we couldn&#39;t determine it\&quot;, and &#x60;total_usd&#x60; then reflects the Base component only.  |
**total_usd** | **str** | Single aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, exact to the micro-dollar. When &#x60;tempo_usd&#x60; is null (unavailable/unallowlisted) this equals &#x60;balance_usdc&#x60; alone. Null when the Base USDC provider is unreachable, because the surface never claims zero for a component it could not read.  |
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
