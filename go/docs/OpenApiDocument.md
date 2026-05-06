# OpenApiDocument

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Openapi** | **string** |  | 
**Info** | **map[string]interface{}** |  | 
**Paths** | **map[string]interface{}** |  | 
**Components** | Pointer to **map[string]interface{}** |  | [optional] 

## Methods

### NewOpenApiDocument

`func NewOpenApiDocument(openapi string, info map[string]interface{}, paths map[string]interface{}, ) *OpenApiDocument`

NewOpenApiDocument instantiates a new OpenApiDocument object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewOpenApiDocumentWithDefaults

`func NewOpenApiDocumentWithDefaults() *OpenApiDocument`

NewOpenApiDocumentWithDefaults instantiates a new OpenApiDocument object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetOpenapi

`func (o *OpenApiDocument) GetOpenapi() string`

GetOpenapi returns the Openapi field if non-nil, zero value otherwise.

### GetOpenapiOk

`func (o *OpenApiDocument) GetOpenapiOk() (*string, bool)`

GetOpenapiOk returns a tuple with the Openapi field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOpenapi

`func (o *OpenApiDocument) SetOpenapi(v string)`

SetOpenapi sets Openapi field to given value.


### GetInfo

`func (o *OpenApiDocument) GetInfo() map[string]interface{}`

GetInfo returns the Info field if non-nil, zero value otherwise.

### GetInfoOk

`func (o *OpenApiDocument) GetInfoOk() (*map[string]interface{}, bool)`

GetInfoOk returns a tuple with the Info field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetInfo

`func (o *OpenApiDocument) SetInfo(v map[string]interface{})`

SetInfo sets Info field to given value.


### GetPaths

`func (o *OpenApiDocument) GetPaths() map[string]interface{}`

GetPaths returns the Paths field if non-nil, zero value otherwise.

### GetPathsOk

`func (o *OpenApiDocument) GetPathsOk() (*map[string]interface{}, bool)`

GetPathsOk returns a tuple with the Paths field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaths

`func (o *OpenApiDocument) SetPaths(v map[string]interface{})`

SetPaths sets Paths field to given value.


### GetComponents

`func (o *OpenApiDocument) GetComponents() map[string]interface{}`

GetComponents returns the Components field if non-nil, zero value otherwise.

### GetComponentsOk

`func (o *OpenApiDocument) GetComponentsOk() (*map[string]interface{}, bool)`

GetComponentsOk returns a tuple with the Components field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComponents

`func (o *OpenApiDocument) SetComponents(v map[string]interface{})`

SetComponents sets Components field to given value.

### HasComponents

`func (o *OpenApiDocument) HasComponents() bool`

HasComponents returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


