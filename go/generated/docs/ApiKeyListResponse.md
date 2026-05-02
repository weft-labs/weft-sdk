# ApiKeyListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | [**[]ApiKey**](ApiKey.md) |  | 
**Pagination** | [**Pagination**](Pagination.md) |  | 

## Methods

### NewApiKeyListResponse

`func NewApiKeyListResponse(data []ApiKey, pagination Pagination, ) *ApiKeyListResponse`

NewApiKeyListResponse instantiates a new ApiKeyListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewApiKeyListResponseWithDefaults

`func NewApiKeyListResponseWithDefaults() *ApiKeyListResponse`

NewApiKeyListResponseWithDefaults instantiates a new ApiKeyListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *ApiKeyListResponse) GetData() []ApiKey`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *ApiKeyListResponse) GetDataOk() (*[]ApiKey, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *ApiKeyListResponse) SetData(v []ApiKey)`

SetData sets Data field to given value.


### GetPagination

`func (o *ApiKeyListResponse) GetPagination() Pagination`

GetPagination returns the Pagination field if non-nil, zero value otherwise.

### GetPaginationOk

`func (o *ApiKeyListResponse) GetPaginationOk() (*Pagination, bool)`

GetPaginationOk returns a tuple with the Pagination field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPagination

`func (o *ApiKeyListResponse) SetPagination(v Pagination)`

SetPagination sets Pagination field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


