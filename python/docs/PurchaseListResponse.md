# PurchaseListResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**List[Purchase]**](Purchase.md) |  |
**pagination** | [**Pagination**](Pagination.md) |  |

## Example

```python
from weft_sdk.generated.models.purchase_list_response import PurchaseListResponse

# TODO update the JSON string below
json = "{}"
# create an instance of PurchaseListResponse from a JSON string
purchase_list_response_instance = PurchaseListResponse.from_json(json)
# print the JSON string representation of the object
print(PurchaseListResponse.to_json())

# convert the object into a dict
purchase_list_response_dict = purchase_list_response_instance.to_dict()
# create an instance of PurchaseListResponse from a dict
purchase_list_response_from_dict = PurchaseListResponse.from_dict(purchase_list_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
