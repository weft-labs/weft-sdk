# SearchPriceUsdFilter

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Lte** | Pointer to **string** | Price ≤ this many USD (inclusive ceiling), e.g. \&quot;0.009\&quot;. | [optional] 
**Gte** | Pointer to **string** | Price ≥ this many USD (inclusive floor), e.g. \&quot;0.001\&quot;. | [optional] 
**Eq** | Pointer to **string** | Price exactly this many USD, e.g. \&quot;1.5\&quot;. | [optional] 
**RangeGte** | Pointer to **string** | Range lower bound (inclusive), USD. Set with range_lte. | [optional] 
**RangeLte** | Pointer to **string** | Range upper bound (inclusive), USD. Set with range_gte. | [optional] 

## Methods

### NewSearchPriceUsdFilter

`func NewSearchPriceUsdFilter() *SearchPriceUsdFilter`

NewSearchPriceUsdFilter instantiates a new SearchPriceUsdFilter object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchPriceUsdFilterWithDefaults

`func NewSearchPriceUsdFilterWithDefaults() *SearchPriceUsdFilter`

NewSearchPriceUsdFilterWithDefaults instantiates a new SearchPriceUsdFilter object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetLte

`func (o *SearchPriceUsdFilter) GetLte() string`

GetLte returns the Lte field if non-nil, zero value otherwise.

### GetLteOk

`func (o *SearchPriceUsdFilter) GetLteOk() (*string, bool)`

GetLteOk returns a tuple with the Lte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLte

`func (o *SearchPriceUsdFilter) SetLte(v string)`

SetLte sets Lte field to given value.

### HasLte

`func (o *SearchPriceUsdFilter) HasLte() bool`

HasLte returns a boolean if a field has been set.

### GetGte

`func (o *SearchPriceUsdFilter) GetGte() string`

GetGte returns the Gte field if non-nil, zero value otherwise.

### GetGteOk

`func (o *SearchPriceUsdFilter) GetGteOk() (*string, bool)`

GetGteOk returns a tuple with the Gte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGte

`func (o *SearchPriceUsdFilter) SetGte(v string)`

SetGte sets Gte field to given value.

### HasGte

`func (o *SearchPriceUsdFilter) HasGte() bool`

HasGte returns a boolean if a field has been set.

### GetEq

`func (o *SearchPriceUsdFilter) GetEq() string`

GetEq returns the Eq field if non-nil, zero value otherwise.

### GetEqOk

`func (o *SearchPriceUsdFilter) GetEqOk() (*string, bool)`

GetEqOk returns a tuple with the Eq field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEq

`func (o *SearchPriceUsdFilter) SetEq(v string)`

SetEq sets Eq field to given value.

### HasEq

`func (o *SearchPriceUsdFilter) HasEq() bool`

HasEq returns a boolean if a field has been set.

### GetRangeGte

`func (o *SearchPriceUsdFilter) GetRangeGte() string`

GetRangeGte returns the RangeGte field if non-nil, zero value otherwise.

### GetRangeGteOk

`func (o *SearchPriceUsdFilter) GetRangeGteOk() (*string, bool)`

GetRangeGteOk returns a tuple with the RangeGte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRangeGte

`func (o *SearchPriceUsdFilter) SetRangeGte(v string)`

SetRangeGte sets RangeGte field to given value.

### HasRangeGte

`func (o *SearchPriceUsdFilter) HasRangeGte() bool`

HasRangeGte returns a boolean if a field has been set.

### GetRangeLte

`func (o *SearchPriceUsdFilter) GetRangeLte() string`

GetRangeLte returns the RangeLte field if non-nil, zero value otherwise.

### GetRangeLteOk

`func (o *SearchPriceUsdFilter) GetRangeLteOk() (*string, bool)`

GetRangeLteOk returns a tuple with the RangeLte field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRangeLte

`func (o *SearchPriceUsdFilter) SetRangeLte(v string)`

SetRangeLte sets RangeLte field to given value.

### HasRangeLte

`func (o *SearchPriceUsdFilter) HasRangeLte() bool`

HasRangeLte returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


