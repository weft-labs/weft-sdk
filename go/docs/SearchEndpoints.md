# SearchEndpoints

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**A2a** | Pointer to **string** |  | [optional] 
**Mcp** | Pointer to **string** |  | [optional] 
**Openapi** | Pointer to **string** | URL to the agent&#39;s OpenAPI document. | [optional] 
**WeftFetchTarget** | Pointer to **string** | Base URL the &#x60;weft_fetch&#x60; MCP tool should target for this agent. | [optional] 

## Methods

### NewSearchEndpoints

`func NewSearchEndpoints() *SearchEndpoints`

NewSearchEndpoints instantiates a new SearchEndpoints object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchEndpointsWithDefaults

`func NewSearchEndpointsWithDefaults() *SearchEndpoints`

NewSearchEndpointsWithDefaults instantiates a new SearchEndpoints object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetA2a

`func (o *SearchEndpoints) GetA2a() string`

GetA2a returns the A2a field if non-nil, zero value otherwise.

### GetA2aOk

`func (o *SearchEndpoints) GetA2aOk() (*string, bool)`

GetA2aOk returns a tuple with the A2a field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetA2a

`func (o *SearchEndpoints) SetA2a(v string)`

SetA2a sets A2a field to given value.

### HasA2a

`func (o *SearchEndpoints) HasA2a() bool`

HasA2a returns a boolean if a field has been set.

### GetMcp

`func (o *SearchEndpoints) GetMcp() string`

GetMcp returns the Mcp field if non-nil, zero value otherwise.

### GetMcpOk

`func (o *SearchEndpoints) GetMcpOk() (*string, bool)`

GetMcpOk returns a tuple with the Mcp field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMcp

`func (o *SearchEndpoints) SetMcp(v string)`

SetMcp sets Mcp field to given value.

### HasMcp

`func (o *SearchEndpoints) HasMcp() bool`

HasMcp returns a boolean if a field has been set.

### GetOpenapi

`func (o *SearchEndpoints) GetOpenapi() string`

GetOpenapi returns the Openapi field if non-nil, zero value otherwise.

### GetOpenapiOk

`func (o *SearchEndpoints) GetOpenapiOk() (*string, bool)`

GetOpenapiOk returns a tuple with the Openapi field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOpenapi

`func (o *SearchEndpoints) SetOpenapi(v string)`

SetOpenapi sets Openapi field to given value.

### HasOpenapi

`func (o *SearchEndpoints) HasOpenapi() bool`

HasOpenapi returns a boolean if a field has been set.

### GetWeftFetchTarget

`func (o *SearchEndpoints) GetWeftFetchTarget() string`

GetWeftFetchTarget returns the WeftFetchTarget field if non-nil, zero value otherwise.

### GetWeftFetchTargetOk

`func (o *SearchEndpoints) GetWeftFetchTargetOk() (*string, bool)`

GetWeftFetchTargetOk returns a tuple with the WeftFetchTarget field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeftFetchTarget

`func (o *SearchEndpoints) SetWeftFetchTarget(v string)`

SetWeftFetchTarget sets WeftFetchTarget field to given value.

### HasWeftFetchTarget

`func (o *SearchEndpoints) HasWeftFetchTarget() bool`

HasWeftFetchTarget returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


