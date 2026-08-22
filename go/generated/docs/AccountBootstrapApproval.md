# AccountBootstrapApproval

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Method** | **string** |  |
**ExpiresIn** | **int32** |  |
**Interval** | **int32** | Minimum status polling interval in seconds. |

## Methods

### NewAccountBootstrapApproval

`func NewAccountBootstrapApproval(method string, expiresIn int32, interval int32, ) *AccountBootstrapApproval`

NewAccountBootstrapApproval instantiates a new AccountBootstrapApproval object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountBootstrapApprovalWithDefaults

`func NewAccountBootstrapApprovalWithDefaults() *AccountBootstrapApproval`

NewAccountBootstrapApprovalWithDefaults instantiates a new AccountBootstrapApproval object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMethod

`func (o *AccountBootstrapApproval) GetMethod() string`

GetMethod returns the Method field if non-nil, zero value otherwise.

### GetMethodOk

`func (o *AccountBootstrapApproval) GetMethodOk() (*string, bool)`

GetMethodOk returns a tuple with the Method field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMethod

`func (o *AccountBootstrapApproval) SetMethod(v string)`

SetMethod sets Method field to given value.


### GetExpiresIn

`func (o *AccountBootstrapApproval) GetExpiresIn() int32`

GetExpiresIn returns the ExpiresIn field if non-nil, zero value otherwise.

### GetExpiresInOk

`func (o *AccountBootstrapApproval) GetExpiresInOk() (*int32, bool)`

GetExpiresInOk returns a tuple with the ExpiresIn field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresIn

`func (o *AccountBootstrapApproval) SetExpiresIn(v int32)`

SetExpiresIn sets ExpiresIn field to given value.


### GetInterval

`func (o *AccountBootstrapApproval) GetInterval() int32`

GetInterval returns the Interval field if non-nil, zero value otherwise.

### GetIntervalOk

`func (o *AccountBootstrapApproval) GetIntervalOk() (*int32, bool)`

GetIntervalOk returns a tuple with the Interval field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInterval

`func (o *AccountBootstrapApproval) SetInterval(v int32)`

SetInterval sets Interval field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
