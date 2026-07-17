# SearchResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**QueryTraceId** | **string** | Opaque trace id for the served query, matching the platform &#x60;query_trace_id&#x60;. | 
**Query** | **string** |  | 
**AppliedFilters** | Pointer to [**SearchFilterSpec**](SearchFilterSpec.md) | The &#x60;FilterSpec&#x60; actually applied to recall, echoed back so the caller sees exactly what constrained the results. In the current contract this is the caller&#39;s &#x60;filters&#x60; verbatim (empty object when none were sent).  | [optional] 
**DecompositionSource** | Pointer to **string** | Origin of &#x60;applied_filters&#x60;. &#x60;CALLER&#x60; today (the mock and the B1 platform have no query decomposer yet); &#x60;CLASSIFIER&#x60; / &#x60;MERGED&#x60; / &#x60;FALLBACK&#x60; arrive additively when the decomposer lands.  | [optional] 
**EmbedderModel** | **string** |  | 
**CandidatesConsidered** | **int32** |  | 
**Warnings** | [**[]SearchResponseWarningsInner**](SearchResponseWarningsInner.md) |  | 
**Results** | [**[]SearchResult**](SearchResult.md) |  | 
**Mock** | Pointer to **bool** | Present and &#x60;true&#x60; only when served by the mock backend. | [optional] 

## Methods

### NewSearchResponse

`func NewSearchResponse(queryTraceId string, query string, embedderModel string, candidatesConsidered int32, warnings []SearchResponseWarningsInner, results []SearchResult, ) *SearchResponse`

NewSearchResponse instantiates a new SearchResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchResponseWithDefaults

`func NewSearchResponseWithDefaults() *SearchResponse`

NewSearchResponseWithDefaults instantiates a new SearchResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetQueryTraceId

`func (o *SearchResponse) GetQueryTraceId() string`

GetQueryTraceId returns the QueryTraceId field if non-nil, zero value otherwise.

### GetQueryTraceIdOk

`func (o *SearchResponse) GetQueryTraceIdOk() (*string, bool)`

GetQueryTraceIdOk returns a tuple with the QueryTraceId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQueryTraceId

`func (o *SearchResponse) SetQueryTraceId(v string)`

SetQueryTraceId sets QueryTraceId field to given value.


### GetQuery

`func (o *SearchResponse) GetQuery() string`

GetQuery returns the Query field if non-nil, zero value otherwise.

### GetQueryOk

`func (o *SearchResponse) GetQueryOk() (*string, bool)`

GetQueryOk returns a tuple with the Query field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetQuery

`func (o *SearchResponse) SetQuery(v string)`

SetQuery sets Query field to given value.


### GetAppliedFilters

`func (o *SearchResponse) GetAppliedFilters() SearchFilterSpec`

GetAppliedFilters returns the AppliedFilters field if non-nil, zero value otherwise.

### GetAppliedFiltersOk

`func (o *SearchResponse) GetAppliedFiltersOk() (*SearchFilterSpec, bool)`

GetAppliedFiltersOk returns a tuple with the AppliedFilters field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAppliedFilters

`func (o *SearchResponse) SetAppliedFilters(v SearchFilterSpec)`

SetAppliedFilters sets AppliedFilters field to given value.

### HasAppliedFilters

`func (o *SearchResponse) HasAppliedFilters() bool`

HasAppliedFilters returns a boolean if a field has been set.

### GetDecompositionSource

`func (o *SearchResponse) GetDecompositionSource() string`

GetDecompositionSource returns the DecompositionSource field if non-nil, zero value otherwise.

### GetDecompositionSourceOk

`func (o *SearchResponse) GetDecompositionSourceOk() (*string, bool)`

GetDecompositionSourceOk returns a tuple with the DecompositionSource field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDecompositionSource

`func (o *SearchResponse) SetDecompositionSource(v string)`

SetDecompositionSource sets DecompositionSource field to given value.

### HasDecompositionSource

`func (o *SearchResponse) HasDecompositionSource() bool`

HasDecompositionSource returns a boolean if a field has been set.

### GetEmbedderModel

`func (o *SearchResponse) GetEmbedderModel() string`

GetEmbedderModel returns the EmbedderModel field if non-nil, zero value otherwise.

### GetEmbedderModelOk

`func (o *SearchResponse) GetEmbedderModelOk() (*string, bool)`

GetEmbedderModelOk returns a tuple with the EmbedderModel field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmbedderModel

`func (o *SearchResponse) SetEmbedderModel(v string)`

SetEmbedderModel sets EmbedderModel field to given value.


### GetCandidatesConsidered

`func (o *SearchResponse) GetCandidatesConsidered() int32`

GetCandidatesConsidered returns the CandidatesConsidered field if non-nil, zero value otherwise.

### GetCandidatesConsideredOk

`func (o *SearchResponse) GetCandidatesConsideredOk() (*int32, bool)`

GetCandidatesConsideredOk returns a tuple with the CandidatesConsidered field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCandidatesConsidered

`func (o *SearchResponse) SetCandidatesConsidered(v int32)`

SetCandidatesConsidered sets CandidatesConsidered field to given value.


### GetWarnings

`func (o *SearchResponse) GetWarnings() []SearchResponseWarningsInner`

GetWarnings returns the Warnings field if non-nil, zero value otherwise.

### GetWarningsOk

`func (o *SearchResponse) GetWarningsOk() (*[]SearchResponseWarningsInner, bool)`

GetWarningsOk returns a tuple with the Warnings field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWarnings

`func (o *SearchResponse) SetWarnings(v []SearchResponseWarningsInner)`

SetWarnings sets Warnings field to given value.


### GetResults

`func (o *SearchResponse) GetResults() []SearchResult`

GetResults returns the Results field if non-nil, zero value otherwise.

### GetResultsOk

`func (o *SearchResponse) GetResultsOk() (*[]SearchResult, bool)`

GetResultsOk returns a tuple with the Results field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResults

`func (o *SearchResponse) SetResults(v []SearchResult)`

SetResults sets Results field to given value.


### GetMock

`func (o *SearchResponse) GetMock() bool`

GetMock returns the Mock field if non-nil, zero value otherwise.

### GetMockOk

`func (o *SearchResponse) GetMockOk() (*bool, bool)`

GetMockOk returns a tuple with the Mock field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMock

`func (o *SearchResponse) SetMock(v bool)`

SetMock sets Mock field to given value.

### HasMock

`func (o *SearchResponse) HasMock() bool`

HasMock returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


