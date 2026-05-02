# TopPayer


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**address** | **str** |  | 
**truncated** | **str** |  | 
**volume** | **str** |  | 
**volume_raw** | **float** |  | 
**count** | **int** |  | 

## Example

```python
from weft_sdk.generated.models.top_payer import TopPayer

# TODO update the JSON string below
json = "{}"
# create an instance of TopPayer from a JSON string
top_payer_instance = TopPayer.from_json(json)
# print the JSON string representation of the object
print(TopPayer.to_json())

# convert the object into a dict
top_payer_dict = top_payer_instance.to_dict()
# create an instance of TopPayer from a dict
top_payer_from_dict = TopPayer.from_dict(top_payer_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


