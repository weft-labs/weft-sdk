# FetchResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Status** | **int32** | HTTP status returned by the upstream after the paid replay. | 
**Headers** | **map[string]string** | Response headers from the upstream. | 
**BodyBase64** | **string** | Base64-encoded response body. Empty string for empty bodies. | 
**PaidUsd** | **string** | USD amount actually settled. Null for free upstreams. | 
**TxHash** | **string** | Settlement transaction hash. Null for free upstreams. | 
**ArtifactId** | **string** | Internal artifact identifier if the response was persisted. | 
**Merchant** | [**Merchant**](Merchant.md) | Merchant reputation snapshot. Null for free upstreams. | 

## Methods

### NewFetchResponse

`func NewFetchResponse(status int32, headers map[string]string, bodyBase64 string, paidUsd string, txHash string, artifactId string, merchant Merchant, ) *FetchResponse`

NewFetchResponse instantiates a new FetchResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewFetchResponseWithDefaults

`func NewFetchResponseWithDefaults() *FetchResponse`

NewFetchResponseWithDefaults instantiates a new FetchResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetStatus

`func (o *FetchResponse) GetStatus() int32`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *FetchResponse) GetStatusOk() (*int32, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *FetchResponse) SetStatus(v int32)`

SetStatus sets Status field to given value.


### GetHeaders

`func (o *FetchResponse) GetHeaders() map[string]string`

GetHeaders returns the Headers field if non-nil, zero value otherwise.

### GetHeadersOk

`func (o *FetchResponse) GetHeadersOk() (*map[string]string, bool)`

GetHeadersOk returns a tuple with the Headers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHeaders

`func (o *FetchResponse) SetHeaders(v map[string]string)`

SetHeaders sets Headers field to given value.


### GetBodyBase64

`func (o *FetchResponse) GetBodyBase64() string`

GetBodyBase64 returns the BodyBase64 field if non-nil, zero value otherwise.

### GetBodyBase64Ok

`func (o *FetchResponse) GetBodyBase64Ok() (*string, bool)`

GetBodyBase64Ok returns a tuple with the BodyBase64 field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBodyBase64

`func (o *FetchResponse) SetBodyBase64(v string)`

SetBodyBase64 sets BodyBase64 field to given value.


### GetPaidUsd

`func (o *FetchResponse) GetPaidUsd() string`

GetPaidUsd returns the PaidUsd field if non-nil, zero value otherwise.

### GetPaidUsdOk

`func (o *FetchResponse) GetPaidUsdOk() (*string, bool)`

GetPaidUsdOk returns a tuple with the PaidUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaidUsd

`func (o *FetchResponse) SetPaidUsd(v string)`

SetPaidUsd sets PaidUsd field to given value.


### GetTxHash

`func (o *FetchResponse) GetTxHash() string`

GetTxHash returns the TxHash field if non-nil, zero value otherwise.

### GetTxHashOk

`func (o *FetchResponse) GetTxHashOk() (*string, bool)`

GetTxHashOk returns a tuple with the TxHash field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxHash

`func (o *FetchResponse) SetTxHash(v string)`

SetTxHash sets TxHash field to given value.


### GetArtifactId

`func (o *FetchResponse) GetArtifactId() string`

GetArtifactId returns the ArtifactId field if non-nil, zero value otherwise.

### GetArtifactIdOk

`func (o *FetchResponse) GetArtifactIdOk() (*string, bool)`

GetArtifactIdOk returns a tuple with the ArtifactId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetArtifactId

`func (o *FetchResponse) SetArtifactId(v string)`

SetArtifactId sets ArtifactId field to given value.


### GetMerchant

`func (o *FetchResponse) GetMerchant() Merchant`

GetMerchant returns the Merchant field if non-nil, zero value otherwise.

### GetMerchantOk

`func (o *FetchResponse) GetMerchantOk() (*Merchant, bool)`

GetMerchantOk returns a tuple with the Merchant field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMerchant

`func (o *FetchResponse) SetMerchant(v Merchant)`

SetMerchant sets Merchant field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


