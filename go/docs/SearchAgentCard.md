# SearchAgentCard

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Name** | Pointer to **string** |  | [optional] 
**Description** | Pointer to **string** |  | [optional] 
**Url** | Pointer to **string** |  | [optional] 
**Version** | Pointer to **string** |  | [optional] 
**ProtocolVersion** | Pointer to **string** |  | [optional] 
**Capabilities** | Pointer to **map[string]interface{}** |  | [optional] 
**DefaultInputModes** | Pointer to **[]string** |  | [optional] 
**DefaultOutputModes** | Pointer to **[]string** |  | [optional] 
**Skills** | Pointer to [**[]SearchSkill**](SearchSkill.md) |  | [optional] 

## Methods

### NewSearchAgentCard

`func NewSearchAgentCard() *SearchAgentCard`

NewSearchAgentCard instantiates a new SearchAgentCard object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchAgentCardWithDefaults

`func NewSearchAgentCardWithDefaults() *SearchAgentCard`

NewSearchAgentCardWithDefaults instantiates a new SearchAgentCard object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetName

`func (o *SearchAgentCard) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SearchAgentCard) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SearchAgentCard) SetName(v string)`

SetName sets Name field to given value.

### HasName

`func (o *SearchAgentCard) HasName() bool`

HasName returns a boolean if a field has been set.

### GetDescription

`func (o *SearchAgentCard) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SearchAgentCard) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SearchAgentCard) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *SearchAgentCard) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetUrl

`func (o *SearchAgentCard) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *SearchAgentCard) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *SearchAgentCard) SetUrl(v string)`

SetUrl sets Url field to given value.

### HasUrl

`func (o *SearchAgentCard) HasUrl() bool`

HasUrl returns a boolean if a field has been set.

### GetVersion

`func (o *SearchAgentCard) GetVersion() string`

GetVersion returns the Version field if non-nil, zero value otherwise.

### GetVersionOk

`func (o *SearchAgentCard) GetVersionOk() (*string, bool)`

GetVersionOk returns a tuple with the Version field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVersion

`func (o *SearchAgentCard) SetVersion(v string)`

SetVersion sets Version field to given value.

### HasVersion

`func (o *SearchAgentCard) HasVersion() bool`

HasVersion returns a boolean if a field has been set.

### GetProtocolVersion

`func (o *SearchAgentCard) GetProtocolVersion() string`

GetProtocolVersion returns the ProtocolVersion field if non-nil, zero value otherwise.

### GetProtocolVersionOk

`func (o *SearchAgentCard) GetProtocolVersionOk() (*string, bool)`

GetProtocolVersionOk returns a tuple with the ProtocolVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocolVersion

`func (o *SearchAgentCard) SetProtocolVersion(v string)`

SetProtocolVersion sets ProtocolVersion field to given value.

### HasProtocolVersion

`func (o *SearchAgentCard) HasProtocolVersion() bool`

HasProtocolVersion returns a boolean if a field has been set.

### GetCapabilities

`func (o *SearchAgentCard) GetCapabilities() map[string]interface{}`

GetCapabilities returns the Capabilities field if non-nil, zero value otherwise.

### GetCapabilitiesOk

`func (o *SearchAgentCard) GetCapabilitiesOk() (*map[string]interface{}, bool)`

GetCapabilitiesOk returns a tuple with the Capabilities field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCapabilities

`func (o *SearchAgentCard) SetCapabilities(v map[string]interface{})`

SetCapabilities sets Capabilities field to given value.

### HasCapabilities

`func (o *SearchAgentCard) HasCapabilities() bool`

HasCapabilities returns a boolean if a field has been set.

### GetDefaultInputModes

`func (o *SearchAgentCard) GetDefaultInputModes() []string`

GetDefaultInputModes returns the DefaultInputModes field if non-nil, zero value otherwise.

### GetDefaultInputModesOk

`func (o *SearchAgentCard) GetDefaultInputModesOk() (*[]string, bool)`

GetDefaultInputModesOk returns a tuple with the DefaultInputModes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultInputModes

`func (o *SearchAgentCard) SetDefaultInputModes(v []string)`

SetDefaultInputModes sets DefaultInputModes field to given value.

### HasDefaultInputModes

`func (o *SearchAgentCard) HasDefaultInputModes() bool`

HasDefaultInputModes returns a boolean if a field has been set.

### GetDefaultOutputModes

`func (o *SearchAgentCard) GetDefaultOutputModes() []string`

GetDefaultOutputModes returns the DefaultOutputModes field if non-nil, zero value otherwise.

### GetDefaultOutputModesOk

`func (o *SearchAgentCard) GetDefaultOutputModesOk() (*[]string, bool)`

GetDefaultOutputModesOk returns a tuple with the DefaultOutputModes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDefaultOutputModes

`func (o *SearchAgentCard) SetDefaultOutputModes(v []string)`

SetDefaultOutputModes sets DefaultOutputModes field to given value.

### HasDefaultOutputModes

`func (o *SearchAgentCard) HasDefaultOutputModes() bool`

HasDefaultOutputModes returns a boolean if a field has been set.

### GetSkills

`func (o *SearchAgentCard) GetSkills() []SearchSkill`

GetSkills returns the Skills field if non-nil, zero value otherwise.

### GetSkillsOk

`func (o *SearchAgentCard) GetSkillsOk() (*[]SearchSkill, bool)`

GetSkillsOk returns a tuple with the Skills field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSkills

`func (o *SearchAgentCard) SetSkills(v []SearchSkill)`

SetSkills sets Skills field to given value.

### HasSkills

`func (o *SearchAgentCard) HasSkills() bool`

HasSkills returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


