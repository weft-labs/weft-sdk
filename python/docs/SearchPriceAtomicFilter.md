# SearchPriceAtomicFilter

The same price constraint in integer micro-USD (1 USDC = 1_000_000 micro-USD) — the settlement form. Set exactly one operator: a scalar (`lte` / `gte` / `eq`) OR a range (`range_gte` + `range_lte` together, lower ≤ upper). Mutually exclusive with `price`. An unpriced resource is excluded from any price-filtered query. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**lte** | **int** | Price ≤ this many micro-USD (inclusive ceiling). | [optional] 
**gte** | **int** | Price ≥ this many micro-USD (inclusive floor). | [optional] 
**eq** | **int** | Price exactly this many micro-USD. | [optional] 
**range_gte** | **int** | Range lower bound (inclusive), micro-USD. Set with range_lte. | [optional] 
**range_lte** | **int** | Range upper bound (inclusive), micro-USD. Set with range_gte. | [optional] 

## Example

```python
from weft_sdk.generated.models.search_price_atomic_filter import SearchPriceAtomicFilter

# TODO update the JSON string below
json = "{}"
# create an instance of SearchPriceAtomicFilter from a JSON string
search_price_atomic_filter_instance = SearchPriceAtomicFilter.from_json(json)
# print the JSON string representation of the object
print(SearchPriceAtomicFilter.to_json())

# convert the object into a dict
search_price_atomic_filter_dict = search_price_atomic_filter_instance.to_dict()
# create an instance of SearchPriceAtomicFilter from a dict
search_price_atomic_filter_from_dict = SearchPriceAtomicFilter.from_dict(search_price_atomic_filter_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


