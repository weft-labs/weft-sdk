# PurchaseResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**Purchase**](Purchase.md) |  |

## Example

```python
from weft_sdk.generated.models.purchase_response import PurchaseResponse

# TODO update the JSON string below
json = "{}"
# create an instance of PurchaseResponse from a JSON string
purchase_response_instance = PurchaseResponse.from_json(json)
# print the JSON string representation of the object
print(PurchaseResponse.to_json())

# convert the object into a dict
purchase_response_dict = purchase_response_instance.to_dict()
# create an instance of PurchaseResponse from a dict
purchase_response_from_dict = PurchaseResponse.from_dict(purchase_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
