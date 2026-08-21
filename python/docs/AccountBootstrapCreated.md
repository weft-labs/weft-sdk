# AccountBootstrapCreated


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  |
**status** | **str** |  |
**capabilities** | **List[str]** |  |
**expires_at** | **datetime** |  |
**approval** | [**AccountBootstrapCreatedApproval**](AccountBootstrapCreatedApproval.md) |  |
**temporary_api_key** | **str** | Returned once. Store as a secret; it cannot be recovered. |
**device_code** | **str** | Returned once. Poll the OAuth token endpoint with this secret. |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_created import AccountBootstrapCreated

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapCreated from a JSON string
account_bootstrap_created_instance = AccountBootstrapCreated.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapCreated.to_json())

# convert the object into a dict
account_bootstrap_created_dict = account_bootstrap_created_instance.to_dict()
# create an instance of AccountBootstrapCreated from a dict
account_bootstrap_created_from_dict = AccountBootstrapCreated.from_dict(account_bootstrap_created_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
