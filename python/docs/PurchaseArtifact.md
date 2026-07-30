# PurchaseArtifact


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  |
**merchant_url** | **str** |  |
**bytes** | **int** |  |
**mime** | **str** |  |

## Example

```python
from weft_sdk.generated.models.purchase_artifact import PurchaseArtifact

# TODO update the JSON string below
json = "{}"
# create an instance of PurchaseArtifact from a JSON string
purchase_artifact_instance = PurchaseArtifact.from_json(json)
# print the JSON string representation of the object
print(PurchaseArtifact.to_json())

# convert the object into a dict
purchase_artifact_dict = purchase_artifact_instance.to_dict()
# create an instance of PurchaseArtifact from a dict
purchase_artifact_from_dict = PurchaseArtifact.from_dict(purchase_artifact_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
