# SearchSkill

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | Pointer to **string** |  | [optional] 
**Name** | Pointer to **string** |  | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**Tags** | Pointer to **[]string** |  | [optional] 
**Examples** | Pointer to **[]string** |  | [optional] 
**InputModes** | Pointer to **[]string** |  | [optional] 
**OutputModes** | Pointer to **[]string** |  | [optional] 
**Streaming** | Pointer to **bool** | True for skills that require streaming transport (e.g. websockets). Streaming skills are filtered out of results by default so non-streaming clients only see callable skills.  | [optional] 
**Endpoint** | Pointer to [**SearchSkillEndpoint**](SearchSkillEndpoint.md) |  | [optional] 
**PriceUsd** | Pointer to **string** | Per-call price in USD for this individual skill. | [optional] 

## Methods

### NewSearchSkill

`func NewSearchSkill() *SearchSkill`

NewSearchSkill instantiates a new SearchSkill object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchSkillWithDefaults

`func NewSearchSkillWithDefaults() *SearchSkill`

NewSearchSkillWithDefaults instantiates a new SearchSkill object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *SearchSkill) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SearchSkill) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SearchSkill) SetId(v string)`

SetId sets Id field to given value.

### HasId

`func (o *SearchSkill) HasId() bool`

HasId returns a boolean if a field has been set.

### GetName

`func (o *SearchSkill) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SearchSkill) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SearchSkill) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *SearchSkill) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDescription

`func (o *SearchSkill) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SearchSkill) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SearchSkill) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *SearchSkill) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetTags

`func (o *SearchSkill) GetTags() []string`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *SearchSkill) GetTagsOk() (*[]string, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *SearchSkill) SetTags(v []string)`

SetTags sets Tags field to given value.

### HasTags

`func (o *SearchSkill) HasTags() bool`

HasTags returns a boolean if a field has been set.

### GetExamples

`func (o *SearchSkill) GetExamples() []string`

GetExamples returns the Examples field if non-nil, zero value otherwise.

### GetExamplesOk

`func (o *SearchSkill) GetExamplesOk() (*[]string, bool)`

GetExamplesOk returns a tuple with the Examples field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExamples

`func (o *SearchSkill) SetExamples(v []string)`

SetExamples sets Examples field to given value.

### HasExamples

`func (o *SearchSkill) HasExamples() bool`

HasExamples returns a boolean if a field has been set.

### GetInputModes

`func (o *SearchSkill) GetInputModes() []string`

GetInputModes returns the InputModes field if non-nil, zero value otherwise.

### GetInputModesOk

`func (o *SearchSkill) GetInputModesOk() (*[]string, bool)`

GetInputModesOk returns a tuple with the InputModes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInputModes

`func (o *SearchSkill) SetInputModes(v []string)`

SetInputModes sets InputModes field to given value.

### HasInputModes

`func (o *SearchSkill) HasInputModes() bool`

HasInputModes returns a boolean if a field has been set.

### GetOutputModes

`func (o *SearchSkill) GetOutputModes() []string`

GetOutputModes returns the OutputModes field if non-nil, zero value otherwise.

### GetOutputModesOk

`func (o *SearchSkill) GetOutputModesOk() (*[]string, bool)`

GetOutputModesOk returns a tuple with the OutputModes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOutputModes

`func (o *SearchSkill) SetOutputModes(v []string)`

SetOutputModes sets OutputModes field to given value.

### HasOutputModes

`func (o *SearchSkill) HasOutputModes() bool`

HasOutputModes returns a boolean if a field has been set.

### GetStreaming

`func (o *SearchSkill) GetStreaming() bool`

GetStreaming returns the Streaming field if non-nil, zero value otherwise.

### GetStreamingOk

`func (o *SearchSkill) GetStreamingOk() (*bool, bool)`

GetStreamingOk returns a tuple with the Streaming field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStreaming

`func (o *SearchSkill) SetStreaming(v bool)`

SetStreaming sets Streaming field to given value.

### HasStreaming

`func (o *SearchSkill) HasStreaming() bool`

HasStreaming returns a boolean if a field has been set.

### GetEndpoint

`func (o *SearchSkill) GetEndpoint() SearchSkillEndpoint`

GetEndpoint returns the Endpoint field if non-nil, zero value otherwise.

### GetEndpointOk

`func (o *SearchSkill) GetEndpointOk() (*SearchSkillEndpoint, bool)`

GetEndpointOk returns a tuple with the Endpoint field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEndpoint

`func (o *SearchSkill) SetEndpoint(v SearchSkillEndpoint)`

SetEndpoint sets Endpoint field to given value.

### HasEndpoint

`func (o *SearchSkill) HasEndpoint() bool`

HasEndpoint returns a boolean if a field has been set.

### GetPriceUsd

`func (o *SearchSkill) GetPriceUsd() string`

GetPriceUsd returns the PriceUsd field if non-nil, zero value otherwise.

### GetPriceUsdOk

`func (o *SearchSkill) GetPriceUsdOk() (*string, bool)`

GetPriceUsdOk returns a tuple with the PriceUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPriceUsd

`func (o *SearchSkill) SetPriceUsd(v string)`

SetPriceUsd sets PriceUsd field to given value.

### HasPriceUsd

`func (o *SearchSkill) HasPriceUsd() bool`

HasPriceUsd returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


