# Wallet

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Address** | **string** | EVM address of the buyer&#39;s Privy-managed wallet. Null if no wallet provisioned. | 
**BalanceUsdc** | **string** | Live Base USDC balance, 2dp. Returns \&quot;0.00\&quot; if the upstream wallet provider is unreachable. | 
**TempoUsd** | **string** | Aggregated USD value of the allowlisted Tempo TIP-20 dollar tokens on the wallet&#39;s paired Tempo chain, 2dp. &#x60;null&#x60; when the value is UNKNOWN — the Tempo RPC read failed, or no dollar token is allowlisted for that chain yet (e.g. Tempo mainnet pre-launch). A null here is never \&quot;0.00\&quot;; it means \&quot;we couldn&#39;t determine it\&quot;, and &#x60;total_usd&#x60; then reflects the Base component only.  | 
**TotalUsd** | **string** | Single aggregated USD balance &#x3D; Base USDC + Tempo dollar tokens, 2dp. When &#x60;tempo_usd&#x60; is null (unavailable/unallowlisted) this equals &#x60;balance_usdc&#x60; alone. Null when the Base USDC provider is unreachable, because the surface never claims zero for a component it could not read.  | 
**Network** | **string** | Wallet network (e.g. &#x60;base-sepolia&#x60;). | 

## Methods

### NewWallet

`func NewWallet(address string, balanceUsdc string, tempoUsd string, totalUsd string, network string, ) *Wallet`

NewWallet instantiates a new Wallet object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWalletWithDefaults

`func NewWalletWithDefaults() *Wallet`

NewWalletWithDefaults instantiates a new Wallet object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddress

`func (o *Wallet) GetAddress() string`

GetAddress returns the Address field if non-nil, zero value otherwise.

### GetAddressOk

`func (o *Wallet) GetAddressOk() (*string, bool)`

GetAddressOk returns a tuple with the Address field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddress

`func (o *Wallet) SetAddress(v string)`

SetAddress sets Address field to given value.


### GetBalanceUsdc

`func (o *Wallet) GetBalanceUsdc() string`

GetBalanceUsdc returns the BalanceUsdc field if non-nil, zero value otherwise.

### GetBalanceUsdcOk

`func (o *Wallet) GetBalanceUsdcOk() (*string, bool)`

GetBalanceUsdcOk returns a tuple with the BalanceUsdc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBalanceUsdc

`func (o *Wallet) SetBalanceUsdc(v string)`

SetBalanceUsdc sets BalanceUsdc field to given value.


### GetTempoUsd

`func (o *Wallet) GetTempoUsd() string`

GetTempoUsd returns the TempoUsd field if non-nil, zero value otherwise.

### GetTempoUsdOk

`func (o *Wallet) GetTempoUsdOk() (*string, bool)`

GetTempoUsdOk returns a tuple with the TempoUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTempoUsd

`func (o *Wallet) SetTempoUsd(v string)`

SetTempoUsd sets TempoUsd field to given value.


### GetTotalUsd

`func (o *Wallet) GetTotalUsd() string`

GetTotalUsd returns the TotalUsd field if non-nil, zero value otherwise.

### GetTotalUsdOk

`func (o *Wallet) GetTotalUsdOk() (*string, bool)`

GetTotalUsdOk returns a tuple with the TotalUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalUsd

`func (o *Wallet) SetTotalUsd(v string)`

SetTotalUsd sets TotalUsd field to given value.


### GetNetwork

`func (o *Wallet) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *Wallet) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *Wallet) SetNetwork(v string)`

SetNetwork sets Network field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


