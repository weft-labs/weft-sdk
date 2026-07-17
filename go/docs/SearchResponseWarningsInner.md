# SearchResponseWarningsInner

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Code** | **string** |  | 
**Message** | **string** |  | 
**Cause** | Pointer to **string** | Typed cause for codes that carry one (e.g. &#x60;DECOMPOSE_FALLBACK&#x60;). Null otherwise. | [optional] 
**Context** | Pointer to **map[string]interface{}** | Structured context for the warning. Null when the code carries none. | [optional] 

## Methods

### NewSearchResponseWarningsInner

`func NewSearchResponseWarningsInner(code string, message string, ) *SearchResponseWarningsInner`

NewSearchResponseWarningsInner instantiates a new SearchResponseWarningsInner object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchResponseWarningsInnerWithDefaults

`func NewSearchResponseWarningsInnerWithDefaults() *SearchResponseWarningsInner`

NewSearchResponseWarningsInnerWithDefaults instantiates a new SearchResponseWarningsInner object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCode

`func (o *SearchResponseWarningsInner) GetCode() string`

GetCode returns the Code field if non-nil, zero value otherwise.

### GetCodeOk

`func (o *SearchResponseWarningsInner) GetCodeOk() (*string, bool)`

GetCodeOk returns a tuple with the Code field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCode

`func (o *SearchResponseWarningsInner) SetCode(v string)`

SetCode sets Code field to given value.


### GetMessage

`func (o *SearchResponseWarningsInner) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SearchResponseWarningsInner) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SearchResponseWarningsInner) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetCause

`func (o *SearchResponseWarningsInner) GetCause() string`

GetCause returns the Cause field if non-nil, zero value otherwise.

### GetCauseOk

`func (o *SearchResponseWarningsInner) GetCauseOk() (*string, bool)`

GetCauseOk returns a tuple with the Cause field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCause

`func (o *SearchResponseWarningsInner) SetCause(v string)`

SetCause sets Cause field to given value.

### HasCause

`func (o *SearchResponseWarningsInner) HasCause() bool`

HasCause returns a boolean if a field has been set.

### GetContext

`func (o *SearchResponseWarningsInner) GetContext() map[string]interface{}`

GetContext returns the Context field if non-nil, zero value otherwise.

### GetContextOk

`func (o *SearchResponseWarningsInner) GetContextOk() (*map[string]interface{}, bool)`

GetContextOk returns a tuple with the Context field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetContext

`func (o *SearchResponseWarningsInner) SetContext(v map[string]interface{})`

SetContext sets Context field to given value.

### HasContext

`func (o *SearchResponseWarningsInner) HasContext() bool`

HasContext returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


