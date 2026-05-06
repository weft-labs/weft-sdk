# EnrolledResource

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
**ClaimToken** | **string** | Single-use token. ~256 bits of entropy. Surfaced exactly once, in this response. Used to claim the Resource at &#x60;/dashboard/claims/{claim_token}&#x60;.  | 
**ClaimUrl** | **string** | Absolute path the agent&#39;s human controller visits to claim the Resource. | 

## Methods

### NewEnrolledResource

`func NewEnrolledResource(id int32, kind string, name string, slug string, visibility string, verified bool, claimed bool, createdAt time.Time, claimToken string, claimUrl string, ) *EnrolledResource`

NewEnrolledResource instantiates a new EnrolledResource object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewEnrolledResourceWithDefaults

`func NewEnrolledResourceWithDefaults() *EnrolledResource`

NewEnrolledResourceWithDefaults instantiates a new EnrolledResource object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *EnrolledResource) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *EnrolledResource) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *EnrolledResource) SetId(v int32)`

SetId sets Id field to given value.


### GetKind

`func (o *EnrolledResource) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *EnrolledResource) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *EnrolledResource) SetKind(v string)`

SetKind sets Kind field to given value.


### GetName

`func (o *EnrolledResource) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *EnrolledResource) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *EnrolledResource) SetName(v string)`

SetName sets Name field to given value.


### GetSlug

`func (o *EnrolledResource) GetSlug() string`

GetSlug returns the Slug field if non-nil, zero value otherwise.

### GetSlugOk

`func (o *EnrolledResource) GetSlugOk() (*string, bool)`

GetSlugOk returns a tuple with the Slug field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlug

`func (o *EnrolledResource) SetSlug(v string)`

SetSlug sets Slug field to given value.


### GetDescription

`func (o *EnrolledResource) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *EnrolledResource) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *EnrolledResource) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *EnrolledResource) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetWalletAddress

`func (o *EnrolledResource) GetWalletAddress() string`

GetWalletAddress returns the WalletAddress field if non-nil, zero value otherwise.

### GetWalletAddressOk

`func (o *EnrolledResource) GetWalletAddressOk() (*string, bool)`

GetWalletAddressOk returns a tuple with the WalletAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWalletAddress

`func (o *EnrolledResource) SetWalletAddress(v string)`

SetWalletAddress sets WalletAddress field to given value.

### HasWalletAddress

`func (o *EnrolledResource) HasWalletAddress() bool`

HasWalletAddress returns a boolean if a field has been set.

### GetCategory

`func (o *EnrolledResource) GetCategory() string`

GetCategory returns the Category field if non-nil, zero value otherwise.

### GetCategoryOk

`func (o *EnrolledResource) GetCategoryOk() (*string, bool)`

GetCategoryOk returns a tuple with the Category field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCategory

`func (o *EnrolledResource) SetCategory(v string)`

SetCategory sets Category field to given value.

### HasCategory

`func (o *EnrolledResource) HasCategory() bool`

HasCategory returns a boolean if a field has been set.

### GetVisibility

`func (o *EnrolledResource) GetVisibility() string`

GetVisibility returns the Visibility field if non-nil, zero value otherwise.

### GetVisibilityOk

`func (o *EnrolledResource) GetVisibilityOk() (*string, bool)`

GetVisibilityOk returns a tuple with the Visibility field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVisibility

`func (o *EnrolledResource) SetVisibility(v string)`

SetVisibility sets Visibility field to given value.


### GetVerified

`func (o *EnrolledResource) GetVerified() bool`

GetVerified returns the Verified field if non-nil, zero value otherwise.

### GetVerifiedOk

`func (o *EnrolledResource) GetVerifiedOk() (*bool, bool)`

GetVerifiedOk returns a tuple with the Verified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVerified

`func (o *EnrolledResource) SetVerified(v bool)`

SetVerified sets Verified field to given value.


### GetClaimed

`func (o *EnrolledResource) GetClaimed() bool`

GetClaimed returns the Claimed field if non-nil, zero value otherwise.

### GetClaimedOk

`func (o *EnrolledResource) GetClaimedOk() (*bool, bool)`

GetClaimedOk returns a tuple with the Claimed field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetClaimed

`func (o *EnrolledResource) SetClaimed(v bool)`

SetClaimed sets Claimed field to given value.


### GetCreatedAt

`func (o *EnrolledResource) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *EnrolledResource) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *EnrolledResource) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.


### GetClaimToken

`func (o *EnrolledResource) GetClaimToken() string`

GetClaimToken returns the ClaimToken field if non-nil, zero value otherwise.

### GetClaimTokenOk

`func (o *EnrolledResource) GetClaimTokenOk() (*string, bool)`

GetClaimTokenOk returns a tuple with the ClaimToken field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetClaimToken

`func (o *EnrolledResource) SetClaimToken(v string)`

SetClaimToken sets ClaimToken field to given value.


### GetClaimUrl

`func (o *EnrolledResource) GetClaimUrl() string`

GetClaimUrl returns the ClaimUrl field if non-nil, zero value otherwise.

### GetClaimUrlOk

`func (o *EnrolledResource) GetClaimUrlOk() (*string, bool)`

GetClaimUrlOk returns a tuple with the ClaimUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetClaimUrl

`func (o *EnrolledResource) SetClaimUrl(v string)`

SetClaimUrl sets ClaimUrl field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


