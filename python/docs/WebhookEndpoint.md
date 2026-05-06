# WebhookEndpoint


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **int** |  | 
**url** | **str** |  | 
**events** | **List[str]** |  | 
**active** | **bool** |  | 
**description** | **str** |  | [optional] 
**created_at** | **datetime** |  | 
**updated_at** | **datetime** |  | 

## Example

```python
from weft_sdk.generated.models.webhook_endpoint import WebhookEndpoint

# TODO update the JSON string below
json = "{}"
# create an instance of WebhookEndpoint from a JSON string
webhook_endpoint_instance = WebhookEndpoint.from_json(json)
# print the JSON string representation of the object
print(WebhookEndpoint.to_json())

# convert the object into a dict
webhook_endpoint_dict = webhook_endpoint_instance.to_dict()
# create an instance of WebhookEndpoint from a dict
webhook_endpoint_from_dict = WebhookEndpoint.from_dict(webhook_endpoint_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


