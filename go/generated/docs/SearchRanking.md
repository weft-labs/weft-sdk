# SearchRanking

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PopularityScore** | Pointer to **float64** |  | [optional] 
**SettlementCount30d** | Pointer to **int32** |  | [optional] 
**SuccessRate30d** | Pointer to **float64** |  | [optional] 
**P50LatencyMs** | Pointer to **int32** |  | [optional] 
**FirstSeenAt** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewSearchRanking

`func NewSearchRanking() *SearchRanking`

NewSearchRanking instantiates a new SearchRanking object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchRankingWithDefaults

`func NewSearchRankingWithDefaults() *SearchRanking`

NewSearchRankingWithDefaults instantiates a new SearchRanking object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPopularityScore

`func (o *SearchRanking) GetPopularityScore() float64`

GetPopularityScore returns the PopularityScore field if non-nil, zero value otherwise.

### GetPopularityScoreOk

`func (o *SearchRanking) GetPopularityScoreOk() (*float64, bool)`

GetPopularityScoreOk returns a tuple with the PopularityScore field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPopularityScore

`func (o *SearchRanking) SetPopularityScore(v float64)`

SetPopularityScore sets PopularityScore field to given value.

### HasPopularityScore

`func (o *SearchRanking) HasPopularityScore() bool`

HasPopularityScore returns a boolean if a field has been set.

### GetSettlementCount30d

`func (o *SearchRanking) GetSettlementCount30d() int32`

GetSettlementCount30d returns the SettlementCount30d field if non-nil, zero value otherwise.

### GetSettlementCount30dOk

`func (o *SearchRanking) GetSettlementCount30dOk() (*int32, bool)`

GetSettlementCount30dOk returns a tuple with the SettlementCount30d field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettlementCount30d

`func (o *SearchRanking) SetSettlementCount30d(v int32)`

SetSettlementCount30d sets SettlementCount30d field to given value.

### HasSettlementCount30d

`func (o *SearchRanking) HasSettlementCount30d() bool`

HasSettlementCount30d returns a boolean if a field has been set.

### GetSuccessRate30d

`func (o *SearchRanking) GetSuccessRate30d() float64`

GetSuccessRate30d returns the SuccessRate30d field if non-nil, zero value otherwise.

### GetSuccessRate30dOk

`func (o *SearchRanking) GetSuccessRate30dOk() (*float64, bool)`

GetSuccessRate30dOk returns a tuple with the SuccessRate30d field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSuccessRate30d

`func (o *SearchRanking) SetSuccessRate30d(v float64)`

SetSuccessRate30d sets SuccessRate30d field to given value.

### HasSuccessRate30d

`func (o *SearchRanking) HasSuccessRate30d() bool`

HasSuccessRate30d returns a boolean if a field has been set.

### GetP50LatencyMs

`func (o *SearchRanking) GetP50LatencyMs() int32`

GetP50LatencyMs returns the P50LatencyMs field if non-nil, zero value otherwise.

### GetP50LatencyMsOk

`func (o *SearchRanking) GetP50LatencyMsOk() (*int32, bool)`

GetP50LatencyMsOk returns a tuple with the P50LatencyMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetP50LatencyMs

`func (o *SearchRanking) SetP50LatencyMs(v int32)`

SetP50LatencyMs sets P50LatencyMs field to given value.

### HasP50LatencyMs

`func (o *SearchRanking) HasP50LatencyMs() bool`

HasP50LatencyMs returns a boolean if a field has been set.

### GetFirstSeenAt

`func (o *SearchRanking) GetFirstSeenAt() time.Time`

GetFirstSeenAt returns the FirstSeenAt field if non-nil, zero value otherwise.

### GetFirstSeenAtOk

`func (o *SearchRanking) GetFirstSeenAtOk() (*time.Time, bool)`

GetFirstSeenAtOk returns a tuple with the FirstSeenAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFirstSeenAt

`func (o *SearchRanking) SetFirstSeenAt(v time.Time)`

SetFirstSeenAt sets FirstSeenAt field to given value.

### HasFirstSeenAt

`func (o *SearchRanking) HasFirstSeenAt() bool`

HasFirstSeenAt returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


