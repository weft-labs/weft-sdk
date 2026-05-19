# SearchResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Results** | [**[]SearchResult**](SearchResult.md) |  | 
**PaidUsd** | Pointer to **string** | Always &#x60;null&#x60; in v1. | [optional] 
**TxHash** | Pointer to **string** | Always &#x60;null&#x60; in v1. | [optional] 
**ArtifactId** | Pointer to **string** | Always &#x60;null&#x60; in v1. | [optional] 
**Mock** | Pointer to **bool** | Present and &#x60;true&#x60; only when served by the mock backend. | [optional] 

## Methods

### NewSearchResponse

`func NewSearchResponse(results []SearchResult, ) *SearchResponse`

NewSearchResponse instantiates a new SearchResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchResponseWithDefaults

`func NewSearchResponseWithDefaults() *SearchResponse`

NewSearchResponseWithDefaults instantiates a new SearchResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

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


### GetPaidUsd

`func (o *SearchResponse) GetPaidUsd() string`

GetPaidUsd returns the PaidUsd field if non-nil, zero value otherwise.

### GetPaidUsdOk

`func (o *SearchResponse) GetPaidUsdOk() (*string, bool)`

GetPaidUsdOk returns a tuple with the PaidUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaidUsd

`func (o *SearchResponse) SetPaidUsd(v string)`

SetPaidUsd sets PaidUsd field to given value.

### HasPaidUsd

`func (o *SearchResponse) HasPaidUsd() bool`

HasPaidUsd returns a boolean if a field has been set.

### GetTxHash

`func (o *SearchResponse) GetTxHash() string`

GetTxHash returns the TxHash field if non-nil, zero value otherwise.

### GetTxHashOk

`func (o *SearchResponse) GetTxHashOk() (*string, bool)`

GetTxHashOk returns a tuple with the TxHash field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxHash

`func (o *SearchResponse) SetTxHash(v string)`

SetTxHash sets TxHash field to given value.

### HasTxHash

`func (o *SearchResponse) HasTxHash() bool`

HasTxHash returns a boolean if a field has been set.

### GetArtifactId

`func (o *SearchResponse) GetArtifactId() string`

GetArtifactId returns the ArtifactId field if non-nil, zero value otherwise.

### GetArtifactIdOk

`func (o *SearchResponse) GetArtifactIdOk() (*string, bool)`

GetArtifactIdOk returns a tuple with the ArtifactId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetArtifactId

`func (o *SearchResponse) SetArtifactId(v string)`

SetArtifactId sets ArtifactId field to given value.

### HasArtifactId

`func (o *SearchResponse) HasArtifactId() bool`

HasArtifactId returns a boolean if a field has been set.

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


