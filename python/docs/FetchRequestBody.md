# FetchRequestBody

Request body forwarded to the upstream. Pass `null` for GET.

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------

## Example

```python
from weft_sdk.generated.models.fetch_request_body import FetchRequestBody

# TODO update the JSON string below
json = "{}"
# create an instance of FetchRequestBody from a JSON string
fetch_request_body_instance = FetchRequestBody.from_json(json)
# print the JSON string representation of the object
print(FetchRequestBody.to_json())

# convert the object into a dict
fetch_request_body_dict = fetch_request_body_instance.to_dict()
# create an instance of FetchRequestBody from a dict
fetch_request_body_from_dict = FetchRequestBody.from_dict(fetch_request_body_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


