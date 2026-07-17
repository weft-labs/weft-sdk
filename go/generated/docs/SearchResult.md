# SearchResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Provider** | [**SearchProviderRef**](SearchProviderRef.md) |  | 
**Capability** | [**SearchCapabilityRef**](SearchCapabilityRef.md) |  | 
**Endpoints** | [**[]SearchEndpointHit**](SearchEndpointHit.md) |  | 
**Score** | **float64** |  | 

## Methods

### NewSearchResult

`func NewSearchResult(provider SearchProviderRef, capability SearchCapabilityRef, endpoints []SearchEndpointHit, score float64, ) *SearchResult`

NewSearchResult instantiates a new SearchResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchResultWithDefaults

`func NewSearchResultWithDefaults() *SearchResult`

NewSearchResultWithDefaults instantiates a new SearchResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProvider

`func (o *SearchResult) GetProvider() SearchProviderRef`

GetProvider returns the Provider field if non-nil, zero value otherwise.

### GetProviderOk

`func (o *SearchResult) GetProviderOk() (*SearchProviderRef, bool)`

GetProviderOk returns a tuple with the Provider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProvider

`func (o *SearchResult) SetProvider(v SearchProviderRef)`

SetProvider sets Provider field to given value.


### GetCapability

`func (o *SearchResult) GetCapability() SearchCapabilityRef`

GetCapability returns the Capability field if non-nil, zero value otherwise.

### GetCapabilityOk

`func (o *SearchResult) GetCapabilityOk() (*SearchCapabilityRef, bool)`

GetCapabilityOk returns a tuple with the Capability field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCapability

`func (o *SearchResult) SetCapability(v SearchCapabilityRef)`

SetCapability sets Capability field to given value.


### GetEndpoints

`func (o *SearchResult) GetEndpoints() []SearchEndpointHit`

GetEndpoints returns the Endpoints field if non-nil, zero value otherwise.

### GetEndpointsOk

`func (o *SearchResult) GetEndpointsOk() (*[]SearchEndpointHit, bool)`

GetEndpointsOk returns a tuple with the Endpoints field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpoints

`func (o *SearchResult) SetEndpoints(v []SearchEndpointHit)`

SetEndpoints sets Endpoints field to given value.


### GetScore

`func (o *SearchResult) GetScore() float64`

GetScore returns the Score field if non-nil, zero value otherwise.

### GetScoreOk

`func (o *SearchResult) GetScoreOk() (*float64, bool)`

GetScoreOk returns a tuple with the Score field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScore

`func (o *SearchResult) SetScore(v float64)`

SetScore sets Score field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


