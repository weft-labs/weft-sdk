# PrincipalWallet

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Address** | **string** |  |
**Network** | **string** |  |

## Methods

### NewPrincipalWallet

`func NewPrincipalWallet(address string, network string, ) *PrincipalWallet`

NewPrincipalWallet instantiates a new PrincipalWallet object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPrincipalWalletWithDefaults

`func NewPrincipalWalletWithDefaults() *PrincipalWallet`

NewPrincipalWalletWithDefaults instantiates a new PrincipalWallet object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddress

`func (o *PrincipalWallet) GetAddress() string`

GetAddress returns the Address field if non-nil, zero value otherwise.

### GetAddressOk

`func (o *PrincipalWallet) GetAddressOk() (*string, bool)`

GetAddressOk returns a tuple with the Address field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddress

`func (o *PrincipalWallet) SetAddress(v string)`

SetAddress sets Address field to given value.


### GetNetwork

`func (o *PrincipalWallet) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *PrincipalWallet) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *PrincipalWallet) SetNetwork(v string)`

SetNetwork sets Network field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
