# FetchBalanceSnapshot

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PromoUsd** | **string** |  | 
**WalletUsdc** | **string** | Live Base USDC balance. | 
**TempoUsd** | **string** | Aggregated USD of allowlisted Tempo dollar tokens, 2dp. &#x60;null&#x60; when UNKNOWN (RPC read failed or no token allowlisted for the paired chain) — never \&quot;0.00\&quot; for an unread component.  | 
**TotalUsd** | **string** | Aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, 2dp. Equals &#x60;wallet_usdc&#x60; alone when &#x60;tempo_usd&#x60; is null. Null when the Base USDC provider is unreachable.  | 
**SpentTodayUsd** | **string** |  | 

## Methods

### NewFetchBalanceSnapshot

`func NewFetchBalanceSnapshot(promoUsd string, walletUsdc string, tempoUsd string, totalUsd string, spentTodayUsd string, ) *FetchBalanceSnapshot`

NewFetchBalanceSnapshot instantiates a new FetchBalanceSnapshot object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewFetchBalanceSnapshotWithDefaults

`func NewFetchBalanceSnapshotWithDefaults() *FetchBalanceSnapshot`

NewFetchBalanceSnapshotWithDefaults instantiates a new FetchBalanceSnapshot object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPromoUsd

`func (o *FetchBalanceSnapshot) GetPromoUsd() string`

GetPromoUsd returns the PromoUsd field if non-nil, zero value otherwise.

### GetPromoUsdOk

`func (o *FetchBalanceSnapshot) GetPromoUsdOk() (*string, bool)`

GetPromoUsdOk returns a tuple with the PromoUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPromoUsd

`func (o *FetchBalanceSnapshot) SetPromoUsd(v string)`

SetPromoUsd sets PromoUsd field to given value.


### GetWalletUsdc

`func (o *FetchBalanceSnapshot) GetWalletUsdc() string`

GetWalletUsdc returns the WalletUsdc field if non-nil, zero value otherwise.

### GetWalletUsdcOk

`func (o *FetchBalanceSnapshot) GetWalletUsdcOk() (*string, bool)`

GetWalletUsdcOk returns a tuple with the WalletUsdc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWalletUsdc

`func (o *FetchBalanceSnapshot) SetWalletUsdc(v string)`

SetWalletUsdc sets WalletUsdc field to given value.


### GetTempoUsd

`func (o *FetchBalanceSnapshot) GetTempoUsd() string`

GetTempoUsd returns the TempoUsd field if non-nil, zero value otherwise.

### GetTempoUsdOk

`func (o *FetchBalanceSnapshot) GetTempoUsdOk() (*string, bool)`

GetTempoUsdOk returns a tuple with the TempoUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTempoUsd

`func (o *FetchBalanceSnapshot) SetTempoUsd(v string)`

SetTempoUsd sets TempoUsd field to given value.


### GetTotalUsd

`func (o *FetchBalanceSnapshot) GetTotalUsd() string`

GetTotalUsd returns the TotalUsd field if non-nil, zero value otherwise.

### GetTotalUsdOk

`func (o *FetchBalanceSnapshot) GetTotalUsdOk() (*string, bool)`

GetTotalUsdOk returns a tuple with the TotalUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalUsd

`func (o *FetchBalanceSnapshot) SetTotalUsd(v string)`

SetTotalUsd sets TotalUsd field to given value.


### GetSpentTodayUsd

`func (o *FetchBalanceSnapshot) GetSpentTodayUsd() string`

GetSpentTodayUsd returns the SpentTodayUsd field if non-nil, zero value otherwise.

### GetSpentTodayUsdOk

`func (o *FetchBalanceSnapshot) GetSpentTodayUsdOk() (*string, bool)`

GetSpentTodayUsdOk returns a tuple with the SpentTodayUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSpentTodayUsd

`func (o *FetchBalanceSnapshot) SetSpentTodayUsd(v string)`

SetSpentTodayUsd sets SpentTodayUsd field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


