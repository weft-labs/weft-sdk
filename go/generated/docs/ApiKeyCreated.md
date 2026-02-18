# ApiKeyCreated

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**Name** | Pointer to **string** |  | [optional] 
**KeyPrefix** | **string** |  | 
**RawKey** | **string** | Full API key (shown only once at creation) | 
**CreatedAt** | **time.Time** |  | 

## Methods

### NewApiKeyCreated

`func NewApiKeyCreated(id int32, keyPrefix string, rawKey string, createdAt time.Time, ) *ApiKeyCreated`

NewApiKeyCreated instantiates a new ApiKeyCreated object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewApiKeyCreatedWithDefaults

`func NewApiKeyCreatedWithDefaults() *ApiKeyCreated`

NewApiKeyCreatedWithDefaults instantiates a new ApiKeyCreated object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *ApiKeyCreated) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *ApiKeyCreated) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *ApiKeyCreated) SetId(v int32)`

SetId sets Id field to given value.


### GetName

`func (o *ApiKeyCreated) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *ApiKeyCreated) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *ApiKeyCreated) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *ApiKeyCreated) HasName() bool`

HasName returns a boolean if a field has been set.

### GetKeyPrefix

`func (o *ApiKeyCreated) GetKeyPrefix() string`

GetKeyPrefix returns the KeyPrefix field if non-nil, zero value otherwise.

### GetKeyPrefixOk

`func (o *ApiKeyCreated) GetKeyPrefixOk() (*string, bool)`

GetKeyPrefixOk returns a tuple with the KeyPrefix field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKeyPrefix

`func (o *ApiKeyCreated) SetKeyPrefix(v string)`

SetKeyPrefix sets KeyPrefix field to given value.


### GetRawKey

`func (o *ApiKeyCreated) GetRawKey() string`

GetRawKey returns the RawKey field if non-nil, zero value otherwise.

### GetRawKeyOk

`func (o *ApiKeyCreated) GetRawKeyOk() (*string, bool)`

GetRawKeyOk returns a tuple with the RawKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRawKey

`func (o *ApiKeyCreated) SetRawKey(v string)`

SetRawKey sets RawKey field to given value.


### GetCreatedAt

`func (o *ApiKeyCreated) GetCreatedAt() time.Time`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *ApiKeyCreated) GetCreatedAtOk() (*time.Time, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *ApiKeyCreated) SetCreatedAt(v time.Time)`

SetCreatedAt sets CreatedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


