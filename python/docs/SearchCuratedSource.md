# SearchCuratedSource


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**catalog** | **str** |  |
**snapshot_version** | **int** |  |
**captured_at** | **datetime** |  |

## Example

```python
from weft_sdk.generated.models.search_curated_source import SearchCuratedSource

# TODO update the JSON string below
json = "{}"
# create an instance of SearchCuratedSource from a JSON string
search_curated_source_instance = SearchCuratedSource.from_json(json)
# print the JSON string representation of the object
print(SearchCuratedSource.to_json())

# convert the object into a dict
search_curated_source_dict = search_curated_source_instance.to_dict()
# create an instance of SearchCuratedSource from a dict
search_curated_source_from_dict = SearchCuratedSource.from_dict(search_curated_source_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
