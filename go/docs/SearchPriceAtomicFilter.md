# SearchPriceAtomicFilter

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Lte** | Pointer to **int32** | Price ≤ this many micro-USD (inclusive ceiling). | [optional] 
**Gte** | Pointer to **int32** | Price ≥ this many micro-USD (inclusive floor). | [optional] 
**Eq** | Pointer to **int32** | Price exactly this many micro-USD. | [optional] 
**RangeGte** | Pointer to **int32** | Range lower bound (inclusive), micro-USD. Set with range_lte. | [optional] 
**RangeLte** | Pointer to **int32** | Range upper bound (inclusive), micro-USD. Set with range_gte. | [optional] 

## Methods

### NewSearchPriceAtomicFilter

`func NewSearchPriceAtomicFilter() *SearchPriceAtomicFilter`

NewSearchPriceAtomicFilter instantiates a new SearchPriceAtomicFilter object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchPriceAtomicFilterWithDefaults

`func NewSearchPriceAtomicFilterWithDefaults() *SearchPriceAtomicFilter`

NewSearchPriceAtomicFilterWithDefaults instantiates a new SearchPriceAtomicFilter object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetLte

`func (o *SearchPriceAtomicFilter) GetLte() int32`

GetLte returns the Lte field if non-nil, zero value otherwise.

### GetLteOk

`func (o *SearchPriceAtomicFilter) GetLteOk() (*int32, bool)`

GetLteOk returns a tuple with the Lte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLte

`func (o *SearchPriceAtomicFilter) SetLte(v int32)`

SetLte sets Lte field to given value.

### HasLte

`func (o *SearchPriceAtomicFilter) HasLte() bool`

HasLte returns a boolean if a field has been set.

### GetGte

`func (o *SearchPriceAtomicFilter) GetGte() int32`

GetGte returns the Gte field if non-nil, zero value otherwise.

### GetGteOk

`func (o *SearchPriceAtomicFilter) GetGteOk() (*int32, bool)`

GetGteOk returns a tuple with the Gte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGte

`func (o *SearchPriceAtomicFilter) SetGte(v int32)`

SetGte sets Gte field to given value.

### HasGte

`func (o *SearchPriceAtomicFilter) HasGte() bool`

HasGte returns a boolean if a field has been set.

### GetEq

`func (o *SearchPriceAtomicFilter) GetEq() int32`

GetEq returns the Eq field if non-nil, zero value otherwise.

### GetEqOk

`func (o *SearchPriceAtomicFilter) GetEqOk() (*int32, bool)`

GetEqOk returns a tuple with the Eq field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEq

`func (o *SearchPriceAtomicFilter) SetEq(v int32)`

SetEq sets Eq field to given value.

### HasEq

`func (o *SearchPriceAtomicFilter) HasEq() bool`

HasEq returns a boolean if a field has been set.

### GetRangeGte

`func (o *SearchPriceAtomicFilter) GetRangeGte() int32`

GetRangeGte returns the RangeGte field if non-nil, zero value otherwise.

### GetRangeGteOk

`func (o *SearchPriceAtomicFilter) GetRangeGteOk() (*int32, bool)`

GetRangeGteOk returns a tuple with the RangeGte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRangeGte

`func (o *SearchPriceAtomicFilter) SetRangeGte(v int32)`

SetRangeGte sets RangeGte field to given value.

### HasRangeGte

`func (o *SearchPriceAtomicFilter) HasRangeGte() bool`

HasRangeGte returns a boolean if a field has been set.

### GetRangeLte

`func (o *SearchPriceAtomicFilter) GetRangeLte() int32`

GetRangeLte returns the RangeLte field if non-nil, zero value otherwise.

### GetRangeLteOk

`func (o *SearchPriceAtomicFilter) GetRangeLteOk() (*int32, bool)`

GetRangeLteOk returns a tuple with the RangeLte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRangeLte

`func (o *SearchPriceAtomicFilter) SetRangeLte(v int32)`

SetRangeLte sets RangeLte field to given value.

### HasRangeLte

`func (o *SearchPriceAtomicFilter) HasRangeLte() bool`

HasRangeLte returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


