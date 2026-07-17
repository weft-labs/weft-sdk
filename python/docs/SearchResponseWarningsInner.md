# SearchResponseWarningsInner


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **str** |  | 
**message** | **str** |  | 
**cause** | **str** | Typed cause for codes that carry one (e.g. &#x60;DECOMPOSE_FALLBACK&#x60;). Null otherwise. | [optional] 
**context** | **object** | Structured context for the warning. Null when the code carries none. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_response_warnings_inner import SearchResponseWarningsInner

# TODO update the JSON string below
json = "{}"
# create an instance of SearchResponseWarningsInner from a JSON string
search_response_warnings_inner_instance = SearchResponseWarningsInner.from_json(json)
# print the JSON string representation of the object
print(SearchResponseWarningsInner.to_json())

# convert the object into a dict
search_response_warnings_inner_dict = search_response_warnings_inner_instance.to_dict()
# create an instance of SearchResponseWarningsInner from a dict
search_response_warnings_inner_from_dict = SearchResponseWarningsInner.from_dict(search_response_warnings_inner_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


