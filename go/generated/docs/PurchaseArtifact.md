# PurchaseArtifact

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  |
**MerchantUrl** | **string** |  |
**Bytes** | **int32** |  |
**Mime** | **NullableString** |  |

## Methods

### NewPurchaseArtifact

`func NewPurchaseArtifact(id int32, merchantUrl string, bytes int32, mime NullableString, ) *PurchaseArtifact`

NewPurchaseArtifact instantiates a new PurchaseArtifact object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPurchaseArtifactWithDefaults

`func NewPurchaseArtifactWithDefaults() *PurchaseArtifact`

NewPurchaseArtifactWithDefaults instantiates a new PurchaseArtifact object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *PurchaseArtifact) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *PurchaseArtifact) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *PurchaseArtifact) SetId(v int32)`

SetId sets Id field to given value.


### GetMerchantUrl

`func (o *PurchaseArtifact) GetMerchantUrl() string`

GetMerchantUrl returns the MerchantUrl field if non-nil, zero value otherwise.

### GetMerchantUrlOk

`func (o *PurchaseArtifact) GetMerchantUrlOk() (*string, bool)`

GetMerchantUrlOk returns a tuple with the MerchantUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMerchantUrl

`func (o *PurchaseArtifact) SetMerchantUrl(v string)`

SetMerchantUrl sets MerchantUrl field to given value.


### GetBytes

`func (o *PurchaseArtifact) GetBytes() int32`

GetBytes returns the Bytes field if non-nil, zero value otherwise.

### GetBytesOk

`func (o *PurchaseArtifact) GetBytesOk() (*int32, bool)`

GetBytesOk returns a tuple with the Bytes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBytes

`func (o *PurchaseArtifact) SetBytes(v int32)`

SetBytes sets Bytes field to given value.


### GetMime

`func (o *PurchaseArtifact) GetMime() string`

GetMime returns the Mime field if non-nil, zero value otherwise.

### GetMimeOk

`func (o *PurchaseArtifact) GetMimeOk() (*string, bool)`

GetMimeOk returns a tuple with the Mime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMime

`func (o *PurchaseArtifact) SetMime(v string)`

SetMime sets Mime field to given value.


### SetMimeNil

`func (o *PurchaseArtifact) SetMimeNil(b bool)`

 SetMimeNil sets the value for Mime to be an explicit nil

### UnsetMime
`func (o *PurchaseArtifact) UnsetMime()`

UnsetMime ensures that no value is present for Mime, not even an explicit nil

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
