# PeriodStats

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ThisWeekVolume** | **string** |  | 
**LastWeekVolume** | **string** |  | 
**VolumeChange** | Pointer to **float32** |  | [optional] 
**ThisWeekCount** | **int32** |  | 
**LastWeekCount** | **int32** |  | 
**CountChange** | Pointer to **float32** |  | [optional] 

## Methods

### NewPeriodStats

`func NewPeriodStats(thisWeekVolume string, lastWeekVolume string, thisWeekCount int32, lastWeekCount int32, ) *PeriodStats`

NewPeriodStats instantiates a new PeriodStats object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPeriodStatsWithDefaults

`func NewPeriodStatsWithDefaults() *PeriodStats`

NewPeriodStatsWithDefaults instantiates a new PeriodStats object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetThisWeekVolume

`func (o *PeriodStats) GetThisWeekVolume() string`

GetThisWeekVolume returns the ThisWeekVolume field if non-nil, zero value otherwise.

### GetThisWeekVolumeOk

`func (o *PeriodStats) GetThisWeekVolumeOk() (*string, bool)`

GetThisWeekVolumeOk returns a tuple with the ThisWeekVolume field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetThisWeekVolume

`func (o *PeriodStats) SetThisWeekVolume(v string)`

SetThisWeekVolume sets ThisWeekVolume field to given value.


### GetLastWeekVolume

`func (o *PeriodStats) GetLastWeekVolume() string`

GetLastWeekVolume returns the LastWeekVolume field if non-nil, zero value otherwise.

### GetLastWeekVolumeOk

`func (o *PeriodStats) GetLastWeekVolumeOk() (*string, bool)`

GetLastWeekVolumeOk returns a tuple with the LastWeekVolume field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastWeekVolume

`func (o *PeriodStats) SetLastWeekVolume(v string)`

SetLastWeekVolume sets LastWeekVolume field to given value.


### GetVolumeChange

`func (o *PeriodStats) GetVolumeChange() float32`

GetVolumeChange returns the VolumeChange field if non-nil, zero value otherwise.

### GetVolumeChangeOk

`func (o *PeriodStats) GetVolumeChangeOk() (*float32, bool)`

GetVolumeChangeOk returns a tuple with the VolumeChange field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVolumeChange

`func (o *PeriodStats) SetVolumeChange(v float32)`

SetVolumeChange sets VolumeChange field to given value.

### HasVolumeChange

`func (o *PeriodStats) HasVolumeChange() bool`

HasVolumeChange returns a boolean if a field has been set.

### GetThisWeekCount

`func (o *PeriodStats) GetThisWeekCount() int32`

GetThisWeekCount returns the ThisWeekCount field if non-nil, zero value otherwise.

### GetThisWeekCountOk

`func (o *PeriodStats) GetThisWeekCountOk() (*int32, bool)`

GetThisWeekCountOk returns a tuple with the ThisWeekCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetThisWeekCount

`func (o *PeriodStats) SetThisWeekCount(v int32)`

SetThisWeekCount sets ThisWeekCount field to given value.


### GetLastWeekCount

`func (o *PeriodStats) GetLastWeekCount() int32`

GetLastWeekCount returns the LastWeekCount field if non-nil, zero value otherwise.

### GetLastWeekCountOk

`func (o *PeriodStats) GetLastWeekCountOk() (*int32, bool)`

GetLastWeekCountOk returns a tuple with the LastWeekCount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastWeekCount

`func (o *PeriodStats) SetLastWeekCount(v int32)`

SetLastWeekCount sets LastWeekCount field to given value.


### GetCountChange

`func (o *PeriodStats) GetCountChange() float32`

GetCountChange returns the CountChange field if non-nil, zero value otherwise.

### GetCountChangeOk

`func (o *PeriodStats) GetCountChangeOk() (*float32, bool)`

GetCountChangeOk returns a tuple with the CountChange field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCountChange

`func (o *PeriodStats) SetCountChange(v float32)`

SetCountChange sets CountChange field to given value.

### HasCountChange

`func (o *PeriodStats) HasCountChange() bool`

HasCountChange returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


