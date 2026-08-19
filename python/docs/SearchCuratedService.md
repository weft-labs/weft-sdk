# SearchCuratedService


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  |
**name** | **str** |  |

## Example

```python
from weft_sdk.generated.models.search_curated_service import SearchCuratedService

# TODO update the JSON string below
json = "{}"
# create an instance of SearchCuratedService from a JSON string
search_curated_service_instance = SearchCuratedService.from_json(json)
# print the JSON string representation of the object
print(SearchCuratedService.to_json())

# convert the object into a dict
search_curated_service_dict = search_curated_service_instance.to_dict()
# create an instance of SearchCuratedService from a dict
search_curated_service_from_dict = SearchCuratedService.from_dict(search_curated_service_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
