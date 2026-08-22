# AccountBootstrapRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**email** | **str** |  |
**agent_name** | **str** |  |
**host_name** | **str** |  | [optional]
**reason** | **str** |  | [optional]
**oauth_client_id** | **str** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional]
**requested_scopes** | **List[str]** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional]

## Example

```python
from weft_sdk.generated.models.account_bootstrap_request import AccountBootstrapRequest

# TODO update the JSON string below
json = "{}"
# create an instance of AccountBootstrapRequest from a JSON string
account_bootstrap_request_instance = AccountBootstrapRequest.from_json(json)
# print the JSON string representation of the object
print(AccountBootstrapRequest.to_json())

# convert the object into a dict
account_bootstrap_request_dict = account_bootstrap_request_instance.to_dict()
# create an instance of AccountBootstrapRequest from a dict
account_bootstrap_request_from_dict = AccountBootstrapRequest.from_dict(account_bootstrap_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
