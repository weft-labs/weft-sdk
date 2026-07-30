# MeResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**principal_type** | **str** |  |
**id** | **int** |  |
**name** | **str** |  |
**slug** | **str** |  |
**kind** | **str** |  |
**api_key** | [**MeApiKey**](MeApiKey.md) |  |
**email** | **str** |  |
**display_name** | **str** |  | [optional]
**status** | **str** |  |
**buyer_enabled** | **bool** |  |
**seller_enabled** | **bool** |  |
**provisioning_status** | **str** |  |
**wallet** | [**PrincipalWallet**](PrincipalWallet.md) |  |

## Example

```python
from weft_sdk.generated.models.me_response_data import MeResponseData

# TODO update the JSON string below
json = "{}"
# create an instance of MeResponseData from a JSON string
me_response_data_instance = MeResponseData.from_json(json)
# print the JSON string representation of the object
print(MeResponseData.to_json())

# convert the object into a dict
me_response_data_dict = me_response_data_instance.to_dict()
# create an instance of MeResponseData from a dict
me_response_data_from_dict = MeResponseData.from_dict(me_response_data_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
