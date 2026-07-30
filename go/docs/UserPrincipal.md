# UserPrincipal

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PrincipalType** | **string** |  |
**Id** | **int32** |  |
**Email** | **string** |  |
**DisplayName** | Pointer to **string** |  | [optional]
**Status** | **string** |  |
**BuyerEnabled** | **bool** |  |
**SellerEnabled** | **bool** |  |
**ProvisioningStatus** | **string** |  |
**Wallet** | [**NullablePrincipalWallet**](PrincipalWallet.md) |  |

## Methods

### NewUserPrincipal

`func NewUserPrincipal(principalType string, id int32, email string, status string, buyerEnabled bool, sellerEnabled bool, provisioningStatus string, wallet NullablePrincipalWallet, ) *UserPrincipal`

NewUserPrincipal instantiates a new UserPrincipal object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewUserPrincipalWithDefaults

`func NewUserPrincipalWithDefaults() *UserPrincipal`

NewUserPrincipalWithDefaults instantiates a new UserPrincipal object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPrincipalType

`func (o *UserPrincipal) GetPrincipalType() string`

GetPrincipalType returns the PrincipalType field if non-nil, zero value otherwise.

### GetPrincipalTypeOk

`func (o *UserPrincipal) GetPrincipalTypeOk() (*string, bool)`

GetPrincipalTypeOk returns a tuple with the PrincipalType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrincipalType

`func (o *UserPrincipal) SetPrincipalType(v string)`

SetPrincipalType sets PrincipalType field to given value.


### GetId

`func (o *UserPrincipal) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *UserPrincipal) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *UserPrincipal) SetId(v int32)`

SetId sets Id field to given value.


### GetEmail

`func (o *UserPrincipal) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *UserPrincipal) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *UserPrincipal) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetDisplayName

`func (o *UserPrincipal) GetDisplayName() string`

GetDisplayName returns the DisplayName field if non-nil, zero value otherwise.

### GetDisplayNameOk

`func (o *UserPrincipal) GetDisplayNameOk() (*string, bool)`

GetDisplayNameOk returns a tuple with the DisplayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDisplayName

`func (o *UserPrincipal) SetDisplayName(v string)`

SetDisplayName sets DisplayName field to given value.

### HasDisplayName

`func (o *UserPrincipal) HasDisplayName() bool`

HasDisplayName returns a boolean if a field has been set.

### GetStatus

`func (o *UserPrincipal) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *UserPrincipal) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *UserPrincipal) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetBuyerEnabled

`func (o *UserPrincipal) GetBuyerEnabled() bool`

GetBuyerEnabled returns the BuyerEnabled field if non-nil, zero value otherwise.

### GetBuyerEnabledOk

`func (o *UserPrincipal) GetBuyerEnabledOk() (*bool, bool)`

GetBuyerEnabledOk returns a tuple with the BuyerEnabled field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBuyerEnabled

`func (o *UserPrincipal) SetBuyerEnabled(v bool)`

SetBuyerEnabled sets BuyerEnabled field to given value.


### GetSellerEnabled

`func (o *UserPrincipal) GetSellerEnabled() bool`

GetSellerEnabled returns the SellerEnabled field if non-nil, zero value otherwise.

### GetSellerEnabledOk

`func (o *UserPrincipal) GetSellerEnabledOk() (*bool, bool)`

GetSellerEnabledOk returns a tuple with the SellerEnabled field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSellerEnabled

`func (o *UserPrincipal) SetSellerEnabled(v bool)`

SetSellerEnabled sets SellerEnabled field to given value.


### GetProvisioningStatus

`func (o *UserPrincipal) GetProvisioningStatus() string`

GetProvisioningStatus returns the ProvisioningStatus field if non-nil, zero value otherwise.

### GetProvisioningStatusOk

`func (o *UserPrincipal) GetProvisioningStatusOk() (*string, bool)`

GetProvisioningStatusOk returns a tuple with the ProvisioningStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProvisioningStatus

`func (o *UserPrincipal) SetProvisioningStatus(v string)`

SetProvisioningStatus sets ProvisioningStatus field to given value.


### GetWallet

`func (o *UserPrincipal) GetWallet() PrincipalWallet`

GetWallet returns the Wallet field if non-nil, zero value otherwise.

### GetWalletOk

`func (o *UserPrincipal) GetWalletOk() (*PrincipalWallet, bool)`

GetWalletOk returns a tuple with the Wallet field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWallet

`func (o *UserPrincipal) SetWallet(v PrincipalWallet)`

SetWallet sets Wallet field to given value.


### SetWalletNil

`func (o *UserPrincipal) SetWalletNil(b bool)`

 SetWalletNil sets the value for Wallet to be an explicit nil

### UnsetWallet
`func (o *UserPrincipal) UnsetWallet()`

UnsetWallet ensures that no value is present for Wallet, not even an explicit nil

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
