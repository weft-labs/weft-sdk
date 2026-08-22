# SearchWeftFetchCompatibility


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**state** | **str** |  |
**reason** | **str** |  |
**contract_version** | **int** |  |

## Example

```python
from weft_sdk.generated.models.search_weft_fetch_compatibility import SearchWeftFetchCompatibility

# TODO update the JSON string below
json = "{}"
# create an instance of SearchWeftFetchCompatibility from a JSON string
search_weft_fetch_compatibility_instance = SearchWeftFetchCompatibility.from_json(json)
# print the JSON string representation of the object
print(SearchWeftFetchCompatibility.to_json())

# convert the object into a dict
search_weft_fetch_compatibility_dict = search_weft_fetch_compatibility_instance.to_dict()
# create an instance of SearchWeftFetchCompatibility from a dict
search_weft_fetch_compatibility_from_dict = SearchWeftFetchCompatibility.from_dict(search_weft_fetch_compatibility_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
