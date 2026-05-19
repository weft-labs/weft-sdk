# SearchSkill


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**description** | **str** |  | [optional] 
**tags** | **List[str]** |  | [optional] 
**examples** | **List[str]** |  | [optional] 
**input_modes** | **List[str]** |  | [optional] 
**output_modes** | **List[str]** |  | [optional] 
**streaming** | **bool** | True for skills that require streaming transport (e.g. websockets). Streaming skills are filtered out of results by default so non-streaming clients only see callable skills.  | [optional] 
**endpoint** | [**SearchSkillEndpoint**](SearchSkillEndpoint.md) |  | [optional] 
**price_usd** | **str** | Per-call price in USD for this individual skill. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_skill import SearchSkill

# TODO update the JSON string below
json = "{}"
# create an instance of SearchSkill from a JSON string
search_skill_instance = SearchSkill.from_json(json)
# print the JSON string representation of the object
print(SearchSkill.to_json())

# convert the object into a dict
search_skill_dict = search_skill_instance.to_dict()
# create an instance of SearchSkill from a dict
search_skill_from_dict = SearchSkill.from_dict(search_skill_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


