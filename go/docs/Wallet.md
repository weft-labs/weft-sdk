# Wallet

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Address** | **string** | EVM address of the buyer&#39;s Privy-managed wallet. Null if no wallet provisioned. | 
**BalanceUsdc** | **string** | Live USDC balance, 2dp. Returns \&quot;0.00\&quot; if the upstream wallet provider is unreachable. | 
**Network** | **string** | Wallet network (e.g. &#x60;base-sepolia&#x60;). | 

## Methods

### NewWallet

`func NewWallet(address string, balanceUsdc string, network string, ) *Wallet`

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


