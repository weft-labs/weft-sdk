# AgentListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | [**[]Agent**](Agent.md) |  | 
**Pagination** | [**Pagination**](Pagination.md) |  | 

## Methods

### NewAgentListResponse

`func NewAgentListResponse(data []Agent, pagination Pagination, ) *AgentListResponse`

NewAgentListResponse instantiates a new AgentListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAgentListResponseWithDefaults

`func NewAgentListResponseWithDefaults() *AgentListResponse`

NewAgentListResponseWithDefaults instantiates a new AgentListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *AgentListResponse) GetData() []Agent`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *AgentListResponse) GetDataOk() (*[]Agent, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *AgentListResponse) SetData(v []Agent)`

SetData sets Data field to given value.


### GetPagination

`func (o *AgentListResponse) GetPagination() Pagination`

GetPagination returns the Pagination field if non-nil, zero value otherwise.

### GetPaginationOk

`func (o *AgentListResponse) GetPaginationOk() (*Pagination, bool)`

GetPaginationOk returns a tuple with the Pagination field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPagination

`func (o *AgentListResponse) SetPagination(v Pagination)`

SetPagination sets Pagination field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


