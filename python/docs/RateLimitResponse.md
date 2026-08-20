# RateLimitResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**error** | **str** |  |
**error_description** | **str** |  |

## Example

```python
from weft_sdk.generated.models.rate_limit_response import RateLimitResponse

# TODO update the JSON string below
json = "{}"
# create an instance of RateLimitResponse from a JSON string
rate_limit_response_instance = RateLimitResponse.from_json(json)
# print the JSON string representation of the object
print(RateLimitResponse.to_json())

# convert the object into a dict
rate_limit_response_dict = rate_limit_response_instance.to_dict()
# create an instance of RateLimitResponse from a dict
rate_limit_response_from_dict = RateLimitResponse.from_dict(rate_limit_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
