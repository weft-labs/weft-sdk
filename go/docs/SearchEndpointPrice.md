# SearchEndpointPrice

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IndexedUsd** | Pointer to **string** | The indexed price in USD as a decimal string (e.g. \&quot;0.008\&quot;) — the dollar value people and agents reason in. A decimal string, never a float; trailing zeros trimmed. Null when unpriced.  | [optional]
**Atomic** | Pointer to **int32** | The same price in integer micro-USD — the settlement grain, exact. Null exactly when &#x60;indexed_usd&#x60; is. Use this for settlement.  | [optional]
**Source** | Pointer to **string** | Where the amount came from. &#x60;probe&#x60; &#x3D; observed live in the endpoint&#39;s own 402 payment-required challenge — an observation, the strongest evidence we hold. &#x60;inferred&#x60; &#x3D; derived from a spec (OpenAPI) or a resale edge by the extraction pipeline, so it can lag a provider&#39;s re-pricing. Null when the endpoint carries no price.  | [optional]
**LastObservedAt** | Pointer to **time.Time** | When the amount was observed. Null when unrecorded. | [optional]
**LiveVerified** | Pointer to **bool** | Whether this amount was confirmed against a live 402 challenge for THIS response. Search does not issue a payment-required probe at query time, so this is &#x60;false&#x60; today — treat an unflagged price as indexed, not verified.  | [optional]

## Methods

### NewSearchEndpointPrice

`func NewSearchEndpointPrice() *SearchEndpointPrice`

NewSearchEndpointPrice instantiates a new SearchEndpointPrice object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchEndpointPriceWithDefaults

`func NewSearchEndpointPriceWithDefaults() *SearchEndpointPrice`

NewSearchEndpointPriceWithDefaults instantiates a new SearchEndpointPrice object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIndexedUsd

`func (o *SearchEndpointPrice) GetIndexedUsd() string`

GetIndexedUsd returns the IndexedUsd field if non-nil, zero value otherwise.

### GetIndexedUsdOk

`func (o *SearchEndpointPrice) GetIndexedUsdOk() (*string, bool)`

GetIndexedUsdOk returns a tuple with the IndexedUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIndexedUsd

`func (o *SearchEndpointPrice) SetIndexedUsd(v string)`

SetIndexedUsd sets IndexedUsd field to given value.

### HasIndexedUsd

`func (o *SearchEndpointPrice) HasIndexedUsd() bool`

HasIndexedUsd returns a boolean if a field has been set.

### GetAtomic

`func (o *SearchEndpointPrice) GetAtomic() int32`

GetAtomic returns the Atomic field if non-nil, zero value otherwise.

### GetAtomicOk

`func (o *SearchEndpointPrice) GetAtomicOk() (*int32, bool)`

GetAtomicOk returns a tuple with the Atomic field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAtomic

`func (o *SearchEndpointPrice) SetAtomic(v int32)`

SetAtomic sets Atomic field to given value.

### HasAtomic

`func (o *SearchEndpointPrice) HasAtomic() bool`

HasAtomic returns a boolean if a field has been set.

### GetSource

`func (o *SearchEndpointPrice) GetSource() string`

GetSource returns the Source field if non-nil, zero value otherwise.

### GetSourceOk

`func (o *SearchEndpointPrice) GetSourceOk() (*string, bool)`

GetSourceOk returns a tuple with the Source field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSource

`func (o *SearchEndpointPrice) SetSource(v string)`

SetSource sets Source field to given value.

### HasSource

`func (o *SearchEndpointPrice) HasSource() bool`

HasSource returns a boolean if a field has been set.

### GetLastObservedAt

`func (o *SearchEndpointPrice) GetLastObservedAt() time.Time`

GetLastObservedAt returns the LastObservedAt field if non-nil, zero value otherwise.

### GetLastObservedAtOk

`func (o *SearchEndpointPrice) GetLastObservedAtOk() (*time.Time, bool)`

GetLastObservedAtOk returns a tuple with the LastObservedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLastObservedAt

`func (o *SearchEndpointPrice) SetLastObservedAt(v time.Time)`

SetLastObservedAt sets LastObservedAt field to given value.

### HasLastObservedAt

`func (o *SearchEndpointPrice) HasLastObservedAt() bool`

HasLastObservedAt returns a boolean if a field has been set.

### GetLiveVerified

`func (o *SearchEndpointPrice) GetLiveVerified() bool`

GetLiveVerified returns the LiveVerified field if non-nil, zero value otherwise.

### GetLiveVerifiedOk

`func (o *SearchEndpointPrice) GetLiveVerifiedOk() (*bool, bool)`

GetLiveVerifiedOk returns a tuple with the LiveVerified field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLiveVerified

`func (o *SearchEndpointPrice) SetLiveVerified(v bool)`

SetLiveVerified sets LiveVerified field to given value.

### HasLiveVerified

`func (o *SearchEndpointPrice) HasLiveVerified() bool`

HasLiveVerified returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
