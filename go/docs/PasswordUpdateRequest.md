# PasswordUpdateRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ResetPasswordToken** | **string** |  | 
**Password** | **string** |  | 
**PasswordConfirmation** | **string** |  | 

## Methods

### NewPasswordUpdateRequest

`func NewPasswordUpdateRequest(resetPasswordToken string, password string, passwordConfirmation string, ) *PasswordUpdateRequest`

NewPasswordUpdateRequest instantiates a new PasswordUpdateRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPasswordUpdateRequestWithDefaults

`func NewPasswordUpdateRequestWithDefaults() *PasswordUpdateRequest`

NewPasswordUpdateRequestWithDefaults instantiates a new PasswordUpdateRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetResetPasswordToken

`func (o *PasswordUpdateRequest) GetResetPasswordToken() string`

GetResetPasswordToken returns the ResetPasswordToken field if non-nil, zero value otherwise.

### GetResetPasswordTokenOk

`func (o *PasswordUpdateRequest) GetResetPasswordTokenOk() (*string, bool)`

GetResetPasswordTokenOk returns a tuple with the ResetPasswordToken field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResetPasswordToken

`func (o *PasswordUpdateRequest) SetResetPasswordToken(v string)`

SetResetPasswordToken sets ResetPasswordToken field to given value.


### GetPassword

`func (o *PasswordUpdateRequest) GetPassword() string`

GetPassword returns the Password field if non-nil, zero value otherwise.

### GetPasswordOk

`func (o *PasswordUpdateRequest) GetPasswordOk() (*string, bool)`

GetPasswordOk returns a tuple with the Password field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPassword

`func (o *PasswordUpdateRequest) SetPassword(v string)`

SetPassword sets Password field to given value.


### GetPasswordConfirmation

`func (o *PasswordUpdateRequest) GetPasswordConfirmation() string`

GetPasswordConfirmation returns the PasswordConfirmation field if non-nil, zero value otherwise.

### GetPasswordConfirmationOk

`func (o *PasswordUpdateRequest) GetPasswordConfirmationOk() (*string, bool)`

GetPasswordConfirmationOk returns a tuple with the PasswordConfirmation field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPasswordConfirmation

`func (o *PasswordUpdateRequest) SetPasswordConfirmation(v string)`

SetPasswordConfirmation sets PasswordConfirmation field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


