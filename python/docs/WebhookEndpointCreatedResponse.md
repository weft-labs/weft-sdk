# WebhookEndpointCreatedResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**data** | [**WebhookEndpointWithSecret**](WebhookEndpointWithSecret.md) |  | 

## Example

```python
from weft_sdk.generated.models.webhook_endpoint_created_response import WebhookEndpointCreatedResponse

# TODO update the JSON string below
json = "{}"
# create an instance of WebhookEndpointCreatedResponse from a JSON string
webhook_endpoint_created_response_instance = WebhookEndpointCreatedResponse.from_json(json)
# print the JSON string representation of the object
print(WebhookEndpointCreatedResponse.to_json())

# convert the object into a dict
webhook_endpoint_created_response_dict = webhook_endpoint_created_response_instance.to_dict()
# create an instance of WebhookEndpointCreatedResponse from a dict
webhook_endpoint_created_response_from_dict = WebhookEndpointCreatedResponse.from_dict(webhook_endpoint_created_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


