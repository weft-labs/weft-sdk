# EndpointRevenue


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**host** | **str** |  | 
**volume** | **str** |  | 
**volume_raw** | **float** |  | 
**count** | **int** |  | 

## Example

```python
from weft_sdk.generated.models.endpoint_revenue import EndpointRevenue

# TODO update the JSON string below
json = "{}"
# create an instance of EndpointRevenue from a JSON string
endpoint_revenue_instance = EndpointRevenue.from_json(json)
# print the JSON string representation of the object
print(EndpointRevenue.to_json())

# convert the object into a dict
endpoint_revenue_dict = endpoint_revenue_instance.to_dict()
# create an instance of EndpointRevenue from a dict
endpoint_revenue_from_dict = EndpointRevenue.from_dict(endpoint_revenue_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


