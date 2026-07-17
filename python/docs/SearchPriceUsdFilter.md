# SearchPriceUsdFilter

Price constraint in USD, as decimal STRINGS (the reasoning form). Set exactly one operator: a scalar (`lte` / `gte` / `eq`) OR a range (`range_gte` + `range_lte` together, lower ≤ upper). Each value is a string matching `^\\d+(\\.\\d{1,6})?$` (≤ 6 decimals, ≥ 0); a JSON number is rejected. Mutually exclusive with `price_atomic`. An unpriced resource is excluded from any price-filtered query. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lte** | **str** | Price ≤ this many USD (inclusive ceiling), e.g. \&quot;0.009\&quot;. | [optional] 
**gte** | **str** | Price ≥ this many USD (inclusive floor), e.g. \&quot;0.001\&quot;. | [optional] 
**eq** | **str** | Price exactly this many USD, e.g. \&quot;1.5\&quot;. | [optional] 
**range_gte** | **str** | Range lower bound (inclusive), USD. Set with range_lte. | [optional] 
**range_lte** | **str** | Range upper bound (inclusive), USD. Set with range_gte. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_price_usd_filter import SearchPriceUsdFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchPriceUsdFilter from a JSON string
search_price_usd_filter_instance = SearchPriceUsdFilter.from_json(json)
# print the JSON string representation of the object
print(SearchPriceUsdFilter.to_json())

# convert the object into a dict
search_price_usd_filter_dict = search_price_usd_filter_instance.to_dict()
# create an instance of SearchPriceUsdFilter from a dict
search_price_usd_filter_from_dict = SearchPriceUsdFilter.from_dict(search_price_usd_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


