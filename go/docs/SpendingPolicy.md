# SpendingPolicy

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**MaxTxUsd** | **string** | Maximum USD per single transaction. | 
**DailyLimitUsd** | **string** | Maximum USD spent in a 24-hour window. | 
**WeeklyLimitUsd** | **string** | Maximum USD spent in a 7-day window. | 

## Methods

### NewSpendingPolicy

`func NewSpendingPolicy(maxTxUsd string, dailyLimitUsd string, weeklyLimitUsd string, ) *SpendingPolicy`

NewSpendingPolicy instantiates a new SpendingPolicy object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSpendingPolicyWithDefaults

`func NewSpendingPolicyWithDefaults() *SpendingPolicy`

NewSpendingPolicyWithDefaults instantiates a new SpendingPolicy object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMaxTxUsd

`func (o *SpendingPolicy) GetMaxTxUsd() string`

GetMaxTxUsd returns the MaxTxUsd field if non-nil, zero value otherwise.

### GetMaxTxUsdOk

`func (o *SpendingPolicy) GetMaxTxUsdOk() (*string, bool)`

GetMaxTxUsdOk returns a tuple with the MaxTxUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxTxUsd

`func (o *SpendingPolicy) SetMaxTxUsd(v string)`

SetMaxTxUsd sets MaxTxUsd field to given value.


### GetDailyLimitUsd

`func (o *SpendingPolicy) GetDailyLimitUsd() string`

GetDailyLimitUsd returns the DailyLimitUsd field if non-nil, zero value otherwise.

### GetDailyLimitUsdOk

`func (o *SpendingPolicy) GetDailyLimitUsdOk() (*string, bool)`

GetDailyLimitUsdOk returns a tuple with the DailyLimitUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDailyLimitUsd

`func (o *SpendingPolicy) SetDailyLimitUsd(v string)`

SetDailyLimitUsd sets DailyLimitUsd field to given value.


### GetWeeklyLimitUsd

`func (o *SpendingPolicy) GetWeeklyLimitUsd() string`

GetWeeklyLimitUsd returns the WeeklyLimitUsd field if non-nil, zero value otherwise.

### GetWeeklyLimitUsdOk

`func (o *SpendingPolicy) GetWeeklyLimitUsdOk() (*string, bool)`

GetWeeklyLimitUsdOk returns a tuple with the WeeklyLimitUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeeklyLimitUsd

`func (o *SpendingPolicy) SetWeeklyLimitUsd(v string)`

SetWeeklyLimitUsd sets WeeklyLimitUsd field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


