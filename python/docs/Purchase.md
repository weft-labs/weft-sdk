# Purchase


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  |
**status** | **str** |  |
**amount_usd** | **str** | Exact decimal USD amount with up to six fractional digits. |
**recipient_address** | **str** |  |
**network** | **str** |  |
**protocol** | **str** |  |
**context** | **str** |  |
**tx_hash** | **str** |  |
**reject_reason** | **str** |  |
**failure_reason** | **str** |  |
**idempotency_key** | **str** |  |
**signed_at** | **datetime** |  |
**settled_at** | **datetime** |  |
**artifact** | [**PurchaseArtifact**](PurchaseArtifact.md) |  |

## Example

```python
from weft_sdk.generated.models.purchase import Purchase

# TODO update the JSON string below
json = "{}"
# create an instance of Purchase from a JSON string
purchase_instance = Purchase.from_json(json)
# print the JSON string representation of the object
print(Purchase.to_json())

# convert the object into a dict
purchase_dict = purchase_instance.to_dict()
# create an instance of Purchase from a dict
purchase_from_dict = Purchase.from_dict(purchase_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
