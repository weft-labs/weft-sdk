# AccountDetails

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**Name** | **string** |  | 
**Slug** | **string** |  | 
**Kind** | **string** |  | 
**ApiKey** | [**MeApiKey**](MeApiKey.md) |  | 

## Methods

### NewAccountDetails

`func NewAccountDetails(id int32, name string, slug string, kind string, apiKey MeApiKey, ) *AccountDetails`

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


### GetName

`func (o *AccountDetails) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *AccountDetails) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *AccountDetails) SetName(v string)`

SetName sets Name field to given value.


### GetSlug

`func (o *AccountDetails) GetSlug() string`

GetSlug returns the Slug field if non-nil, zero value otherwise.

### GetSlugOk

`func (o *AccountDetails) GetSlugOk() (*string, bool)`

GetSlugOk returns a tuple with the Slug field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSlug

`func (o *AccountDetails) SetSlug(v string)`

SetSlug sets Slug field to given value.


### GetKind

`func (o *AccountDetails) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *AccountDetails) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *AccountDetails) SetKind(v string)`

SetKind sets Kind field to given value.


### GetApiKey

`func (o *AccountDetails) GetApiKey() MeApiKey`

GetApiKey returns the ApiKey field if non-nil, zero value otherwise.

### GetApiKeyOk

`func (o *AccountDetails) GetApiKeyOk() (*MeApiKey, bool)`

GetApiKeyOk returns a tuple with the ApiKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApiKey

`func (o *AccountDetails) SetApiKey(v MeApiKey)`

SetApiKey sets ApiKey field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


