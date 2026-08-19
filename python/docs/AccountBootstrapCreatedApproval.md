# AccountBootstrapCreatedApproval


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**method** | **str** |  |
**expires_in** | **int** |  |
**interval** | **int** | Minimum OAuth device-token polling interval in seconds. |
**user_code** | **str** | Show this code to the human; approval requires a matching normalized code. |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_created_approval import AccountBootstrapCreatedApproval

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapCreatedApproval from a JSON string
account_bootstrap_created_approval_instance = AccountBootstrapCreatedApproval.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapCreatedApproval.to_json())

# convert the object into a dict
account_bootstrap_created_approval_dict = account_bootstrap_created_approval_instance.to_dict()
# create an instance of AccountBootstrapCreatedApproval from a dict
account_bootstrap_created_approval_from_dict = AccountBootstrapCreatedApproval.from_dict(account_bootstrap_created_approval_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
