# SearchPaymentOffer

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Protocol** | **string** | The payment rail (e.g. &#x60;x402&#x60;, &#x60;mpp&#x60;). | 
**Scheme** | Pointer to **string** |  | [optional] 
**Network** | Pointer to **string** |  | [optional] 
**Asset** | Pointer to **string** |  | [optional] 
**Amount** | Pointer to **string** |  | [optional] 
**PayTo** | Pointer to **string** |  | [optional] 
**MaxTimeoutSeconds** | Pointer to **int32** |  | [optional] 
**Facilitator** | Pointer to **string** |  | [optional] 

## Methods

### NewSearchPaymentOffer

`func NewSearchPaymentOffer(protocol string, ) *SearchPaymentOffer`

NewSearchPaymentOffer instantiates a new SearchPaymentOffer object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchPaymentOfferWithDefaults

`func NewSearchPaymentOfferWithDefaults() *SearchPaymentOffer`

NewSearchPaymentOfferWithDefaults instantiates a new SearchPaymentOffer object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProtocol

`func (o *SearchPaymentOffer) GetProtocol() string`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *SearchPaymentOffer) GetProtocolOk() (*string, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *SearchPaymentOffer) SetProtocol(v string)`

SetProtocol sets Protocol field to given value.


### GetScheme

`func (o *SearchPaymentOffer) GetScheme() string`

GetScheme returns the Scheme field if non-nil, zero value otherwise.

### GetSchemeOk

`func (o *SearchPaymentOffer) GetSchemeOk() (*string, bool)`

GetSchemeOk returns a tuple with the Scheme field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScheme

`func (o *SearchPaymentOffer) SetScheme(v string)`

SetScheme sets Scheme field to given value.

### HasScheme

`func (o *SearchPaymentOffer) HasScheme() bool`

HasScheme returns a boolean if a field has been set.

### GetNetwork

`func (o *SearchPaymentOffer) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *SearchPaymentOffer) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *SearchPaymentOffer) SetNetwork(v string)`

SetNetwork sets Network field to given value.

### HasNetwork

`func (o *SearchPaymentOffer) HasNetwork() bool`

HasNetwork returns a boolean if a field has been set.

### GetAsset

`func (o *SearchPaymentOffer) GetAsset() string`

GetAsset returns the Asset field if non-nil, zero value otherwise.

### GetAssetOk

`func (o *SearchPaymentOffer) GetAssetOk() (*string, bool)`

GetAssetOk returns a tuple with the Asset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAsset

`func (o *SearchPaymentOffer) SetAsset(v string)`

SetAsset sets Asset field to given value.

### HasAsset

`func (o *SearchPaymentOffer) HasAsset() bool`

HasAsset returns a boolean if a field has been set.

### GetAmount

`func (o *SearchPaymentOffer) GetAmount() string`

GetAmount returns the Amount field if non-nil, zero value otherwise.

### GetAmountOk

`func (o *SearchPaymentOffer) GetAmountOk() (*string, bool)`

GetAmountOk returns a tuple with the Amount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAmount

`func (o *SearchPaymentOffer) SetAmount(v string)`

SetAmount sets Amount field to given value.

### HasAmount

`func (o *SearchPaymentOffer) HasAmount() bool`

HasAmount returns a boolean if a field has been set.

### GetPayTo

`func (o *SearchPaymentOffer) GetPayTo() string`

GetPayTo returns the PayTo field if non-nil, zero value otherwise.

### GetPayToOk

`func (o *SearchPaymentOffer) GetPayToOk() (*string, bool)`

GetPayToOk returns a tuple with the PayTo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPayTo

`func (o *SearchPaymentOffer) SetPayTo(v string)`

SetPayTo sets PayTo field to given value.

### HasPayTo

`func (o *SearchPaymentOffer) HasPayTo() bool`

HasPayTo returns a boolean if a field has been set.

### GetMaxTimeoutSeconds

`func (o *SearchPaymentOffer) GetMaxTimeoutSeconds() int32`

GetMaxTimeoutSeconds returns the MaxTimeoutSeconds field if non-nil, zero value otherwise.

### GetMaxTimeoutSecondsOk

`func (o *SearchPaymentOffer) GetMaxTimeoutSecondsOk() (*int32, bool)`

GetMaxTimeoutSecondsOk returns a tuple with the MaxTimeoutSeconds field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxTimeoutSeconds

`func (o *SearchPaymentOffer) SetMaxTimeoutSeconds(v int32)`

SetMaxTimeoutSeconds sets MaxTimeoutSeconds field to given value.

### HasMaxTimeoutSeconds

`func (o *SearchPaymentOffer) HasMaxTimeoutSeconds() bool`

HasMaxTimeoutSeconds returns a boolean if a field has been set.

### GetFacilitator

`func (o *SearchPaymentOffer) GetFacilitator() string`

GetFacilitator returns the Facilitator field if non-nil, zero value otherwise.

### GetFacilitatorOk

`func (o *SearchPaymentOffer) GetFacilitatorOk() (*string, bool)`

GetFacilitatorOk returns a tuple with the Facilitator field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFacilitator

`func (o *SearchPaymentOffer) SetFacilitator(v string)`

SetFacilitator sets Facilitator field to given value.

### HasFacilitator

`func (o *SearchPaymentOffer) HasFacilitator() bool`

HasFacilitator returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


