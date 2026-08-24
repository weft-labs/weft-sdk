# Wallet

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Provider** | **string** | Crossmint is the only buyer-wallet provider. |
**Address** | **string** | Base smart-wallet address. Null only when Crossmint is unavailable. |
**BalanceUsdc** | **string** | Live Base USDC balance, exact to the micro-dollar (up to 6 decimals, minimum 2). Null when Crossmint is unreachable; consumers must not interpret null as zero.  |
**TotalUsd** | **string** | Single aggregated USD balance (Base USDC), exact to the micro-dollar. Null when the provider is unreachable, because the surface never claims zero for a component it could not read.  |
**Network** | **string** | Selected Crossmint environment (&#x60;base_sepolia&#x60; or &#x60;base_mainnet&#x60;).  |

## Methods

### NewWallet

`func NewWallet(provider string, address string, balanceUsdc string, totalUsd string, network string, ) *Wallet`

NewWallet instantiates a new Wallet object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewWalletWithDefaults

`func NewWalletWithDefaults() *Wallet`

NewWalletWithDefaults instantiates a new Wallet object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProvider

`func (o *Wallet) GetProvider() string`

GetProvider returns the Provider field if non-nil, zero value otherwise.

### GetProviderOk

`func (o *Wallet) GetProviderOk() (*string, bool)`

GetProviderOk returns a tuple with the Provider field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProvider

`func (o *Wallet) SetProvider(v string)`

SetProvider sets Provider field to given value.


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
