# InsufficientScopeResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Error** | **string** |  | 
**ErrorDescription** | **string** |  | 
**Scope** | **string** | Space-delimited list of scopes the endpoint requires. | 

## Methods

### NewInsufficientScopeResponse

`func NewInsufficientScopeResponse(error_ string, errorDescription string, scope string, ) *InsufficientScopeResponse`

NewInsufficientScopeResponse instantiates a new InsufficientScopeResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewInsufficientScopeResponseWithDefaults

`func NewInsufficientScopeResponseWithDefaults() *InsufficientScopeResponse`

NewInsufficientScopeResponseWithDefaults instantiates a new InsufficientScopeResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetError

`func (o *InsufficientScopeResponse) GetError() string`

GetError returns the Error field if non-nil, zero value otherwise.

### GetErrorOk

`func (o *InsufficientScopeResponse) GetErrorOk() (*string, bool)`

GetErrorOk returns a tuple with the Error field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetError

`func (o *InsufficientScopeResponse) SetError(v string)`

SetError sets Error field to given value.


### GetErrorDescription

`func (o *InsufficientScopeResponse) GetErrorDescription() string`

GetErrorDescription returns the ErrorDescription field if non-nil, zero value otherwise.

### GetErrorDescriptionOk

`func (o *InsufficientScopeResponse) GetErrorDescriptionOk() (*string, bool)`

GetErrorDescriptionOk returns a tuple with the ErrorDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetErrorDescription

`func (o *InsufficientScopeResponse) SetErrorDescription(v string)`

SetErrorDescription sets ErrorDescription field to given value.


### GetScope

`func (o *InsufficientScopeResponse) GetScope() string`

GetScope returns the Scope field if non-nil, zero value otherwise.

### GetScopeOk

`func (o *InsufficientScopeResponse) GetScopeOk() (*string, bool)`

GetScopeOk returns a tuple with the Scope field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScope

`func (o *InsufficientScopeResponse) SetScope(v string)`

SetScope sets Scope field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


