# WebhookEndpointWithSecret


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
**secret** | **str** | Signing secret (whsec_*). Only returned once on creation. | 

## Example

```python
from weft_sdk.generated.models.webhook_endpoint_with_secret import WebhookEndpointWithSecret

# TODO update the JSON string below
json = "{}"
# create an instance of WebhookEndpointWithSecret from a JSON string
webhook_endpoint_with_secret_instance = WebhookEndpointWithSecret.from_json(json)
# print the JSON string representation of the object
print(WebhookEndpointWithSecret.to_json())

# convert the object into a dict
webhook_endpoint_with_secret_dict = webhook_endpoint_with_secret_instance.to_dict()
# create an instance of WebhookEndpointWithSecret from a dict
webhook_endpoint_with_secret_from_dict = WebhookEndpointWithSecret.from_dict(webhook_endpoint_with_secret_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


