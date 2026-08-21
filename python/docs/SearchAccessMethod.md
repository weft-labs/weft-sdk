# SearchAccessMethod


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**access_method_id** | **str** |  |
**protocol** | **str** |  |
**scheme** | **str** |  | [optional]
**network** | **str** |  | [optional]
**asset** | **str** |  | [optional]
**asset_decimals** | **int** |  | [optional]
**price** | **object** |  |
**merchant** | **object** |  | [optional]
**terms** | **object** |  | [optional]
**status** | **str** |  | [optional]
**weft_fetch** | [**SearchWeftFetchCompatibility**](SearchWeftFetchCompatibility.md) |  |

## Example

```python
from weft_sdk.generated.models.search_access_method import SearchAccessMethod

# TODO update the JSON string below
json = "{}"
# create an instance of SearchAccessMethod from a JSON string
search_access_method_instance = SearchAccessMethod.from_json(json)
# print the JSON string representation of the object
print(SearchAccessMethod.to_json())

# convert the object into a dict
search_access_method_dict = search_access_method_instance.to_dict()
# create an instance of SearchAccessMethod from a dict
search_access_method_from_dict = SearchAccessMethod.from_dict(search_access_method_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
