# SearchFilterSpec

Structured hard constraints on the query — the weft-search-platform `FilterSpec` v1 typed subset, vendored verbatim (D1 contract). Every field is optional; an empty object is the no-filter query. Set fields are ANDed. Each sub-filter takes exactly one operator; unknown filter keys and unknown operators are rejected (`422 INVALID_FILTERS`).  `price` (USD decimal strings) and `price_atomic` (integer micro-USD) are two representations of ONE price constraint — the reasoning form and the settlement form. They are MUTUALLY EXCLUSIVE: setting both is `422 INVALID_FILTERS`. A JSON number in `price` is rejected (only decimal strings), so `{lte: 5}` can never be mis-read as 5 micro-dollars.  The canonical enum value sets are pinned to the platform spec by the CI drift gate (`docs/contracts/search-platform.openapi.yaml`). 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**price** | [**SearchPriceUsdFilter**](SearchPriceUsdFilter.md) |  | [optional] 
**price_atomic** | [**SearchPriceAtomicFilter**](SearchPriceAtomicFilter.md) |  | [optional] 
**type** | [**SearchResourceTypeFilter**](SearchResourceTypeFilter.md) |  | [optional] 
**protocol** | [**SearchProtocolFilter**](SearchProtocolFilter.md) |  | [optional] 

## Example

```python
from weft_sdk.generated.models.search_filter_spec import SearchFilterSpec

# TODO update the JSON string below
json = "{}"
# create an instance of SearchFilterSpec from a JSON string
search_filter_spec_instance = SearchFilterSpec.from_json(json)
# print the JSON string representation of the object
print(SearchFilterSpec.to_json())

# convert the object into a dict
search_filter_spec_dict = search_filter_spec_instance.to_dict()
# create an instance of SearchFilterSpec from a dict
search_filter_spec_from_dict = SearchFilterSpec.from_dict(search_filter_spec_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


