# AccountBootstrapStatusResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**AccountBootstrapStatus**](AccountBootstrapStatus.md) |  |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_status_response import AccountBootstrapStatusResponse

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapStatusResponse from a JSON string
account_bootstrap_status_response_instance = AccountBootstrapStatusResponse.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapStatusResponse.to_json())

# convert the object into a dict
account_bootstrap_status_response_dict = account_bootstrap_status_response_instance.to_dict()
# create an instance of AccountBootstrapStatusResponse from a dict
account_bootstrap_status_response_from_dict = AccountBootstrapStatusResponse.from_dict(account_bootstrap_status_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
