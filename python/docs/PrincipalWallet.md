# PrincipalWallet


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** |  |
**network** | **str** |  |

## Example

```python
from weft_sdk.generated.models.principal_wallet import PrincipalWallet

# TODO update the JSON string below
json = "{}"
# create an instance of PrincipalWallet from a JSON string
principal_wallet_instance = PrincipalWallet.from_json(json)
# print the JSON string representation of the object
print(PrincipalWallet.to_json())

# convert the object into a dict
principal_wallet_dict = principal_wallet_instance.to_dict()
# create an instance of PrincipalWallet from a dict
principal_wallet_from_dict = PrincipalWallet.from_dict(principal_wallet_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
