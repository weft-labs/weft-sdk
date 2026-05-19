# SearchResult

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** | Stable agent identifier (e.g. &#x60;weft:agent:agentmail&#x60;). | 
**Score** | **float64** | Cosine similarity score, clipped to [0, 1]. | 
**Protocol** | **string** | Agent protocol surface. | 
**Domain** | **[]string** | Domain tags declared by the agent. | 
**Reseller** | Pointer to **string** | Reseller slug if this agent is fronted by an aggregator (e.g. &#x60;locus&#x60;). | [optional] 
**Upstream** | Pointer to **string** | Upstream provider hostname when fronted by a reseller. | [optional] 
**AgentCard** | [**SearchAgentCard**](SearchAgentCard.md) |  | 
**Pricing** | [**SearchPricing**](SearchPricing.md) |  | 
**Ranking** | [**SearchRanking**](SearchRanking.md) |  | 
**Endpoints** | [**SearchEndpoints**](SearchEndpoints.md) |  | 

## Methods

### NewSearchResult

`func NewSearchResult(id string, score float64, protocol string, domain []string, agentCard SearchAgentCard, pricing SearchPricing, ranking SearchRanking, endpoints SearchEndpoints, ) *SearchResult`

NewSearchResult instantiates a new SearchResult object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchResultWithDefaults

`func NewSearchResultWithDefaults() *SearchResult`

NewSearchResultWithDefaults instantiates a new SearchResult object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SearchResult) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SearchResult) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SearchResult) SetId(v string)`

SetId sets Id field to given value.


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


### GetProtocol

`func (o *SearchResult) GetProtocol() string`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *SearchResult) GetProtocolOk() (*string, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *SearchResult) SetProtocol(v string)`

SetProtocol sets Protocol field to given value.


### GetDomain

`func (o *SearchResult) GetDomain() []string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *SearchResult) GetDomainOk() (*[]string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *SearchResult) SetDomain(v []string)`

SetDomain sets Domain field to given value.


### GetReseller

`func (o *SearchResult) GetReseller() string`

GetReseller returns the Reseller field if non-nil, zero value otherwise.

### GetResellerOk

`func (o *SearchResult) GetResellerOk() (*string, bool)`

GetResellerOk returns a tuple with the Reseller field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReseller

`func (o *SearchResult) SetReseller(v string)`

SetReseller sets Reseller field to given value.

### HasReseller

`func (o *SearchResult) HasReseller() bool`

HasReseller returns a boolean if a field has been set.

### GetUpstream

`func (o *SearchResult) GetUpstream() string`

GetUpstream returns the Upstream field if non-nil, zero value otherwise.

### GetUpstreamOk

`func (o *SearchResult) GetUpstreamOk() (*string, bool)`

GetUpstreamOk returns a tuple with the Upstream field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpstream

`func (o *SearchResult) SetUpstream(v string)`

SetUpstream sets Upstream field to given value.

### HasUpstream

`func (o *SearchResult) HasUpstream() bool`

HasUpstream returns a boolean if a field has been set.

### GetAgentCard

`func (o *SearchResult) GetAgentCard() SearchAgentCard`

GetAgentCard returns the AgentCard field if non-nil, zero value otherwise.

### GetAgentCardOk

`func (o *SearchResult) GetAgentCardOk() (*SearchAgentCard, bool)`

GetAgentCardOk returns a tuple with the AgentCard field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAgentCard

`func (o *SearchResult) SetAgentCard(v SearchAgentCard)`

SetAgentCard sets AgentCard field to given value.


### GetPricing

`func (o *SearchResult) GetPricing() SearchPricing`

GetPricing returns the Pricing field if non-nil, zero value otherwise.

### GetPricingOk

`func (o *SearchResult) GetPricingOk() (*SearchPricing, bool)`

GetPricingOk returns a tuple with the Pricing field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPricing

`func (o *SearchResult) SetPricing(v SearchPricing)`

SetPricing sets Pricing field to given value.


### GetRanking

`func (o *SearchResult) GetRanking() SearchRanking`

GetRanking returns the Ranking field if non-nil, zero value otherwise.

### GetRankingOk

`func (o *SearchResult) GetRankingOk() (*SearchRanking, bool)`

GetRankingOk returns a tuple with the Ranking field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRanking

`func (o *SearchResult) SetRanking(v SearchRanking)`

SetRanking sets Ranking field to given value.


### GetEndpoints

`func (o *SearchResult) GetEndpoints() SearchEndpoints`

GetEndpoints returns the Endpoints field if non-nil, zero value otherwise.

### GetEndpointsOk

`func (o *SearchResult) GetEndpointsOk() (*SearchEndpoints, bool)`

GetEndpointsOk returns a tuple with the Endpoints field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpoints

`func (o *SearchResult) SetEndpoints(v SearchEndpoints)`

SetEndpoints sets Endpoints field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


