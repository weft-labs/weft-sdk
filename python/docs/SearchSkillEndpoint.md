# SearchSkillEndpoint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**method** | **str** | HTTP method or &#x60;WEBSOCKET&#x60; for streaming skills. | [optional] 
**path** | **str** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_skill_endpoint import SearchSkillEndpoint

# TODO update the JSON string below
json = "{}"
# create an instance of SearchSkillEndpoint from a JSON string
search_skill_endpoint_instance = SearchSkillEndpoint.from_json(json)
# print the JSON string representation of the object
print(SearchSkillEndpoint.to_json())

# convert the object into a dict
search_skill_endpoint_dict = search_skill_endpoint_instance.to_dict()
# create an instance of SearchSkillEndpoint from a dict
search_skill_endpoint_from_dict = SearchSkillEndpoint.from_dict(search_skill_endpoint_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


