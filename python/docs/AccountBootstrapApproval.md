# AccountBootstrapApproval


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**method** | **str** |  |
**expires_in** | **int** |  |
**interval** | **int** | Minimum status polling interval in seconds. |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_approval import AccountBootstrapApproval

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapApproval from a JSON string
account_bootstrap_approval_instance = AccountBootstrapApproval.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapApproval.to_json())

# convert the object into a dict
account_bootstrap_approval_dict = account_bootstrap_approval_instance.to_dict()
# create an instance of AccountBootstrapApproval from a dict
account_bootstrap_approval_from_dict = AccountBootstrapApproval.from_dict(account_bootstrap_approval_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
