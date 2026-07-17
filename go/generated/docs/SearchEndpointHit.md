# SearchEndpointHit

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**EndpointId** | Pointer to **string** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**ResourceType** | Pointer to **string** |  | [optional] 
**PrimaryProtocol** | Pointer to **string** |  | [optional] 
**PriceAtomic** | Pointer to **int32** | Price in atomic units (micro-USD) for this endpoint. Use this for settlement (exact, integer). Null when unpriced.  | [optional] 
**PriceUsd** | Pointer to **string** | Server-derived price in USD as a decimal string (&#x3D; &#x60;price_atomic&#x60; / 1e6, e.g. \&quot;0.008\&quot; for &#x60;price_atomic&#x60; 8000) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced (mirrors &#x60;price_atomic&#x60;). For settlement use &#x60;price_atomic&#x60;.  | [optional] 
**PriceCurrency** | Pointer to **string** |  | [optional] 
**PriceDecimals** | Pointer to **int32** |  | [optional] 
**OperatedById** | Pointer to **string** |  | [optional] 
**OperatedByType** | Pointer to **string** |  | [optional] 
**SettledViaFacilitatorId** | Pointer to **string** |  | [optional] 
**Ranking** | Pointer to [**SearchEndpointRanking**](SearchEndpointRanking.md) |  | [optional] 

## Methods

### NewSearchEndpointHit

`func NewSearchEndpointHit() *SearchEndpointHit`

NewSearchEndpointHit instantiates a new SearchEndpointHit object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchEndpointHitWithDefaults

`func NewSearchEndpointHitWithDefaults() *SearchEndpointHit`

NewSearchEndpointHitWithDefaults instantiates a new SearchEndpointHit object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEndpointId

`func (o *SearchEndpointHit) GetEndpointId() string`

GetEndpointId returns the EndpointId field if non-nil, zero value otherwise.

### GetEndpointIdOk

`func (o *SearchEndpointHit) GetEndpointIdOk() (*string, bool)`

GetEndpointIdOk returns a tuple with the EndpointId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpointId

`func (o *SearchEndpointHit) SetEndpointId(v string)`

SetEndpointId sets EndpointId field to given value.

### HasEndpointId

`func (o *SearchEndpointHit) HasEndpointId() bool`

HasEndpointId returns a boolean if a field has been set.

### GetUrl

`func (o *SearchEndpointHit) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *SearchEndpointHit) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *SearchEndpointHit) SetUrl(v string)`

SetUrl sets Url field to given value.

### HasUrl

`func (o *SearchEndpointHit) HasUrl() bool`

HasUrl returns a boolean if a field has been set.

### GetResourceType

`func (o *SearchEndpointHit) GetResourceType() string`

GetResourceType returns the ResourceType field if non-nil, zero value otherwise.

### GetResourceTypeOk

`func (o *SearchEndpointHit) GetResourceTypeOk() (*string, bool)`

GetResourceTypeOk returns a tuple with the ResourceType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResourceType

`func (o *SearchEndpointHit) SetResourceType(v string)`

SetResourceType sets ResourceType field to given value.

### HasResourceType

`func (o *SearchEndpointHit) HasResourceType() bool`

HasResourceType returns a boolean if a field has been set.

### GetPrimaryProtocol

`func (o *SearchEndpointHit) GetPrimaryProtocol() string`

GetPrimaryProtocol returns the PrimaryProtocol field if non-nil, zero value otherwise.

### GetPrimaryProtocolOk

`func (o *SearchEndpointHit) GetPrimaryProtocolOk() (*string, bool)`

GetPrimaryProtocolOk returns a tuple with the PrimaryProtocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrimaryProtocol

`func (o *SearchEndpointHit) SetPrimaryProtocol(v string)`

SetPrimaryProtocol sets PrimaryProtocol field to given value.

### HasPrimaryProtocol

`func (o *SearchEndpointHit) HasPrimaryProtocol() bool`

HasPrimaryProtocol returns a boolean if a field has been set.

### GetPriceAtomic

`func (o *SearchEndpointHit) GetPriceAtomic() int32`

GetPriceAtomic returns the PriceAtomic field if non-nil, zero value otherwise.

### GetPriceAtomicOk

`func (o *SearchEndpointHit) GetPriceAtomicOk() (*int32, bool)`

GetPriceAtomicOk returns a tuple with the PriceAtomic field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceAtomic

`func (o *SearchEndpointHit) SetPriceAtomic(v int32)`

SetPriceAtomic sets PriceAtomic field to given value.

### HasPriceAtomic

`func (o *SearchEndpointHit) HasPriceAtomic() bool`

HasPriceAtomic returns a boolean if a field has been set.

### GetPriceUsd

`func (o *SearchEndpointHit) GetPriceUsd() string`

GetPriceUsd returns the PriceUsd field if non-nil, zero value otherwise.

### GetPriceUsdOk

`func (o *SearchEndpointHit) GetPriceUsdOk() (*string, bool)`

GetPriceUsdOk returns a tuple with the PriceUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceUsd

`func (o *SearchEndpointHit) SetPriceUsd(v string)`

SetPriceUsd sets PriceUsd field to given value.

### HasPriceUsd

`func (o *SearchEndpointHit) HasPriceUsd() bool`

HasPriceUsd returns a boolean if a field has been set.

### GetPriceCurrency

`func (o *SearchEndpointHit) GetPriceCurrency() string`

GetPriceCurrency returns the PriceCurrency field if non-nil, zero value otherwise.

### GetPriceCurrencyOk

`func (o *SearchEndpointHit) GetPriceCurrencyOk() (*string, bool)`

GetPriceCurrencyOk returns a tuple with the PriceCurrency field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceCurrency

`func (o *SearchEndpointHit) SetPriceCurrency(v string)`

SetPriceCurrency sets PriceCurrency field to given value.

### HasPriceCurrency

`func (o *SearchEndpointHit) HasPriceCurrency() bool`

HasPriceCurrency returns a boolean if a field has been set.

### GetPriceDecimals

`func (o *SearchEndpointHit) GetPriceDecimals() int32`

GetPriceDecimals returns the PriceDecimals field if non-nil, zero value otherwise.

### GetPriceDecimalsOk

`func (o *SearchEndpointHit) GetPriceDecimalsOk() (*int32, bool)`

GetPriceDecimalsOk returns a tuple with the PriceDecimals field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceDecimals

`func (o *SearchEndpointHit) SetPriceDecimals(v int32)`

SetPriceDecimals sets PriceDecimals field to given value.

### HasPriceDecimals

`func (o *SearchEndpointHit) HasPriceDecimals() bool`

HasPriceDecimals returns a boolean if a field has been set.

### GetOperatedById

`func (o *SearchEndpointHit) GetOperatedById() string`

GetOperatedById returns the OperatedById field if non-nil, zero value otherwise.

### GetOperatedByIdOk

`func (o *SearchEndpointHit) GetOperatedByIdOk() (*string, bool)`

GetOperatedByIdOk returns a tuple with the OperatedById field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOperatedById

`func (o *SearchEndpointHit) SetOperatedById(v string)`

SetOperatedById sets OperatedById field to given value.

### HasOperatedById

`func (o *SearchEndpointHit) HasOperatedById() bool`

HasOperatedById returns a boolean if a field has been set.

### GetOperatedByType

`func (o *SearchEndpointHit) GetOperatedByType() string`

GetOperatedByType returns the OperatedByType field if non-nil, zero value otherwise.

### GetOperatedByTypeOk

`func (o *SearchEndpointHit) GetOperatedByTypeOk() (*string, bool)`

GetOperatedByTypeOk returns a tuple with the OperatedByType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOperatedByType

`func (o *SearchEndpointHit) SetOperatedByType(v string)`

SetOperatedByType sets OperatedByType field to given value.

### HasOperatedByType

`func (o *SearchEndpointHit) HasOperatedByType() bool`

HasOperatedByType returns a boolean if a field has been set.

### GetSettledViaFacilitatorId

`func (o *SearchEndpointHit) GetSettledViaFacilitatorId() string`

GetSettledViaFacilitatorId returns the SettledViaFacilitatorId field if non-nil, zero value otherwise.

### GetSettledViaFacilitatorIdOk

`func (o *SearchEndpointHit) GetSettledViaFacilitatorIdOk() (*string, bool)`

GetSettledViaFacilitatorIdOk returns a tuple with the SettledViaFacilitatorId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettledViaFacilitatorId

`func (o *SearchEndpointHit) SetSettledViaFacilitatorId(v string)`

SetSettledViaFacilitatorId sets SettledViaFacilitatorId field to given value.

### HasSettledViaFacilitatorId

`func (o *SearchEndpointHit) HasSettledViaFacilitatorId() bool`

HasSettledViaFacilitatorId returns a boolean if a field has been set.

### GetRanking

`func (o *SearchEndpointHit) GetRanking() SearchEndpointRanking`

GetRanking returns the Ranking field if non-nil, zero value otherwise.

### GetRankingOk

`func (o *SearchEndpointHit) GetRankingOk() (*SearchEndpointRanking, bool)`

GetRankingOk returns a tuple with the Ranking field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRanking

`func (o *SearchEndpointHit) SetRanking(v SearchEndpointRanking)`

SetRanking sets Ranking field to given value.

### HasRanking

`func (o *SearchEndpointHit) HasRanking() bool`

HasRanking returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


