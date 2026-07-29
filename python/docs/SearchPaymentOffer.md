# SearchPaymentOffer

One settlement route the endpoint's own 402 challenge published — a (rail × network × asset × payee) tuple a caller can settle against directly with its own SDK. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**protocol** | **str** | The payment rail (e.g. &#x60;x402&#x60;, &#x60;mpp&#x60;). | 
**scheme** | **str** |  | [optional] 
**network** | **str** |  | [optional] 
**asset** | **str** |  | [optional] 
**amount** | **str** |  | [optional] 
**pay_to** | **str** |  | [optional] 
**max_timeout_seconds** | **int** |  | [optional] 
**facilitator** | **str** |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_payment_offer import SearchPaymentOffer

# TODO update the JSON string below
json = "{}"
# create an instance of SearchPaymentOffer from a JSON string
search_payment_offer_instance = SearchPaymentOffer.from_json(json)
# print the JSON string representation of the object
print(SearchPaymentOffer.to_json())

# convert the object into a dict
search_payment_offer_dict = search_payment_offer_instance.to_dict()
# create an instance of SearchPaymentOffer from a dict
search_payment_offer_from_dict = SearchPaymentOffer.from_dict(search_payment_offer_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


