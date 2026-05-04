# Resource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**Kind** | **string** |  | 
**Name** | **string** |  | 
**Slug** | **string** |  | 
**Description** | Pointer to **string** |  | [optional] 
**WalletAddress** | Pointer to **string** | Provider&#39;s wallet address; null while ghost (no Provider attached). | [optional] 
**Category** | Pointer to **string** | Domain category. Only populated for &#x60;kind: agent&#x60; Resources during the v3 → provider/resource transition; null for newer kinds.  | [optional] 
**Visibility** | **string** |  | 
**Verified** | **bool** |  | 
**Claimed** | **bool** | True when the Resource has a Provider attached. Ghost Resources (claimed&#x3D;false) are publicly discoverable but cannot be edited until a human claims them.  | 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewResource

`func NewResource(id int32, kind string, name string, slug string, visibility string, verified bool, claimed bool, createdAt time.Time, ) *Resource`

NewResource instantiates a new Resource object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewResourceWithDefaults

`func NewResourceWithDefaults() *Resource`

NewResourceWithDefaults instantiates a new Resource object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Resource) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Resource) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Resource) SetId(v int32)`

SetId sets Id field to given value.


### GetKind

`func (o *Resource) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *Resource) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *Resource) SetKind(v string)`

SetKind sets Kind field to given value.


### GetName

`func (o *Resource) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *Resource) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *Resource) SetName(v string)`

SetName sets Name field to given value.


### GetSlug

`func (o *Resource) GetSlug() string`

GetSlug returns the Slug field if non-nil, zero value otherwise.

### GetSlugOk

`func (o *Resource) GetSlugOk() (*string, bool)`

GetSlugOk returns a tuple with the Slug field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlug

`func (o *Resource) SetSlug(v string)`

SetSlug sets Slug field to given value.


### GetDescription

`func (o *Resource) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *Resource) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *Resource) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *Resource) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetWalletAddress

`func (o *Resource) GetWalletAddress() string`

GetWalletAddress returns the WalletAddress field if non-nil, zero value otherwise.

### GetWalletAddressOk

`func (o *Resource) GetWalletAddressOk() (*string, bool)`

GetWalletAddressOk returns a tuple with the WalletAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWalletAddress

`func (o *Resource) SetWalletAddress(v string)`

SetWalletAddress sets WalletAddress field to given value.

### HasWalletAddress

`func (o *Resource) HasWalletAddress() bool`

HasWalletAddress returns a boolean if a field has been set.

### GetCategory

`func (o *Resource) GetCategory() string`

GetCategory returns the Category field if non-nil, zero value otherwise.

### GetCategoryOk

`func (o *Resource) GetCategoryOk() (*string, bool)`

GetCategoryOk returns a tuple with the Category field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategory

`func (o *Resource) SetCategory(v string)`

SetCategory sets Category field to given value.

### HasCategory

`func (o *Resource) HasCategory() bool`

HasCategory returns a boolean if a field has been set.

### GetVisibility

`func (o *Resource) GetVisibility() string`

GetVisibility returns the Visibility field if non-nil, zero value otherwise.

### GetVisibilityOk

`func (o *Resource) GetVisibilityOk() (*string, bool)`

GetVisibilityOk returns a tuple with the Visibility field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVisibility

`func (o *Resource) SetVisibility(v string)`

SetVisibility sets Visibility field to given value.


### GetVerified

`func (o *Resource) GetVerified() bool`

GetVerified returns the Verified field if non-nil, zero value otherwise.

### GetVerifiedOk

`func (o *Resource) GetVerifiedOk() (*bool, bool)`

GetVerifiedOk returns a tuple with the Verified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVerified

`func (o *Resource) SetVerified(v bool)`

SetVerified sets Verified field to given value.


### GetClaimed

`func (o *Resource) GetClaimed() bool`

GetClaimed returns the Claimed field if non-nil, zero value otherwise.

### GetClaimedOk

`func (o *Resource) GetClaimedOk() (*bool, bool)`

GetClaimedOk returns a tuple with the Claimed field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetClaimed

`func (o *Resource) SetClaimed(v bool)`

SetClaimed sets Claimed field to given value.


### GetCreatedAt

`func (o *Resource) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *Resource) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *Resource) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


