# PurchaseListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | [**[]Purchase**](Purchase.md) |  |
**Pagination** | [**Pagination**](Pagination.md) |  |

## Methods

### NewPurchaseListResponse

`func NewPurchaseListResponse(data []Purchase, pagination Pagination, ) *PurchaseListResponse`

NewPurchaseListResponse instantiates a new PurchaseListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPurchaseListResponseWithDefaults

`func NewPurchaseListResponseWithDefaults() *PurchaseListResponse`

NewPurchaseListResponseWithDefaults instantiates a new PurchaseListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *PurchaseListResponse) GetData() []Purchase`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *PurchaseListResponse) GetDataOk() (*[]Purchase, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *PurchaseListResponse) SetData(v []Purchase)`

SetData sets Data field to given value.


### GetPagination

`func (o *PurchaseListResponse) GetPagination() Pagination`

GetPagination returns the Pagination field if non-nil, zero value otherwise.

### GetPaginationOk

`func (o *PurchaseListResponse) GetPaginationOk() (*Pagination, bool)`

GetPaginationOk returns a tuple with the Pagination field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPagination

`func (o *PurchaseListResponse) SetPagination(v Pagination)`

SetPagination sets Pagination field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
