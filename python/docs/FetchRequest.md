# FetchRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**url** | **str** | Target URL. Must pass Weft&#39;s URL safety check (no SSRF / private IP ranges). | 
**max_cost_usd** | **str** | Hard ceiling on what the buyer is willing to pay. Defaults to &#x60;0.10&#x60; USD. | [optional] [default to '0.10']
**method** | **str** | HTTP method to use against the upstream. | [optional] [default to 'GET']
**body** | [**FetchRequestBody**](FetchRequestBody.md) |  | [optional] 
**headers** | **Dict[str, str]** | Headers forwarded to the upstream. Up to 32 headers, 4 KB total. The following are silently stripped: &#x60;host&#x60;, &#x60;authorization&#x60;, &#x60;cookie&#x60;, &#x60;proxy-authorization&#x60;, &#x60;x-forwarded-*&#x60;, &#x60;x-real-ip&#x60;, &#x60;x-payment&#x60;, &#x60;connection&#x60;, &#x60;upgrade&#x60;.  | [optional] 

## Example

```python
from weft_sdk.generated.models.fetch_request import FetchRequest

# TODO update the JSON string below
json = "{}"
# create an instance of FetchRequest from a JSON string
fetch_request_instance = FetchRequest.from_json(json)
# print the JSON string representation of the object
print(FetchRequest.to_json())

# convert the object into a dict
fetch_request_dict = fetch_request_instance.to_dict()
# create an instance of FetchRequest from a dict
fetch_request_from_dict = FetchRequest.from_dict(fetch_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


