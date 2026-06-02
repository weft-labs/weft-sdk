# AccountDetails

The Organization that owns the authenticated API key — the principal in API v1 (the key represents an Org, not a person). `api_key` carries audit info about the key itself, including the user who minted it (`created_by`, which may be `null` if that user has left the Org). 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**name** | **str** |  | 
**slug** | **str** |  | 
**kind** | **str** |  | 
**api_key** | [**MeApiKey**](MeApiKey.md) |  | 

## Example

```python
from weft_sdk.generated.models.account_details import AccountDetails

# TODO update the JSON string below
json = "{}"
# create an instance of AccountDetails from a JSON string
account_details_instance = AccountDetails.from_json(json)
# print the JSON string representation of the object
print(AccountDetails.to_json())

# convert the object into a dict
account_details_dict = account_details_instance.to_dict()
# create an instance of AccountDetails from a dict
account_details_from_dict = AccountDetails.from_dict(account_details_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


