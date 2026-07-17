# SearchRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Query** | **string** | Free-text query. Required and non-empty. | 
**MaxResults** | Pointer to **int32** | Max number of hits to return. Invalid values are rejected, not clamped. | [optional] [default to 10]
**Filters** | Pointer to [**SearchFilterSpec**](SearchFilterSpec.md) |  | [optional] 

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


### GetMaxResults

`func (o *SearchRequest) GetMaxResults() int32`

GetMaxResults returns the MaxResults field if non-nil, zero value otherwise.

### GetMaxResultsOk

`func (o *SearchRequest) GetMaxResultsOk() (*int32, bool)`

GetMaxResultsOk returns a tuple with the MaxResults field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxResults

`func (o *SearchRequest) SetMaxResults(v int32)`

SetMaxResults sets MaxResults field to given value.

### HasMaxResults

`func (o *SearchRequest) HasMaxResults() bool`

HasMaxResults returns a boolean if a field has been set.

### GetFilters

`func (o *SearchRequest) GetFilters() SearchFilterSpec`

GetFilters returns the Filters field if non-nil, zero value otherwise.

### GetFiltersOk

`func (o *SearchRequest) GetFiltersOk() (*SearchFilterSpec, bool)`

GetFiltersOk returns a tuple with the Filters field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFilters

`func (o *SearchRequest) SetFilters(v SearchFilterSpec)`

SetFilters sets Filters field to given value.

### HasFilters

`func (o *SearchRequest) HasFilters() bool`

HasFilters returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


