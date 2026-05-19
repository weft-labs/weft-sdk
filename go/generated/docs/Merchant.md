# Merchant

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Address** | **string** | EVM address that received the payment. | 
**SettlementCount** | **int32** | All-time settlement count for this merchant address. | 
**FirstSeenAt** | **time.Time** | First time Weft observed a payment to this address. | 
**DisputeCount** | **int32** | All-time dispute count for this merchant address. | 

## Methods

### NewMerchant

`func NewMerchant(address string, settlementCount int32, firstSeenAt time.Time, disputeCount int32, ) *Merchant`

NewMerchant instantiates a new Merchant object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMerchantWithDefaults

`func NewMerchantWithDefaults() *Merchant`

NewMerchantWithDefaults instantiates a new Merchant object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAddress

`func (o *Merchant) GetAddress() string`

GetAddress returns the Address field if non-nil, zero value otherwise.

### GetAddressOk

`func (o *Merchant) GetAddressOk() (*string, bool)`

GetAddressOk returns a tuple with the Address field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAddress

`func (o *Merchant) SetAddress(v string)`

SetAddress sets Address field to given value.


### GetSettlementCount

`func (o *Merchant) GetSettlementCount() int32`

GetSettlementCount returns the SettlementCount field if non-nil, zero value otherwise.

### GetSettlementCountOk

`func (o *Merchant) GetSettlementCountOk() (*int32, bool)`

GetSettlementCountOk returns a tuple with the SettlementCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettlementCount

`func (o *Merchant) SetSettlementCount(v int32)`

SetSettlementCount sets SettlementCount field to given value.


### GetFirstSeenAt

`func (o *Merchant) GetFirstSeenAt() time.Time`

GetFirstSeenAt returns the FirstSeenAt field if non-nil, zero value otherwise.

### GetFirstSeenAtOk

`func (o *Merchant) GetFirstSeenAtOk() (*time.Time, bool)`

GetFirstSeenAtOk returns a tuple with the FirstSeenAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFirstSeenAt

`func (o *Merchant) SetFirstSeenAt(v time.Time)`

SetFirstSeenAt sets FirstSeenAt field to given value.


### GetDisputeCount

`func (o *Merchant) GetDisputeCount() int32`

GetDisputeCount returns the DisputeCount field if non-nil, zero value otherwise.

### GetDisputeCountOk

`func (o *Merchant) GetDisputeCountOk() (*int32, bool)`

GetDisputeCountOk returns a tuple with the DisputeCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDisputeCount

`func (o *Merchant) SetDisputeCount(v int32)`

SetDisputeCount sets DisputeCount field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


