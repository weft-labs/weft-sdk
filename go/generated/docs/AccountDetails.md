# AccountDetails

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**Email** | **string** |  | 
**Status** | **string** |  | 
**DisplayName** | Pointer to **string** |  | [optional] 
**PublicProfile** | **bool** |  | 
**PublicSlug** | Pointer to **string** |  | [optional] 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewAccountDetails

`func NewAccountDetails(id int32, email string, status string, publicProfile bool, createdAt time.Time, ) *AccountDetails`

NewAccountDetails instantiates a new AccountDetails object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountDetailsWithDefaults

`func NewAccountDetailsWithDefaults() *AccountDetails`

NewAccountDetailsWithDefaults instantiates a new AccountDetails object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *AccountDetails) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *AccountDetails) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *AccountDetails) SetId(v int32)`

SetId sets Id field to given value.


### GetEmail

`func (o *AccountDetails) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *AccountDetails) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *AccountDetails) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetStatus

`func (o *AccountDetails) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *AccountDetails) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *AccountDetails) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetDisplayName

`func (o *AccountDetails) GetDisplayName() string`

GetDisplayName returns the DisplayName field if non-nil, zero value otherwise.

### GetDisplayNameOk

`func (o *AccountDetails) GetDisplayNameOk() (*string, bool)`

GetDisplayNameOk returns a tuple with the DisplayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDisplayName

`func (o *AccountDetails) SetDisplayName(v string)`

SetDisplayName sets DisplayName field to given value.

### HasDisplayName

`func (o *AccountDetails) HasDisplayName() bool`

HasDisplayName returns a boolean if a field has been set.

### GetPublicProfile

`func (o *AccountDetails) GetPublicProfile() bool`

GetPublicProfile returns the PublicProfile field if non-nil, zero value otherwise.

### GetPublicProfileOk

`func (o *AccountDetails) GetPublicProfileOk() (*bool, bool)`

GetPublicProfileOk returns a tuple with the PublicProfile field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPublicProfile

`func (o *AccountDetails) SetPublicProfile(v bool)`

SetPublicProfile sets PublicProfile field to given value.


### GetPublicSlug

`func (o *AccountDetails) GetPublicSlug() string`

GetPublicSlug returns the PublicSlug field if non-nil, zero value otherwise.

### GetPublicSlugOk

`func (o *AccountDetails) GetPublicSlugOk() (*string, bool)`

GetPublicSlugOk returns a tuple with the PublicSlug field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPublicSlug

`func (o *AccountDetails) SetPublicSlug(v string)`

SetPublicSlug sets PublicSlug field to given value.

### HasPublicSlug

`func (o *AccountDetails) HasPublicSlug() bool`

HasPublicSlug returns a boolean if a field has been set.

### GetCreatedAt

`func (o *AccountDetails) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *AccountDetails) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *AccountDetails) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


