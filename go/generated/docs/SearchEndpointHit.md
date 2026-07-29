# SearchEndpointHit

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**EndpointId** | Pointer to **string** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**ResourceType** | Pointer to **string** |  | [optional] 
**PrimaryProtocol** | Pointer to **string** |  | [optional] 
**Call** | Pointer to [**SearchEndpointCall**](SearchEndpointCall.md) |  | [optional] 
**Price** | Pointer to [**SearchEndpointPrice**](SearchEndpointPrice.md) |  | [optional] 
**Payment** | Pointer to [**[]SearchPaymentOffer**](SearchPaymentOffer.md) | The settlement routes this endpoint&#39;s own 402 challenge published — one entry per rail × network × asset × payee it accepts. Sibling of &#x60;call&#x60;: that block says how to shape the request, this says how to pay for it, so a caller can settle with its OWN x402/mpp SDK instead of guessing. A list because rails are irreducibly plural. Order is the provider&#39;s own preference order. Honest-empty when the pipeline observed no challenge.  | [optional] 
**OperatorType** | Pointer to **string** | Who you are actually paying. &#x60;first_party&#x60; &#x3D; operated by the provider that makes the capability; &#x60;reseller&#x60; &#x3D; resold, so the price carries someone else&#39;s margin. Null until the platform resolves the operator.  | [optional] 
**OperatedById** | Pointer to **string** |  | [optional] 
**SettledViaFacilitatorId** | Pointer to **string** |  | [optional] 
**Settlements** | Pointer to **int32** | Count of payments observed settling against this endpoint by ANYONE (chain-indexed), not just by Weft — the reliability signal a caller can act on. Null when unknown.  | [optional] 
**LastVerifiedAt** | Pointer to **time.Time** | When Weft last CONFIRMED this endpoint answers — the most recent conclusive probe. Null when never probed, or when the latest probe errored: an endpoint we last failed to reach has no current verification.  | [optional] 
**LatencyP50Ms** | Pointer to **int32** | Median time-to-first-byte in ms across the endpoint&#39;s probe call set. First-byte latency, not full-response time. Null when unmeasured (never 0).  | [optional] 

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

### GetCall

`func (o *SearchEndpointHit) GetCall() SearchEndpointCall`

GetCall returns the Call field if non-nil, zero value otherwise.

### GetCallOk

`func (o *SearchEndpointHit) GetCallOk() (*SearchEndpointCall, bool)`

GetCallOk returns a tuple with the Call field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCall

`func (o *SearchEndpointHit) SetCall(v SearchEndpointCall)`

SetCall sets Call field to given value.

### HasCall

`func (o *SearchEndpointHit) HasCall() bool`

HasCall returns a boolean if a field has been set.

### GetPrice

`func (o *SearchEndpointHit) GetPrice() SearchEndpointPrice`

GetPrice returns the Price field if non-nil, zero value otherwise.

### GetPriceOk

`func (o *SearchEndpointHit) GetPriceOk() (*SearchEndpointPrice, bool)`

GetPriceOk returns a tuple with the Price field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrice

`func (o *SearchEndpointHit) SetPrice(v SearchEndpointPrice)`

SetPrice sets Price field to given value.

### HasPrice

`func (o *SearchEndpointHit) HasPrice() bool`

HasPrice returns a boolean if a field has been set.

### GetPayment

`func (o *SearchEndpointHit) GetPayment() []SearchPaymentOffer`

GetPayment returns the Payment field if non-nil, zero value otherwise.

### GetPaymentOk

`func (o *SearchEndpointHit) GetPaymentOk() (*[]SearchPaymentOffer, bool)`

GetPaymentOk returns a tuple with the Payment field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPayment

`func (o *SearchEndpointHit) SetPayment(v []SearchPaymentOffer)`

SetPayment sets Payment field to given value.

### HasPayment

`func (o *SearchEndpointHit) HasPayment() bool`

HasPayment returns a boolean if a field has been set.

### GetOperatorType

`func (o *SearchEndpointHit) GetOperatorType() string`

GetOperatorType returns the OperatorType field if non-nil, zero value otherwise.

### GetOperatorTypeOk

`func (o *SearchEndpointHit) GetOperatorTypeOk() (*string, bool)`

GetOperatorTypeOk returns a tuple with the OperatorType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOperatorType

`func (o *SearchEndpointHit) SetOperatorType(v string)`

SetOperatorType sets OperatorType field to given value.

### HasOperatorType

`func (o *SearchEndpointHit) HasOperatorType() bool`

HasOperatorType returns a boolean if a field has been set.

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

### GetSettlements

`func (o *SearchEndpointHit) GetSettlements() int32`

GetSettlements returns the Settlements field if non-nil, zero value otherwise.

### GetSettlementsOk

`func (o *SearchEndpointHit) GetSettlementsOk() (*int32, bool)`

GetSettlementsOk returns a tuple with the Settlements field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettlements

`func (o *SearchEndpointHit) SetSettlements(v int32)`

SetSettlements sets Settlements field to given value.

### HasSettlements

`func (o *SearchEndpointHit) HasSettlements() bool`

HasSettlements returns a boolean if a field has been set.

### GetLastVerifiedAt

`func (o *SearchEndpointHit) GetLastVerifiedAt() time.Time`

GetLastVerifiedAt returns the LastVerifiedAt field if non-nil, zero value otherwise.

### GetLastVerifiedAtOk

`func (o *SearchEndpointHit) GetLastVerifiedAtOk() (*time.Time, bool)`

GetLastVerifiedAtOk returns a tuple with the LastVerifiedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastVerifiedAt

`func (o *SearchEndpointHit) SetLastVerifiedAt(v time.Time)`

SetLastVerifiedAt sets LastVerifiedAt field to given value.

### HasLastVerifiedAt

`func (o *SearchEndpointHit) HasLastVerifiedAt() bool`

HasLastVerifiedAt returns a boolean if a field has been set.

### GetLatencyP50Ms

`func (o *SearchEndpointHit) GetLatencyP50Ms() int32`

GetLatencyP50Ms returns the LatencyP50Ms field if non-nil, zero value otherwise.

### GetLatencyP50MsOk

`func (o *SearchEndpointHit) GetLatencyP50MsOk() (*int32, bool)`

GetLatencyP50MsOk returns a tuple with the LatencyP50Ms field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLatencyP50Ms

`func (o *SearchEndpointHit) SetLatencyP50Ms(v int32)`

SetLatencyP50Ms sets LatencyP50Ms field to given value.

### HasLatencyP50Ms

`func (o *SearchEndpointHit) HasLatencyP50Ms() bool`

HasLatencyP50Ms returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


