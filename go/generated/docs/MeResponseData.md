# MeResponseData

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**PrincipalType** | **string** |  |
**Id** | **int32** |  |
**Name** | **string** |  |
**Slug** | **string** |  |
**Kind** | **string** |  |
**ApiKey** | [**MeApiKey**](MeApiKey.md) |  |
**Email** | **string** |  |
**DisplayName** | Pointer to **string** |  | [optional]
**Status** | **string** |  |
**BuyerEnabled** | **bool** |  |
**SellerEnabled** | **bool** |  |
**ProvisioningStatus** | **string** |  |
**Wallet** | [**PrincipalWallet**](PrincipalWallet.md) |  |

## Methods

### NewMeResponseData

`func NewMeResponseData(principalType string, id int32, name string, slug string, kind string, apiKey MeApiKey, email string, status string, buyerEnabled bool, sellerEnabled bool, provisioningStatus string, wallet PrincipalWallet, ) *MeResponseData`

NewMeResponseData instantiates a new MeResponseData object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMeResponseDataWithDefaults

`func NewMeResponseDataWithDefaults() *MeResponseData`

NewMeResponseDataWithDefaults instantiates a new MeResponseData object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetPrincipalType

`func (o *MeResponseData) GetPrincipalType() string`

GetPrincipalType returns the PrincipalType field if non-nil, zero value otherwise.

### GetPrincipalTypeOk

`func (o *MeResponseData) GetPrincipalTypeOk() (*string, bool)`

GetPrincipalTypeOk returns a tuple with the PrincipalType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrincipalType

`func (o *MeResponseData) SetPrincipalType(v string)`

SetPrincipalType sets PrincipalType field to given value.


### GetId

`func (o *MeResponseData) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *MeResponseData) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *MeResponseData) SetId(v int32)`

SetId sets Id field to given value.


### GetName

`func (o *MeResponseData) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MeResponseData) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MeResponseData) SetName(v string)`

SetName sets Name field to given value.


### GetSlug

`func (o *MeResponseData) GetSlug() string`

GetSlug returns the Slug field if non-nil, zero value otherwise.

### GetSlugOk

`func (o *MeResponseData) GetSlugOk() (*string, bool)`

GetSlugOk returns a tuple with the Slug field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlug

`func (o *MeResponseData) SetSlug(v string)`

SetSlug sets Slug field to given value.


### GetKind

`func (o *MeResponseData) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *MeResponseData) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *MeResponseData) SetKind(v string)`

SetKind sets Kind field to given value.


### GetApiKey

`func (o *MeResponseData) GetApiKey() MeApiKey`

GetApiKey returns the ApiKey field if non-nil, zero value otherwise.

### GetApiKeyOk

`func (o *MeResponseData) GetApiKeyOk() (*MeApiKey, bool)`

GetApiKeyOk returns a tuple with the ApiKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApiKey

`func (o *MeResponseData) SetApiKey(v MeApiKey)`

SetApiKey sets ApiKey field to given value.


### GetEmail

`func (o *MeResponseData) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *MeResponseData) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *MeResponseData) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetDisplayName

`func (o *MeResponseData) GetDisplayName() string`

GetDisplayName returns the DisplayName field if non-nil, zero value otherwise.

### GetDisplayNameOk

`func (o *MeResponseData) GetDisplayNameOk() (*string, bool)`

GetDisplayNameOk returns a tuple with the DisplayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDisplayName

`func (o *MeResponseData) SetDisplayName(v string)`

SetDisplayName sets DisplayName field to given value.

### HasDisplayName

`func (o *MeResponseData) HasDisplayName() bool`

HasDisplayName returns a boolean if a field has been set.

### GetStatus

`func (o *MeResponseData) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *MeResponseData) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *MeResponseData) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetBuyerEnabled

`func (o *MeResponseData) GetBuyerEnabled() bool`

GetBuyerEnabled returns the BuyerEnabled field if non-nil, zero value otherwise.

### GetBuyerEnabledOk

`func (o *MeResponseData) GetBuyerEnabledOk() (*bool, bool)`

GetBuyerEnabledOk returns a tuple with the BuyerEnabled field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBuyerEnabled

`func (o *MeResponseData) SetBuyerEnabled(v bool)`

SetBuyerEnabled sets BuyerEnabled field to given value.


### GetSellerEnabled

`func (o *MeResponseData) GetSellerEnabled() bool`

GetSellerEnabled returns the SellerEnabled field if non-nil, zero value otherwise.

### GetSellerEnabledOk

`func (o *MeResponseData) GetSellerEnabledOk() (*bool, bool)`

GetSellerEnabledOk returns a tuple with the SellerEnabled field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSellerEnabled

`func (o *MeResponseData) SetSellerEnabled(v bool)`

SetSellerEnabled sets SellerEnabled field to given value.


### GetProvisioningStatus

`func (o *MeResponseData) GetProvisioningStatus() string`

GetProvisioningStatus returns the ProvisioningStatus field if non-nil, zero value otherwise.

### GetProvisioningStatusOk

`func (o *MeResponseData) GetProvisioningStatusOk() (*string, bool)`

GetProvisioningStatusOk returns a tuple with the ProvisioningStatus field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProvisioningStatus

`func (o *MeResponseData) SetProvisioningStatus(v string)`

SetProvisioningStatus sets ProvisioningStatus field to given value.


### GetWallet

`func (o *MeResponseData) GetWallet() PrincipalWallet`

GetWallet returns the Wallet field if non-nil, zero value otherwise.

### GetWalletOk

`func (o *MeResponseData) GetWalletOk() (*PrincipalWallet, bool)`

GetWalletOk returns a tuple with the Wallet field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWallet

`func (o *MeResponseData) SetWallet(v PrincipalWallet)`

SetWallet sets Wallet field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
