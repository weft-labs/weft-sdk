# SearchCuratedSource

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Catalog** | **string** |  |
**SnapshotVersion** | **int32** |  |
**CapturedAt** | **time.Time** |  |

## Methods

### NewSearchCuratedSource

`func NewSearchCuratedSource(catalog string, snapshotVersion int32, capturedAt time.Time, ) *SearchCuratedSource`

NewSearchCuratedSource instantiates a new SearchCuratedSource object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchCuratedSourceWithDefaults

`func NewSearchCuratedSourceWithDefaults() *SearchCuratedSource`

NewSearchCuratedSourceWithDefaults instantiates a new SearchCuratedSource object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCatalog

`func (o *SearchCuratedSource) GetCatalog() string`

GetCatalog returns the Catalog field if non-nil, zero value otherwise.

### GetCatalogOk

`func (o *SearchCuratedSource) GetCatalogOk() (*string, bool)`

GetCatalogOk returns a tuple with the Catalog field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCatalog

`func (o *SearchCuratedSource) SetCatalog(v string)`

SetCatalog sets Catalog field to given value.


### GetSnapshotVersion

`func (o *SearchCuratedSource) GetSnapshotVersion() int32`

GetSnapshotVersion returns the SnapshotVersion field if non-nil, zero value otherwise.

### GetSnapshotVersionOk

`func (o *SearchCuratedSource) GetSnapshotVersionOk() (*int32, bool)`

GetSnapshotVersionOk returns a tuple with the SnapshotVersion field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSnapshotVersion

`func (o *SearchCuratedSource) SetSnapshotVersion(v int32)`

SetSnapshotVersion sets SnapshotVersion field to given value.


### GetCapturedAt

`func (o *SearchCuratedSource) GetCapturedAt() time.Time`

GetCapturedAt returns the CapturedAt field if non-nil, zero value otherwise.

### GetCapturedAtOk

`func (o *SearchCuratedSource) GetCapturedAtOk() (*time.Time, bool)`

GetCapturedAtOk returns a tuple with the CapturedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCapturedAt

`func (o *SearchCuratedSource) SetCapturedAt(v time.Time)`

SetCapturedAt sets CapturedAt field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
