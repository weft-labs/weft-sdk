# EnrollResourceRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Kind** | **string** | Resource type. Determines which storefront and dashboard surfaces apply after claim.  | 
**Name** | **string** | Display name. Becomes the basis for the server-generated &#x60;slug&#x60;. | 
**Description** | Pointer to **string** | Optional human-readable description. | [optional] 
**WalletAddress** | Pointer to **string** | Optional Ethereum address declared at enrollment time. Stored as &#x60;declared_wallet_address&#x60; on the ghost Resource for later reconciliation; never used as the canonical Provider wallet.  | [optional] 

## Methods

### NewEnrollResourceRequest

`func NewEnrollResourceRequest(kind string, name string, ) *EnrollResourceRequest`

NewEnrollResourceRequest instantiates a new EnrollResourceRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewEnrollResourceRequestWithDefaults

`func NewEnrollResourceRequestWithDefaults() *EnrollResourceRequest`

NewEnrollResourceRequestWithDefaults instantiates a new EnrollResourceRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKind

`func (o *EnrollResourceRequest) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *EnrollResourceRequest) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *EnrollResourceRequest) SetKind(v string)`

SetKind sets Kind field to given value.


### GetName

`func (o *EnrollResourceRequest) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *EnrollResourceRequest) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *EnrollResourceRequest) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *EnrollResourceRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *EnrollResourceRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *EnrollResourceRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *EnrollResourceRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetWalletAddress

`func (o *EnrollResourceRequest) GetWalletAddress() string`

GetWalletAddress returns the WalletAddress field if non-nil, zero value otherwise.

### GetWalletAddressOk

`func (o *EnrollResourceRequest) GetWalletAddressOk() (*string, bool)`

GetWalletAddressOk returns a tuple with the WalletAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWalletAddress

`func (o *EnrollResourceRequest) SetWalletAddress(v string)`

SetWalletAddress sets WalletAddress field to given value.

### HasWalletAddress

`func (o *EnrollResourceRequest) HasWalletAddress() bool`

HasWalletAddress returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


