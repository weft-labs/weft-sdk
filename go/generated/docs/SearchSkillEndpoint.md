# SearchSkillEndpoint

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Method** | Pointer to **string** | HTTP method or &#x60;WEBSOCKET&#x60; for streaming skills. | [optional] 
**Path** | Pointer to **string** |  | [optional] 

## Methods

### NewSearchSkillEndpoint

`func NewSearchSkillEndpoint() *SearchSkillEndpoint`

NewSearchSkillEndpoint instantiates a new SearchSkillEndpoint object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchSkillEndpointWithDefaults

`func NewSearchSkillEndpointWithDefaults() *SearchSkillEndpoint`

NewSearchSkillEndpointWithDefaults instantiates a new SearchSkillEndpoint object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMethod

`func (o *SearchSkillEndpoint) GetMethod() string`

GetMethod returns the Method field if non-nil, zero value otherwise.

### GetMethodOk

`func (o *SearchSkillEndpoint) GetMethodOk() (*string, bool)`

GetMethodOk returns a tuple with the Method field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMethod

`func (o *SearchSkillEndpoint) SetMethod(v string)`

SetMethod sets Method field to given value.

### HasMethod

`func (o *SearchSkillEndpoint) HasMethod() bool`

HasMethod returns a boolean if a field has been set.

### GetPath

`func (o *SearchSkillEndpoint) GetPath() string`

GetPath returns the Path field if non-nil, zero value otherwise.

### GetPathOk

`func (o *SearchSkillEndpoint) GetPathOk() (*string, bool)`

GetPathOk returns a tuple with the Path field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPath

`func (o *SearchSkillEndpoint) SetPath(v string)`

SetPath sets Path field to given value.

### HasPath

`func (o *SearchSkillEndpoint) HasPath() bool`

HasPath returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


