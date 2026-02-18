# AgentStats

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**TotalPaid** | Pointer to **int32** |  | [optional] 
**TotalReceived** | Pointer to **int32** |  | [optional] 
**PaymentsMade** | Pointer to **int32** |  | [optional] 
**PaymentsReceived** | Pointer to **int32** |  | [optional] 
**UniqueCounterparties** | Pointer to **int32** |  | [optional] 
**FirstSeen** | Pointer to **time.Time** |  | [optional] 
**LastActive** | Pointer to **time.Time** |  | [optional] 

## Methods

### NewAgentStats

`func NewAgentStats() *AgentStats`

NewAgentStats instantiates a new AgentStats object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAgentStatsWithDefaults

`func NewAgentStatsWithDefaults() *AgentStats`

NewAgentStatsWithDefaults instantiates a new AgentStats object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetTotalPaid

`func (o *AgentStats) GetTotalPaid() int32`

GetTotalPaid returns the TotalPaid field if non-nil, zero value otherwise.

### GetTotalPaidOk

`func (o *AgentStats) GetTotalPaidOk() (*int32, bool)`

GetTotalPaidOk returns a tuple with the TotalPaid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalPaid

`func (o *AgentStats) SetTotalPaid(v int32)`

SetTotalPaid sets TotalPaid field to given value.

### HasTotalPaid

`func (o *AgentStats) HasTotalPaid() bool`

HasTotalPaid returns a boolean if a field has been set.

### GetTotalReceived

`func (o *AgentStats) GetTotalReceived() int32`

GetTotalReceived returns the TotalReceived field if non-nil, zero value otherwise.

### GetTotalReceivedOk

`func (o *AgentStats) GetTotalReceivedOk() (*int32, bool)`

GetTotalReceivedOk returns a tuple with the TotalReceived field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalReceived

`func (o *AgentStats) SetTotalReceived(v int32)`

SetTotalReceived sets TotalReceived field to given value.

### HasTotalReceived

`func (o *AgentStats) HasTotalReceived() bool`

HasTotalReceived returns a boolean if a field has been set.

### GetPaymentsMade

`func (o *AgentStats) GetPaymentsMade() int32`

GetPaymentsMade returns the PaymentsMade field if non-nil, zero value otherwise.

### GetPaymentsMadeOk

`func (o *AgentStats) GetPaymentsMadeOk() (*int32, bool)`

GetPaymentsMadeOk returns a tuple with the PaymentsMade field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaymentsMade

`func (o *AgentStats) SetPaymentsMade(v int32)`

SetPaymentsMade sets PaymentsMade field to given value.

### HasPaymentsMade

`func (o *AgentStats) HasPaymentsMade() bool`

HasPaymentsMade returns a boolean if a field has been set.

### GetPaymentsReceived

`func (o *AgentStats) GetPaymentsReceived() int32`

GetPaymentsReceived returns the PaymentsReceived field if non-nil, zero value otherwise.

### GetPaymentsReceivedOk

`func (o *AgentStats) GetPaymentsReceivedOk() (*int32, bool)`

GetPaymentsReceivedOk returns a tuple with the PaymentsReceived field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaymentsReceived

`func (o *AgentStats) SetPaymentsReceived(v int32)`

SetPaymentsReceived sets PaymentsReceived field to given value.

### HasPaymentsReceived

`func (o *AgentStats) HasPaymentsReceived() bool`

HasPaymentsReceived returns a boolean if a field has been set.

### GetUniqueCounterparties

`func (o *AgentStats) GetUniqueCounterparties() int32`

GetUniqueCounterparties returns the UniqueCounterparties field if non-nil, zero value otherwise.

### GetUniqueCounterpartiesOk

`func (o *AgentStats) GetUniqueCounterpartiesOk() (*int32, bool)`

GetUniqueCounterpartiesOk returns a tuple with the UniqueCounterparties field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUniqueCounterparties

`func (o *AgentStats) SetUniqueCounterparties(v int32)`

SetUniqueCounterparties sets UniqueCounterparties field to given value.

### HasUniqueCounterparties

`func (o *AgentStats) HasUniqueCounterparties() bool`

HasUniqueCounterparties returns a boolean if a field has been set.

### GetFirstSeen

`func (o *AgentStats) GetFirstSeen() time.Time`

GetFirstSeen returns the FirstSeen field if non-nil, zero value otherwise.

### GetFirstSeenOk

`func (o *AgentStats) GetFirstSeenOk() (*time.Time, bool)`

GetFirstSeenOk returns a tuple with the FirstSeen field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFirstSeen

`func (o *AgentStats) SetFirstSeen(v time.Time)`

SetFirstSeen sets FirstSeen field to given value.

### HasFirstSeen

`func (o *AgentStats) HasFirstSeen() bool`

HasFirstSeen returns a boolean if a field has been set.

### GetLastActive

`func (o *AgentStats) GetLastActive() time.Time`

GetLastActive returns the LastActive field if non-nil, zero value otherwise.

### GetLastActiveOk

`func (o *AgentStats) GetLastActiveOk() (*time.Time, bool)`

GetLastActiveOk returns a tuple with the LastActive field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastActive

`func (o *AgentStats) SetLastActive(v time.Time)`

SetLastActive sets LastActive field to given value.

### HasLastActive

`func (o *AgentStats) HasLastActive() bool`

HasLastActive returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


