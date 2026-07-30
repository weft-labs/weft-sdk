# UserPrincipal

The buyer User represented by an account API key or OAuth token.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**principal_type** | **str** |  |
**id** | **int** |  |
**email** | **str** |  |
**display_name** | **str** |  | [optional]
**status** | **str** |  |
**buyer_enabled** | **bool** |  |
**seller_enabled** | **bool** |  |
**provisioning_status** | **str** |  |
**wallet** | [**PrincipalWallet**](PrincipalWallet.md) |  |

## Example

```python
from weft_sdk.generated.models.user_principal import UserPrincipal

# TODO update the JSON string below
json = "{}"
# create an instance of UserPrincipal from a JSON string
user_principal_instance = UserPrincipal.from_json(json)
# print the JSON string representation of the object
print(UserPrincipal.to_json())

# convert the object into a dict
user_principal_dict = user_principal_instance.to_dict()
# create an instance of UserPrincipal from a dict
user_principal_from_dict = UserPrincipal.from_dict(user_principal_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
