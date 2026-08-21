# CuratedMarketplaceContract


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**schema_version** | **int** |  |
**snapshot** | **Dict[str, object]** |  |
**provider** | **Dict[str, object]** |  |
**service** | **Dict[str, object]** |  |
**operation** | **Dict[str, object]** |  |
**request** | **Dict[str, object]** |  |
**access_methods** | **List[Dict[str, object]]** |  |
**evidence** | **List[Dict[str, object]]** |  |

## Example

```python
from weft_sdk.generated.models.curated_marketplace_contract import CuratedMarketplaceContract

# TODO update the JSON string below
json = "{}"
# create an instance of CuratedMarketplaceContract from a JSON string
curated_marketplace_contract_instance = CuratedMarketplaceContract.from_json(json)
# print the JSON string representation of the object
print(CuratedMarketplaceContract.to_json())

# convert the object into a dict
curated_marketplace_contract_dict = curated_marketplace_contract_instance.to_dict()
# create an instance of CuratedMarketplaceContract from a dict
curated_marketplace_contract_from_dict = CuratedMarketplaceContract.from_dict(curated_marketplace_contract_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
