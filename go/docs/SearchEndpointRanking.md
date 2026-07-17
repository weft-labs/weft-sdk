# SearchEndpointRanking

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Similarity** | Pointer to **float32** |  | [optional] 
**PriceAtomic** | Pointer to **int32** |  | [optional] 
**RankReason** | Pointer to **string** |  | [optional] 
**ProbeStatus** | Pointer to **string** |  | [optional] 
**MedianTtfbMs** | Pointer to **int32** |  | [optional] 
**MinTotalLatencyMs** | Pointer to **int32** |  | [optional] 
**MaxTotalLatencyMs** | Pointer to **int32** |  | [optional] 

## Methods

### NewSearchEndpointRanking

`func NewSearchEndpointRanking() *SearchEndpointRanking`

NewSearchEndpointRanking instantiates a new SearchEndpointRanking object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchEndpointRankingWithDefaults

`func NewSearchEndpointRankingWithDefaults() *SearchEndpointRanking`

NewSearchEndpointRankingWithDefaults instantiates a new SearchEndpointRanking object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSimilarity

`func (o *SearchEndpointRanking) GetSimilarity() float32`

GetSimilarity returns the Similarity field if non-nil, zero value otherwise.

### GetSimilarityOk

`func (o *SearchEndpointRanking) GetSimilarityOk() (*float32, bool)`

GetSimilarityOk returns a tuple with the Similarity field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSimilarity

`func (o *SearchEndpointRanking) SetSimilarity(v float32)`

SetSimilarity sets Similarity field to given value.

### HasSimilarity

`func (o *SearchEndpointRanking) HasSimilarity() bool`

HasSimilarity returns a boolean if a field has been set.

### GetPriceAtomic

`func (o *SearchEndpointRanking) GetPriceAtomic() int32`

GetPriceAtomic returns the PriceAtomic field if non-nil, zero value otherwise.

### GetPriceAtomicOk

`func (o *SearchEndpointRanking) GetPriceAtomicOk() (*int32, bool)`

GetPriceAtomicOk returns a tuple with the PriceAtomic field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceAtomic

`func (o *SearchEndpointRanking) SetPriceAtomic(v int32)`

SetPriceAtomic sets PriceAtomic field to given value.

### HasPriceAtomic

`func (o *SearchEndpointRanking) HasPriceAtomic() bool`

HasPriceAtomic returns a boolean if a field has been set.

### GetRankReason

`func (o *SearchEndpointRanking) GetRankReason() string`

GetRankReason returns the RankReason field if non-nil, zero value otherwise.

### GetRankReasonOk

`func (o *SearchEndpointRanking) GetRankReasonOk() (*string, bool)`

GetRankReasonOk returns a tuple with the RankReason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRankReason

`func (o *SearchEndpointRanking) SetRankReason(v string)`

SetRankReason sets RankReason field to given value.

### HasRankReason

`func (o *SearchEndpointRanking) HasRankReason() bool`

HasRankReason returns a boolean if a field has been set.

### GetProbeStatus

`func (o *SearchEndpointRanking) GetProbeStatus() string`

GetProbeStatus returns the ProbeStatus field if non-nil, zero value otherwise.

### GetProbeStatusOk

`func (o *SearchEndpointRanking) GetProbeStatusOk() (*string, bool)`

GetProbeStatusOk returns a tuple with the ProbeStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProbeStatus

`func (o *SearchEndpointRanking) SetProbeStatus(v string)`

SetProbeStatus sets ProbeStatus field to given value.

### HasProbeStatus

`func (o *SearchEndpointRanking) HasProbeStatus() bool`

HasProbeStatus returns a boolean if a field has been set.

### GetMedianTtfbMs

`func (o *SearchEndpointRanking) GetMedianTtfbMs() int32`

GetMedianTtfbMs returns the MedianTtfbMs field if non-nil, zero value otherwise.

### GetMedianTtfbMsOk

`func (o *SearchEndpointRanking) GetMedianTtfbMsOk() (*int32, bool)`

GetMedianTtfbMsOk returns a tuple with the MedianTtfbMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMedianTtfbMs

`func (o *SearchEndpointRanking) SetMedianTtfbMs(v int32)`

SetMedianTtfbMs sets MedianTtfbMs field to given value.

### HasMedianTtfbMs

`func (o *SearchEndpointRanking) HasMedianTtfbMs() bool`

HasMedianTtfbMs returns a boolean if a field has been set.

### GetMinTotalLatencyMs

`func (o *SearchEndpointRanking) GetMinTotalLatencyMs() int32`

GetMinTotalLatencyMs returns the MinTotalLatencyMs field if non-nil, zero value otherwise.

### GetMinTotalLatencyMsOk

`func (o *SearchEndpointRanking) GetMinTotalLatencyMsOk() (*int32, bool)`

GetMinTotalLatencyMsOk returns a tuple with the MinTotalLatencyMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMinTotalLatencyMs

`func (o *SearchEndpointRanking) SetMinTotalLatencyMs(v int32)`

SetMinTotalLatencyMs sets MinTotalLatencyMs field to given value.

### HasMinTotalLatencyMs

`func (o *SearchEndpointRanking) HasMinTotalLatencyMs() bool`

HasMinTotalLatencyMs returns a boolean if a field has been set.

### GetMaxTotalLatencyMs

`func (o *SearchEndpointRanking) GetMaxTotalLatencyMs() int32`

GetMaxTotalLatencyMs returns the MaxTotalLatencyMs field if non-nil, zero value otherwise.

### GetMaxTotalLatencyMsOk

`func (o *SearchEndpointRanking) GetMaxTotalLatencyMsOk() (*int32, bool)`

GetMaxTotalLatencyMsOk returns a tuple with the MaxTotalLatencyMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxTotalLatencyMs

`func (o *SearchEndpointRanking) SetMaxTotalLatencyMs(v int32)`

SetMaxTotalLatencyMs sets MaxTotalLatencyMs field to given value.

### HasMaxTotalLatencyMs

`func (o *SearchEndpointRanking) HasMaxTotalLatencyMs() bool`

HasMaxTotalLatencyMs returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


