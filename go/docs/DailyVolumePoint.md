# DailyVolumePoint

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Date** | **string** |  | 
**Volume** | **float32** | Volume in USDC | 
**Label** | **string** |  | 

## Methods

### NewDailyVolumePoint

`func NewDailyVolumePoint(date string, volume float32, label string, ) *DailyVolumePoint`

NewDailyVolumePoint instantiates a new DailyVolumePoint object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewDailyVolumePointWithDefaults

`func NewDailyVolumePointWithDefaults() *DailyVolumePoint`

NewDailyVolumePointWithDefaults instantiates a new DailyVolumePoint object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDate

`func (o *DailyVolumePoint) GetDate() string`

GetDate returns the Date field if non-nil, zero value otherwise.

### GetDateOk

`func (o *DailyVolumePoint) GetDateOk() (*string, bool)`

GetDateOk returns a tuple with the Date field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDate

`func (o *DailyVolumePoint) SetDate(v string)`

SetDate sets Date field to given value.


### GetVolume

`func (o *DailyVolumePoint) GetVolume() float32`

GetVolume returns the Volume field if non-nil, zero value otherwise.

### GetVolumeOk

`func (o *DailyVolumePoint) GetVolumeOk() (*float32, bool)`

GetVolumeOk returns a tuple with the Volume field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetVolume

`func (o *DailyVolumePoint) SetVolume(v float32)`

SetVolume sets Volume field to given value.


### GetLabel

`func (o *DailyVolumePoint) GetLabel() string`

GetLabel returns the Label field if non-nil, zero value otherwise.

### GetLabelOk

`func (o *DailyVolumePoint) GetLabelOk() (*string, bool)`

GetLabelOk returns a tuple with the Label field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabel

`func (o *DailyVolumePoint) SetLabel(v string)`

SetLabel sets Label field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


