# AuthResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | [**AuthResponseData**](AuthResponseData.md) |  | 

## Methods

### NewAuthResponse

`func NewAuthResponse(data AuthResponseData, ) *AuthResponse`

NewAuthResponse instantiates a new AuthResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAuthResponseWithDefaults

`func NewAuthResponseWithDefaults() *AuthResponse`

NewAuthResponseWithDefaults instantiates a new AuthResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *AuthResponse) GetData() AuthResponseData`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *AuthResponse) GetDataOk() (*AuthResponseData, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *AuthResponse) SetData(v AuthResponseData)`

SetData sets Data field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


