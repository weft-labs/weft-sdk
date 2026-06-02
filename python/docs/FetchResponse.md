# FetchResponse

Successful fetch envelope. `body_base64` is the upstream artifact bytes, base64-encoded. `paid_usd`, `tx_hash`, and `merchant` are populated only when the upstream charged for the response. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | **int** | HTTP status returned by the upstream after the paid replay. | 
**headers** | **Dict[str, str]** | Response headers from the upstream. | 
**body_base64** | **str** | Base64-encoded response body. Empty string for empty bodies. | 
**paid_usd** | **str** | USD amount actually settled. Null for free upstreams. | 
**tx_hash** | **str** | Settlement transaction hash. Null for free upstreams. | 
**artifact_id** | **int** | Internal artifact identifier if the response was persisted; &#x60;null&#x60; otherwise. | 
**merchant** | [**Merchant**](Merchant.md) | Merchant reputation snapshot. Null for free upstreams. | 

## Example

```python
from weft_sdk.generated.models.fetch_response import FetchResponse

# TODO update the JSON string below
json = "{}"
# create an instance of FetchResponse from a JSON string
fetch_response_instance = FetchResponse.from_json(json)
# print the JSON string representation of the object
print(FetchResponse.to_json())

# convert the object into a dict
fetch_response_dict = fetch_response_instance.to_dict()
# create an instance of FetchResponse from a dict
fetch_response_from_dict = FetchResponse.from_dict(fetch_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


