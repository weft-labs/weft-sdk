# AccountBootstrapStatus


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  |
**status** | **str** |  |
**capabilities** | **List[str]** |  |
**expires_at** | **datetime** |  |
**approval** | [**AccountBootstrapApproval**](AccountBootstrapApproval.md) |  |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_status import AccountBootstrapStatus

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapStatus from a JSON string
account_bootstrap_status_instance = AccountBootstrapStatus.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapStatus.to_json())

# convert the object into a dict
account_bootstrap_status_dict = account_bootstrap_status_instance.to_dict()
# create an instance of AccountBootstrapStatus from a dict
account_bootstrap_status_from_dict = AccountBootstrapStatus.from_dict(account_bootstrap_status_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
