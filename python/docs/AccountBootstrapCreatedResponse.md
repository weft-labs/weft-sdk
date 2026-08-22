# AccountBootstrapCreatedResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**AccountBootstrapCreated**](AccountBootstrapCreated.md) |  |

## Example

```python
from weft_sdk.generated.models.account_bootstrap_created_response import AccountBootstrapCreatedResponse

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapCreatedResponse from a JSON string
account_bootstrap_created_response_instance = AccountBootstrapCreatedResponse.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapCreatedResponse.to_json())

# convert the object into a dict
account_bootstrap_created_response_dict = account_bootstrap_created_response_instance.to_dict()
# create an instance of AccountBootstrapCreatedResponse from a dict
account_bootstrap_created_response_from_dict = AccountBootstrapCreatedResponse.from_dict(account_bootstrap_created_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
