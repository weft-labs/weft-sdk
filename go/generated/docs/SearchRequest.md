# SearchRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Query** | **string** | Free-text query. Required and non-empty. | 
**Limit** | Pointer to **int32** | Max number of hits to return. Clamped to [1, 50]. | [optional] [default to 10]
**Filters** | Pointer to [**SearchFilters**](SearchFilters.md) |  | [optional] 

## Methods

### NewSearchRequest

`func NewSearchRequest(query string, ) *SearchRequest`

NewSearchRequest instantiates a new SearchRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchRequestWithDefaults

`func NewSearchRequestWithDefaults() *SearchRequest`

NewSearchRequestWithDefaults instantiates a new SearchRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetQuery

`func (o *SearchRequest) GetQuery() string`

GetQuery returns the Query field if non-nil, zero value otherwise.

### GetQueryOk

`func (o *SearchRequest) GetQueryOk() (*string, bool)`

GetQueryOk returns a tuple with the Query field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQuery

`func (o *SearchRequest) SetQuery(v string)`

SetQuery sets Query field to given value.


### GetLimit

`func (o *SearchRequest) GetLimit() int32`

GetLimit returns the Limit field if non-nil, zero value otherwise.

### GetLimitOk

`func (o *SearchRequest) GetLimitOk() (*int32, bool)`

GetLimitOk returns a tuple with the Limit field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLimit

`func (o *SearchRequest) SetLimit(v int32)`

SetLimit sets Limit field to given value.

### HasLimit

`func (o *SearchRequest) HasLimit() bool`

HasLimit returns a boolean if a field has been set.

### GetFilters

`func (o *SearchRequest) GetFilters() SearchFilters`

GetFilters returns the Filters field if non-nil, zero value otherwise.

### GetFiltersOk

`func (o *SearchRequest) GetFiltersOk() (*SearchFilters, bool)`

GetFiltersOk returns a tuple with the Filters field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFilters

`func (o *SearchRequest) SetFilters(v SearchFilters)`

SetFilters sets Filters field to given value.

### HasFilters

`func (o *SearchRequest) HasFilters() bool`

HasFilters returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


