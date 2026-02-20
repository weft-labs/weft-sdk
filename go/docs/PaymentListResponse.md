# PaymentListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Data** | [**[]Payment**](Payment.md) |  | 
**Pagination** | [**Pagination**](Pagination.md) |  | 

## Methods

### NewPaymentListResponse

`func NewPaymentListResponse(data []Payment, pagination Pagination, ) *PaymentListResponse`

NewPaymentListResponse instantiates a new PaymentListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPaymentListResponseWithDefaults

`func NewPaymentListResponseWithDefaults() *PaymentListResponse`

NewPaymentListResponseWithDefaults instantiates a new PaymentListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetData

`func (o *PaymentListResponse) GetData() []Payment`

GetData returns the Data field if non-nil, zero value otherwise.

### GetDataOk

`func (o *PaymentListResponse) GetDataOk() (*[]Payment, bool)`

GetDataOk returns a tuple with the Data field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetData

`func (o *PaymentListResponse) SetData(v []Payment)`

SetData sets Data field to given value.


### GetPagination

`func (o *PaymentListResponse) GetPagination() Pagination`

GetPagination returns the Pagination field if non-nil, zero value otherwise.

### GetPaginationOk

`func (o *PaymentListResponse) GetPaginationOk() (*Pagination, bool)`

GetPaginationOk returns a tuple with the Pagination field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPagination

`func (o *PaymentListResponse) SetPagination(v Pagination)`

SetPagination sets Pagination field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


