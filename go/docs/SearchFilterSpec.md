# SearchFilterSpec

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Price** | Pointer to [**SearchPriceUsdFilter**](SearchPriceUsdFilter.md) |  | [optional]
**PriceAtomic** | Pointer to [**SearchPriceAtomicFilter**](SearchPriceAtomicFilter.md) |  | [optional]
**Type** | Pointer to [**SearchResourceTypeFilter**](SearchResourceTypeFilter.md) |  | [optional]
**Protocol** | Pointer to [**SearchProtocolFilter**](SearchProtocolFilter.md) |  | [optional]
**Category** | Pointer to [**SearchStringSetFilter**](SearchStringSetFilter.md) |  | [optional]
**Method** | Pointer to [**SearchMethodFilter**](SearchMethodFilter.md) |  | [optional]
**ExecutionMode** | Pointer to [**SearchExecutionModeFilter**](SearchExecutionModeFilter.md) |  | [optional]
**WeftFetchCompatible** | Pointer to **bool** | True requires at least one access method whose paid request is supported by the current Weft fetch runtime. For async operations this can mean submission-only coverage followed by the provider workflow. | [optional]
**IncludeUnknownPrices** | Pointer to **bool** | With a price constraint, also retain dynamic and unknown prices. | [optional] [default to false]

## Methods

### NewSearchFilterSpec

`func NewSearchFilterSpec() *SearchFilterSpec`

NewSearchFilterSpec instantiates a new SearchFilterSpec object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchFilterSpecWithDefaults

`func NewSearchFilterSpecWithDefaults() *SearchFilterSpec`

NewSearchFilterSpecWithDefaults instantiates a new SearchFilterSpec object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPrice

`func (o *SearchFilterSpec) GetPrice() SearchPriceUsdFilter`

GetPrice returns the Price field if non-nil, zero value otherwise.

### GetPriceOk

`func (o *SearchFilterSpec) GetPriceOk() (*SearchPriceUsdFilter, bool)`

GetPriceOk returns a tuple with the Price field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrice

`func (o *SearchFilterSpec) SetPrice(v SearchPriceUsdFilter)`

SetPrice sets Price field to given value.

### HasPrice

`func (o *SearchFilterSpec) HasPrice() bool`

HasPrice returns a boolean if a field has been set.

### GetPriceAtomic

`func (o *SearchFilterSpec) GetPriceAtomic() SearchPriceAtomicFilter`

GetPriceAtomic returns the PriceAtomic field if non-nil, zero value otherwise.

### GetPriceAtomicOk

`func (o *SearchFilterSpec) GetPriceAtomicOk() (*SearchPriceAtomicFilter, bool)`

GetPriceAtomicOk returns a tuple with the PriceAtomic field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceAtomic

`func (o *SearchFilterSpec) SetPriceAtomic(v SearchPriceAtomicFilter)`

SetPriceAtomic sets PriceAtomic field to given value.

### HasPriceAtomic

`func (o *SearchFilterSpec) HasPriceAtomic() bool`

HasPriceAtomic returns a boolean if a field has been set.

### GetType

`func (o *SearchFilterSpec) GetType() SearchResourceTypeFilter`

GetType returns the Type field if non-nil, zero value otherwise.

### GetTypeOk

`func (o *SearchFilterSpec) GetTypeOk() (*SearchResourceTypeFilter, bool)`

GetTypeOk returns a tuple with the Type field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetType

`func (o *SearchFilterSpec) SetType(v SearchResourceTypeFilter)`

SetType sets Type field to given value.

### HasType

`func (o *SearchFilterSpec) HasType() bool`

HasType returns a boolean if a field has been set.

### GetProtocol

`func (o *SearchFilterSpec) GetProtocol() SearchProtocolFilter`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *SearchFilterSpec) GetProtocolOk() (*SearchProtocolFilter, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *SearchFilterSpec) SetProtocol(v SearchProtocolFilter)`

SetProtocol sets Protocol field to given value.

### HasProtocol

`func (o *SearchFilterSpec) HasProtocol() bool`

HasProtocol returns a boolean if a field has been set.

### GetCategory

`func (o *SearchFilterSpec) GetCategory() SearchStringSetFilter`

GetCategory returns the Category field if non-nil, zero value otherwise.

### GetCategoryOk

`func (o *SearchFilterSpec) GetCategoryOk() (*SearchStringSetFilter, bool)`

GetCategoryOk returns a tuple with the Category field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategory

`func (o *SearchFilterSpec) SetCategory(v SearchStringSetFilter)`

SetCategory sets Category field to given value.

### HasCategory

`func (o *SearchFilterSpec) HasCategory() bool`

HasCategory returns a boolean if a field has been set.

### GetMethod

`func (o *SearchFilterSpec) GetMethod() SearchMethodFilter`

GetMethod returns the Method field if non-nil, zero value otherwise.

### GetMethodOk

`func (o *SearchFilterSpec) GetMethodOk() (*SearchMethodFilter, bool)`

GetMethodOk returns a tuple with the Method field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMethod

`func (o *SearchFilterSpec) SetMethod(v SearchMethodFilter)`

SetMethod sets Method field to given value.

### HasMethod

`func (o *SearchFilterSpec) HasMethod() bool`

HasMethod returns a boolean if a field has been set.

### GetExecutionMode

`func (o *SearchFilterSpec) GetExecutionMode() SearchExecutionModeFilter`

GetExecutionMode returns the ExecutionMode field if non-nil, zero value otherwise.

### GetExecutionModeOk

`func (o *SearchFilterSpec) GetExecutionModeOk() (*SearchExecutionModeFilter, bool)`

GetExecutionModeOk returns a tuple with the ExecutionMode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExecutionMode

`func (o *SearchFilterSpec) SetExecutionMode(v SearchExecutionModeFilter)`

SetExecutionMode sets ExecutionMode field to given value.

### HasExecutionMode

`func (o *SearchFilterSpec) HasExecutionMode() bool`

HasExecutionMode returns a boolean if a field has been set.

### GetWeftFetchCompatible

`func (o *SearchFilterSpec) GetWeftFetchCompatible() bool`

GetWeftFetchCompatible returns the WeftFetchCompatible field if non-nil, zero value otherwise.

### GetWeftFetchCompatibleOk

`func (o *SearchFilterSpec) GetWeftFetchCompatibleOk() (*bool, bool)`

GetWeftFetchCompatibleOk returns a tuple with the WeftFetchCompatible field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeftFetchCompatible

`func (o *SearchFilterSpec) SetWeftFetchCompatible(v bool)`

SetWeftFetchCompatible sets WeftFetchCompatible field to given value.

### HasWeftFetchCompatible

`func (o *SearchFilterSpec) HasWeftFetchCompatible() bool`

HasWeftFetchCompatible returns a boolean if a field has been set.

### GetIncludeUnknownPrices

`func (o *SearchFilterSpec) GetIncludeUnknownPrices() bool`

GetIncludeUnknownPrices returns the IncludeUnknownPrices field if non-nil, zero value otherwise.

### GetIncludeUnknownPricesOk

`func (o *SearchFilterSpec) GetIncludeUnknownPricesOk() (*bool, bool)`

GetIncludeUnknownPricesOk returns a tuple with the IncludeUnknownPrices field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIncludeUnknownPrices

`func (o *SearchFilterSpec) SetIncludeUnknownPrices(v bool)`

SetIncludeUnknownPrices sets IncludeUnknownPrices field to given value.

### HasIncludeUnknownPrices

`func (o *SearchFilterSpec) HasIncludeUnknownPrices() bool`

HasIncludeUnknownPrices returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
