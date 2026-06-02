# ResourceStats

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**TotalPaid** | **int32** | Total atomic units paid out by this resource. | 
**TotalReceived** | **int32** | Total atomic units received by this resource. | 
**PaymentsMade** | **int32** |  | 
**PaymentsReceived** | **int32** |  | 
**UniqueCounterparties** | **int32** |  | 
**FirstSeen** | **time.Time** |  | 
**LastActive** | **time.Time** |  | 

## Methods

### NewResourceStats

`func NewResourceStats(totalPaid int32, totalReceived int32, paymentsMade int32, paymentsReceived int32, uniqueCounterparties int32, firstSeen time.Time, lastActive time.Time, ) *ResourceStats`

NewResourceStats instantiates a new ResourceStats object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewResourceStatsWithDefaults

`func NewResourceStatsWithDefaults() *ResourceStats`

NewResourceStatsWithDefaults instantiates a new ResourceStats object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTotalPaid

`func (o *ResourceStats) GetTotalPaid() int32`

GetTotalPaid returns the TotalPaid field if non-nil, zero value otherwise.

### GetTotalPaidOk

`func (o *ResourceStats) GetTotalPaidOk() (*int32, bool)`

GetTotalPaidOk returns a tuple with the TotalPaid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalPaid

`func (o *ResourceStats) SetTotalPaid(v int32)`

SetTotalPaid sets TotalPaid field to given value.


### GetTotalReceived

`func (o *ResourceStats) GetTotalReceived() int32`

GetTotalReceived returns the TotalReceived field if non-nil, zero value otherwise.

### GetTotalReceivedOk

`func (o *ResourceStats) GetTotalReceivedOk() (*int32, bool)`

GetTotalReceivedOk returns a tuple with the TotalReceived field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalReceived

`func (o *ResourceStats) SetTotalReceived(v int32)`

SetTotalReceived sets TotalReceived field to given value.


### GetPaymentsMade

`func (o *ResourceStats) GetPaymentsMade() int32`

GetPaymentsMade returns the PaymentsMade field if non-nil, zero value otherwise.

### GetPaymentsMadeOk

`func (o *ResourceStats) GetPaymentsMadeOk() (*int32, bool)`

GetPaymentsMadeOk returns a tuple with the PaymentsMade field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaymentsMade

`func (o *ResourceStats) SetPaymentsMade(v int32)`

SetPaymentsMade sets PaymentsMade field to given value.


### GetPaymentsReceived

`func (o *ResourceStats) GetPaymentsReceived() int32`

GetPaymentsReceived returns the PaymentsReceived field if non-nil, zero value otherwise.

### GetPaymentsReceivedOk

`func (o *ResourceStats) GetPaymentsReceivedOk() (*int32, bool)`

GetPaymentsReceivedOk returns a tuple with the PaymentsReceived field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaymentsReceived

`func (o *ResourceStats) SetPaymentsReceived(v int32)`

SetPaymentsReceived sets PaymentsReceived field to given value.


### GetUniqueCounterparties

`func (o *ResourceStats) GetUniqueCounterparties() int32`

GetUniqueCounterparties returns the UniqueCounterparties field if non-nil, zero value otherwise.

### GetUniqueCounterpartiesOk

`func (o *ResourceStats) GetUniqueCounterpartiesOk() (*int32, bool)`

GetUniqueCounterpartiesOk returns a tuple with the UniqueCounterparties field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUniqueCounterparties

`func (o *ResourceStats) SetUniqueCounterparties(v int32)`

SetUniqueCounterparties sets UniqueCounterparties field to given value.


### GetFirstSeen

`func (o *ResourceStats) GetFirstSeen() time.Time`

GetFirstSeen returns the FirstSeen field if non-nil, zero value otherwise.

### GetFirstSeenOk

`func (o *ResourceStats) GetFirstSeenOk() (*time.Time, bool)`

GetFirstSeenOk returns a tuple with the FirstSeen field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFirstSeen

`func (o *ResourceStats) SetFirstSeen(v time.Time)`

SetFirstSeen sets FirstSeen field to given value.


### GetLastActive

`func (o *ResourceStats) GetLastActive() time.Time`

GetLastActive returns the LastActive field if non-nil, zero value otherwise.

### GetLastActiveOk

`func (o *ResourceStats) GetLastActiveOk() (*time.Time, bool)`

GetLastActiveOk returns a tuple with the LastActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastActive

`func (o *ResourceStats) SetLastActive(v time.Time)`

SetLastActive sets LastActive field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


