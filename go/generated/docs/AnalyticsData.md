# AnalyticsData

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DailyVolume** | [**[]DailyVolumePoint**](DailyVolumePoint.md) |  | 
**DailyCount** | [**[]DailyCountPoint**](DailyCountPoint.md) |  | 
**PeriodStats** | [**PeriodStats**](PeriodStats.md) |  | 
**TopPayers** | [**[]TopPayer**](TopPayer.md) |  | 
**RevenueByEndpoint** | [**[]EndpointRevenue**](EndpointRevenue.md) |  | 
**NetworkBreakdown** | [**[]NetworkBreakdown**](NetworkBreakdown.md) |  | 

## Methods

### NewAnalyticsData

`func NewAnalyticsData(dailyVolume []DailyVolumePoint, dailyCount []DailyCountPoint, periodStats PeriodStats, topPayers []TopPayer, revenueByEndpoint []EndpointRevenue, networkBreakdown []NetworkBreakdown, ) *AnalyticsData`

NewAnalyticsData instantiates a new AnalyticsData object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAnalyticsDataWithDefaults

`func NewAnalyticsDataWithDefaults() *AnalyticsData`

NewAnalyticsDataWithDefaults instantiates a new AnalyticsData object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDailyVolume

`func (o *AnalyticsData) GetDailyVolume() []DailyVolumePoint`

GetDailyVolume returns the DailyVolume field if non-nil, zero value otherwise.

### GetDailyVolumeOk

`func (o *AnalyticsData) GetDailyVolumeOk() (*[]DailyVolumePoint, bool)`

GetDailyVolumeOk returns a tuple with the DailyVolume field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDailyVolume

`func (o *AnalyticsData) SetDailyVolume(v []DailyVolumePoint)`

SetDailyVolume sets DailyVolume field to given value.


### GetDailyCount

`func (o *AnalyticsData) GetDailyCount() []DailyCountPoint`

GetDailyCount returns the DailyCount field if non-nil, zero value otherwise.

### GetDailyCountOk

`func (o *AnalyticsData) GetDailyCountOk() (*[]DailyCountPoint, bool)`

GetDailyCountOk returns a tuple with the DailyCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDailyCount

`func (o *AnalyticsData) SetDailyCount(v []DailyCountPoint)`

SetDailyCount sets DailyCount field to given value.


### GetPeriodStats

`func (o *AnalyticsData) GetPeriodStats() PeriodStats`

GetPeriodStats returns the PeriodStats field if non-nil, zero value otherwise.

### GetPeriodStatsOk

`func (o *AnalyticsData) GetPeriodStatsOk() (*PeriodStats, bool)`

GetPeriodStatsOk returns a tuple with the PeriodStats field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPeriodStats

`func (o *AnalyticsData) SetPeriodStats(v PeriodStats)`

SetPeriodStats sets PeriodStats field to given value.


### GetTopPayers

`func (o *AnalyticsData) GetTopPayers() []TopPayer`

GetTopPayers returns the TopPayers field if non-nil, zero value otherwise.

### GetTopPayersOk

`func (o *AnalyticsData) GetTopPayersOk() (*[]TopPayer, bool)`

GetTopPayersOk returns a tuple with the TopPayers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTopPayers

`func (o *AnalyticsData) SetTopPayers(v []TopPayer)`

SetTopPayers sets TopPayers field to given value.


### GetRevenueByEndpoint

`func (o *AnalyticsData) GetRevenueByEndpoint() []EndpointRevenue`

GetRevenueByEndpoint returns the RevenueByEndpoint field if non-nil, zero value otherwise.

### GetRevenueByEndpointOk

`func (o *AnalyticsData) GetRevenueByEndpointOk() (*[]EndpointRevenue, bool)`

GetRevenueByEndpointOk returns a tuple with the RevenueByEndpoint field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRevenueByEndpoint

`func (o *AnalyticsData) SetRevenueByEndpoint(v []EndpointRevenue)`

SetRevenueByEndpoint sets RevenueByEndpoint field to given value.


### GetNetworkBreakdown

`func (o *AnalyticsData) GetNetworkBreakdown() []NetworkBreakdown`

GetNetworkBreakdown returns the NetworkBreakdown field if non-nil, zero value otherwise.

### GetNetworkBreakdownOk

`func (o *AnalyticsData) GetNetworkBreakdownOk() (*[]NetworkBreakdown, bool)`

GetNetworkBreakdownOk returns a tuple with the NetworkBreakdown field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetworkBreakdown

`func (o *AnalyticsData) SetNetworkBreakdown(v []NetworkBreakdown)`

SetNetworkBreakdown sets NetworkBreakdown field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


