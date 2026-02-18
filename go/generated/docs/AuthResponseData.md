# AuthResponseData

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**User** | [**User**](User.md) |  | 
**Token** | Pointer to **string** |  | [optional] 
**ConfirmationRequired** | **bool** |  | 

## Methods

### NewAuthResponseData

`func NewAuthResponseData(user User, confirmationRequired bool, ) *AuthResponseData`

NewAuthResponseData instantiates a new AuthResponseData object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAuthResponseDataWithDefaults

`func NewAuthResponseDataWithDefaults() *AuthResponseData`

NewAuthResponseDataWithDefaults instantiates a new AuthResponseData object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUser

`func (o *AuthResponseData) GetUser() User`

GetUser returns the User field if non-nil, zero value otherwise.

### GetUserOk

`func (o *AuthResponseData) GetUserOk() (*User, bool)`

GetUserOk returns a tuple with the User field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUser

`func (o *AuthResponseData) SetUser(v User)`

SetUser sets User field to given value.


### GetToken

`func (o *AuthResponseData) GetToken() string`

GetToken returns the Token field if non-nil, zero value otherwise.

### GetTokenOk

`func (o *AuthResponseData) GetTokenOk() (*string, bool)`

GetTokenOk returns a tuple with the Token field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetToken

`func (o *AuthResponseData) SetToken(v string)`

SetToken sets Token field to given value.

### HasToken

`func (o *AuthResponseData) HasToken() bool`

HasToken returns a boolean if a field has been set.

### GetConfirmationRequired

`func (o *AuthResponseData) GetConfirmationRequired() bool`

GetConfirmationRequired returns the ConfirmationRequired field if non-nil, zero value otherwise.

### GetConfirmationRequiredOk

`func (o *AuthResponseData) GetConfirmationRequiredOk() (*bool, bool)`

GetConfirmationRequiredOk returns a tuple with the ConfirmationRequired field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetConfirmationRequired

`func (o *AuthResponseData) SetConfirmationRequired(v bool)`

SetConfirmationRequired sets ConfirmationRequired field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


