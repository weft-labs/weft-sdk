# SearchPricing

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Protocol** | Pointer to **string** |  | [optional] 
**Scheme** | Pointer to **string** |  | [optional] 
**AmountUsd** | Pointer to **string** | Default per-call amount; individual skills may override via &#x60;price_usd&#x60;. | [optional] 
**Network** | Pointer to **string** | Settlement network (e.g. &#x60;base-sepolia&#x60;). | [optional] 

## Methods

### NewSearchPricing

`func NewSearchPricing() *SearchPricing`

NewSearchPricing instantiates a new SearchPricing object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchPricingWithDefaults

`func NewSearchPricingWithDefaults() *SearchPricing`

NewSearchPricingWithDefaults instantiates a new SearchPricing object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProtocol

`func (o *SearchPricing) GetProtocol() string`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *SearchPricing) GetProtocolOk() (*string, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *SearchPricing) SetProtocol(v string)`

SetProtocol sets Protocol field to given value.

### HasProtocol

`func (o *SearchPricing) HasProtocol() bool`

HasProtocol returns a boolean if a field has been set.

### GetScheme

`func (o *SearchPricing) GetScheme() string`

GetScheme returns the Scheme field if non-nil, zero value otherwise.

### GetSchemeOk

`func (o *SearchPricing) GetSchemeOk() (*string, bool)`

GetSchemeOk returns a tuple with the Scheme field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScheme

`func (o *SearchPricing) SetScheme(v string)`

SetScheme sets Scheme field to given value.

### HasScheme

`func (o *SearchPricing) HasScheme() bool`

HasScheme returns a boolean if a field has been set.

### GetAmountUsd

`func (o *SearchPricing) GetAmountUsd() string`

GetAmountUsd returns the AmountUsd field if non-nil, zero value otherwise.

### GetAmountUsdOk

`func (o *SearchPricing) GetAmountUsdOk() (*string, bool)`

GetAmountUsdOk returns a tuple with the AmountUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAmountUsd

`func (o *SearchPricing) SetAmountUsd(v string)`

SetAmountUsd sets AmountUsd field to given value.

### HasAmountUsd

`func (o *SearchPricing) HasAmountUsd() bool`

HasAmountUsd returns a boolean if a field has been set.

### GetNetwork

`func (o *SearchPricing) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *SearchPricing) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *SearchPricing) SetNetwork(v string)`

SetNetwork sets Network field to given value.

### HasNetwork

`func (o *SearchPricing) HasNetwork() bool`

HasNetwork returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


