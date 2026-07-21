# BalanceResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Promo** | [**PromoBalance**](PromoBalance.md) |  | 
**Wallet** | [**Wallet**](Wallet.md) |  | 
**SpentTodayUsd** | **string** | USD spent in the current calendar day (UTC). Up to 6 decimals with trailing zeros trimmed so sub-cent micro-payments survive (\&quot;0.0005\&quot;, \&quot;0.42\&quot;); a zero total renders as \&quot;0\&quot;. | 
**SpentWeekUsd** | **string** | USD spent in the current calendar week (UTC, Monday start). Up to 6 decimals with trailing zeros trimmed (\&quot;0.0005\&quot;, \&quot;3.10\&quot;); a zero total renders as \&quot;0\&quot;. | 
**Policy** | [**SpendingPolicy**](SpendingPolicy.md) |  | 

## Methods

### NewBalanceResponse

`func NewBalanceResponse(promo PromoBalance, wallet Wallet, spentTodayUsd string, spentWeekUsd string, policy SpendingPolicy, ) *BalanceResponse`

NewBalanceResponse instantiates a new BalanceResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewBalanceResponseWithDefaults

`func NewBalanceResponseWithDefaults() *BalanceResponse`

NewBalanceResponseWithDefaults instantiates a new BalanceResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPromo

`func (o *BalanceResponse) GetPromo() PromoBalance`

GetPromo returns the Promo field if non-nil, zero value otherwise.

### GetPromoOk

`func (o *BalanceResponse) GetPromoOk() (*PromoBalance, bool)`

GetPromoOk returns a tuple with the Promo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPromo

`func (o *BalanceResponse) SetPromo(v PromoBalance)`

SetPromo sets Promo field to given value.


### GetWallet

`func (o *BalanceResponse) GetWallet() Wallet`

GetWallet returns the Wallet field if non-nil, zero value otherwise.

### GetWalletOk

`func (o *BalanceResponse) GetWalletOk() (*Wallet, bool)`

GetWalletOk returns a tuple with the Wallet field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWallet

`func (o *BalanceResponse) SetWallet(v Wallet)`

SetWallet sets Wallet field to given value.


### GetSpentTodayUsd

`func (o *BalanceResponse) GetSpentTodayUsd() string`

GetSpentTodayUsd returns the SpentTodayUsd field if non-nil, zero value otherwise.

### GetSpentTodayUsdOk

`func (o *BalanceResponse) GetSpentTodayUsdOk() (*string, bool)`

GetSpentTodayUsdOk returns a tuple with the SpentTodayUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSpentTodayUsd

`func (o *BalanceResponse) SetSpentTodayUsd(v string)`

SetSpentTodayUsd sets SpentTodayUsd field to given value.


### GetSpentWeekUsd

`func (o *BalanceResponse) GetSpentWeekUsd() string`

GetSpentWeekUsd returns the SpentWeekUsd field if non-nil, zero value otherwise.

### GetSpentWeekUsdOk

`func (o *BalanceResponse) GetSpentWeekUsdOk() (*string, bool)`

GetSpentWeekUsdOk returns a tuple with the SpentWeekUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSpentWeekUsd

`func (o *BalanceResponse) SetSpentWeekUsd(v string)`

SetSpentWeekUsd sets SpentWeekUsd field to given value.


### GetPolicy

`func (o *BalanceResponse) GetPolicy() SpendingPolicy`

GetPolicy returns the Policy field if non-nil, zero value otherwise.

### GetPolicyOk

`func (o *BalanceResponse) GetPolicyOk() (*SpendingPolicy, bool)`

GetPolicyOk returns a tuple with the Policy field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPolicy

`func (o *BalanceResponse) SetPolicy(v SpendingPolicy)`

SetPolicy sets Policy field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


