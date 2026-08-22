# SearchMethodFilter

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Eq** | Pointer to **string** |  | [optional]
**In** | Pointer to **[]string** |  | [optional]

## Methods

### NewSearchMethodFilter

`func NewSearchMethodFilter() *SearchMethodFilter`

NewSearchMethodFilter instantiates a new SearchMethodFilter object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchMethodFilterWithDefaults

`func NewSearchMethodFilterWithDefaults() *SearchMethodFilter`

NewSearchMethodFilterWithDefaults instantiates a new SearchMethodFilter object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEq

`func (o *SearchMethodFilter) GetEq() string`

GetEq returns the Eq field if non-nil, zero value otherwise.

### GetEqOk

`func (o *SearchMethodFilter) GetEqOk() (*string, bool)`

GetEqOk returns a tuple with the Eq field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEq

`func (o *SearchMethodFilter) SetEq(v string)`

SetEq sets Eq field to given value.

### HasEq

`func (o *SearchMethodFilter) HasEq() bool`

HasEq returns a boolean if a field has been set.

### GetIn

`func (o *SearchMethodFilter) GetIn() []string`

GetIn returns the In field if non-nil, zero value otherwise.

### GetInOk

`func (o *SearchMethodFilter) GetInOk() (*[]string, bool)`

GetInOk returns a tuple with the In field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIn

`func (o *SearchMethodFilter) SetIn(v []string)`

SetIn sets In field to given value.

### HasIn

`func (o *SearchMethodFilter) HasIn() bool`

HasIn returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
