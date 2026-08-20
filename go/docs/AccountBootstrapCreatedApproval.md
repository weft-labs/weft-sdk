# AccountBootstrapCreatedApproval

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Method** | **string** |  |
**ExpiresIn** | **int32** |  |
**Interval** | **int32** | Minimum OAuth device-token polling interval in seconds. |
**UserCode** | **string** | Show this code to the human; approval requires a matching normalized code. |

## Methods

### NewAccountBootstrapCreatedApproval

`func NewAccountBootstrapCreatedApproval(method string, expiresIn int32, interval int32, userCode string, ) *AccountBootstrapCreatedApproval`

NewAccountBootstrapCreatedApproval instantiates a new AccountBootstrapCreatedApproval object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountBootstrapCreatedApprovalWithDefaults

`func NewAccountBootstrapCreatedApprovalWithDefaults() *AccountBootstrapCreatedApproval`

NewAccountBootstrapCreatedApprovalWithDefaults instantiates a new AccountBootstrapCreatedApproval object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMethod

`func (o *AccountBootstrapCreatedApproval) GetMethod() string`

GetMethod returns the Method field if non-nil, zero value otherwise.

### GetMethodOk

`func (o *AccountBootstrapCreatedApproval) GetMethodOk() (*string, bool)`

GetMethodOk returns a tuple with the Method field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMethod

`func (o *AccountBootstrapCreatedApproval) SetMethod(v string)`

SetMethod sets Method field to given value.


### GetExpiresIn

`func (o *AccountBootstrapCreatedApproval) GetExpiresIn() int32`

GetExpiresIn returns the ExpiresIn field if non-nil, zero value otherwise.

### GetExpiresInOk

`func (o *AccountBootstrapCreatedApproval) GetExpiresInOk() (*int32, bool)`

GetExpiresInOk returns a tuple with the ExpiresIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresIn

`func (o *AccountBootstrapCreatedApproval) SetExpiresIn(v int32)`

SetExpiresIn sets ExpiresIn field to given value.


### GetInterval

`func (o *AccountBootstrapCreatedApproval) GetInterval() int32`

GetInterval returns the Interval field if non-nil, zero value otherwise.

### GetIntervalOk

`func (o *AccountBootstrapCreatedApproval) GetIntervalOk() (*int32, bool)`

GetIntervalOk returns a tuple with the Interval field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInterval

`func (o *AccountBootstrapCreatedApproval) SetInterval(v int32)`

SetInterval sets Interval field to given value.


### GetUserCode

`func (o *AccountBootstrapCreatedApproval) GetUserCode() string`

GetUserCode returns the UserCode field if non-nil, zero value otherwise.

### GetUserCodeOk

`func (o *AccountBootstrapCreatedApproval) GetUserCodeOk() (*string, bool)`

GetUserCodeOk returns a tuple with the UserCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUserCode

`func (o *AccountBootstrapCreatedApproval) SetUserCode(v string)`

SetUserCode sets UserCode field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
