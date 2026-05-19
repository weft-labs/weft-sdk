# PromoBalance

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**BalanceUsd** | **string** |  | 
**Scope** | **string** | Where the promo can be spent. | 
**ExpiresAt** | **time.Time** |  | 

## Methods

### NewPromoBalance

`func NewPromoBalance(balanceUsd string, scope string, expiresAt time.Time, ) *PromoBalance`

NewPromoBalance instantiates a new PromoBalance object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPromoBalanceWithDefaults

`func NewPromoBalanceWithDefaults() *PromoBalance`

NewPromoBalanceWithDefaults instantiates a new PromoBalance object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetBalanceUsd

`func (o *PromoBalance) GetBalanceUsd() string`

GetBalanceUsd returns the BalanceUsd field if non-nil, zero value otherwise.

### GetBalanceUsdOk

`func (o *PromoBalance) GetBalanceUsdOk() (*string, bool)`

GetBalanceUsdOk returns a tuple with the BalanceUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBalanceUsd

`func (o *PromoBalance) SetBalanceUsd(v string)`

SetBalanceUsd sets BalanceUsd field to given value.


### GetScope

`func (o *PromoBalance) GetScope() string`

GetScope returns the Scope field if non-nil, zero value otherwise.

### GetScopeOk

`func (o *PromoBalance) GetScopeOk() (*string, bool)`

GetScopeOk returns a tuple with the Scope field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScope

`func (o *PromoBalance) SetScope(v string)`

SetScope sets Scope field to given value.


### GetExpiresAt

`func (o *PromoBalance) GetExpiresAt() time.Time`

GetExpiresAt returns the ExpiresAt field if non-nil, zero value otherwise.

### GetExpiresAtOk

`func (o *PromoBalance) GetExpiresAtOk() (*time.Time, bool)`

GetExpiresAtOk returns a tuple with the ExpiresAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresAt

`func (o *PromoBalance) SetExpiresAt(v time.Time)`

SetExpiresAt sets ExpiresAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


