# RateLimitResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Error** | **string** |  |
**ErrorDescription** | **string** |  |

## Methods

### NewRateLimitResponse

`func NewRateLimitResponse(error_ string, errorDescription string, ) *RateLimitResponse`

NewRateLimitResponse instantiates a new RateLimitResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewRateLimitResponseWithDefaults

`func NewRateLimitResponseWithDefaults() *RateLimitResponse`

NewRateLimitResponseWithDefaults instantiates a new RateLimitResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetError

`func (o *RateLimitResponse) GetError() string`

GetError returns the Error field if non-nil, zero value otherwise.

### GetErrorOk

`func (o *RateLimitResponse) GetErrorOk() (*string, bool)`

GetErrorOk returns a tuple with the Error field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetError

`func (o *RateLimitResponse) SetError(v string)`

SetError sets Error field to given value.


### GetErrorDescription

`func (o *RateLimitResponse) GetErrorDescription() string`

GetErrorDescription returns the ErrorDescription field if non-nil, zero value otherwise.

### GetErrorDescriptionOk

`func (o *RateLimitResponse) GetErrorDescriptionOk() (*string, bool)`

GetErrorDescriptionOk returns a tuple with the ErrorDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetErrorDescription

`func (o *RateLimitResponse) SetErrorDescription(v string)`

SetErrorDescription sets ErrorDescription field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
