# SearchAccessMethod

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**AccessMethodId** | **string** |  |
**Protocol** | **string** |  |
**Scheme** | Pointer to **string** |  | [optional]
**Network** | Pointer to **string** |  | [optional]
**Asset** | Pointer to **string** |  | [optional]
**AssetDecimals** | Pointer to **int32** |  | [optional]
**Price** | **map[string]interface{}** |  |
**Merchant** | Pointer to **map[string]interface{}** |  | [optional]
**Terms** | Pointer to **map[string]interface{}** |  | [optional]
**Status** | Pointer to **string** |  | [optional]
**WeftFetch** | [**SearchWeftFetchCompatibility**](SearchWeftFetchCompatibility.md) |  |

## Methods

### NewSearchAccessMethod

`func NewSearchAccessMethod(accessMethodId string, protocol string, price map[string]interface{}, weftFetch SearchWeftFetchCompatibility, ) *SearchAccessMethod`

NewSearchAccessMethod instantiates a new SearchAccessMethod object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchAccessMethodWithDefaults

`func NewSearchAccessMethodWithDefaults() *SearchAccessMethod`

NewSearchAccessMethodWithDefaults instantiates a new SearchAccessMethod object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetAccessMethodId

`func (o *SearchAccessMethod) GetAccessMethodId() string`

GetAccessMethodId returns the AccessMethodId field if non-nil, zero value otherwise.

### GetAccessMethodIdOk

`func (o *SearchAccessMethod) GetAccessMethodIdOk() (*string, bool)`

GetAccessMethodIdOk returns a tuple with the AccessMethodId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAccessMethodId

`func (o *SearchAccessMethod) SetAccessMethodId(v string)`

SetAccessMethodId sets AccessMethodId field to given value.


### GetProtocol

`func (o *SearchAccessMethod) GetProtocol() string`

GetProtocol returns the Protocol field if non-nil, zero value otherwise.

### GetProtocolOk

`func (o *SearchAccessMethod) GetProtocolOk() (*string, bool)`

GetProtocolOk returns a tuple with the Protocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProtocol

`func (o *SearchAccessMethod) SetProtocol(v string)`

SetProtocol sets Protocol field to given value.


### GetScheme

`func (o *SearchAccessMethod) GetScheme() string`

GetScheme returns the Scheme field if non-nil, zero value otherwise.

### GetSchemeOk

`func (o *SearchAccessMethod) GetSchemeOk() (*string, bool)`

GetSchemeOk returns a tuple with the Scheme field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetScheme

`func (o *SearchAccessMethod) SetScheme(v string)`

SetScheme sets Scheme field to given value.

### HasScheme

`func (o *SearchAccessMethod) HasScheme() bool`

HasScheme returns a boolean if a field has been set.

### GetNetwork

`func (o *SearchAccessMethod) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *SearchAccessMethod) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *SearchAccessMethod) SetNetwork(v string)`

SetNetwork sets Network field to given value.

### HasNetwork

`func (o *SearchAccessMethod) HasNetwork() bool`

HasNetwork returns a boolean if a field has been set.

### GetAsset

`func (o *SearchAccessMethod) GetAsset() string`

GetAsset returns the Asset field if non-nil, zero value otherwise.

### GetAssetOk

`func (o *SearchAccessMethod) GetAssetOk() (*string, bool)`

GetAssetOk returns a tuple with the Asset field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAsset

`func (o *SearchAccessMethod) SetAsset(v string)`

SetAsset sets Asset field to given value.

### HasAsset

`func (o *SearchAccessMethod) HasAsset() bool`

HasAsset returns a boolean if a field has been set.

### GetAssetDecimals

`func (o *SearchAccessMethod) GetAssetDecimals() int32`

GetAssetDecimals returns the AssetDecimals field if non-nil, zero value otherwise.

### GetAssetDecimalsOk

`func (o *SearchAccessMethod) GetAssetDecimalsOk() (*int32, bool)`

GetAssetDecimalsOk returns a tuple with the AssetDecimals field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAssetDecimals

`func (o *SearchAccessMethod) SetAssetDecimals(v int32)`

SetAssetDecimals sets AssetDecimals field to given value.

### HasAssetDecimals

`func (o *SearchAccessMethod) HasAssetDecimals() bool`

HasAssetDecimals returns a boolean if a field has been set.

### GetPrice

`func (o *SearchAccessMethod) GetPrice() map[string]interface{}`

GetPrice returns the Price field if non-nil, zero value otherwise.

### GetPriceOk

`func (o *SearchAccessMethod) GetPriceOk() (*map[string]interface{}, bool)`

GetPriceOk returns a tuple with the Price field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPrice

`func (o *SearchAccessMethod) SetPrice(v map[string]interface{})`

SetPrice sets Price field to given value.


### GetMerchant

`func (o *SearchAccessMethod) GetMerchant() map[string]interface{}`

GetMerchant returns the Merchant field if non-nil, zero value otherwise.

### GetMerchantOk

`func (o *SearchAccessMethod) GetMerchantOk() (*map[string]interface{}, bool)`

GetMerchantOk returns a tuple with the Merchant field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMerchant

`func (o *SearchAccessMethod) SetMerchant(v map[string]interface{})`

SetMerchant sets Merchant field to given value.

### HasMerchant

`func (o *SearchAccessMethod) HasMerchant() bool`

HasMerchant returns a boolean if a field has been set.

### GetTerms

`func (o *SearchAccessMethod) GetTerms() map[string]interface{}`

GetTerms returns the Terms field if non-nil, zero value otherwise.

### GetTermsOk

`func (o *SearchAccessMethod) GetTermsOk() (*map[string]interface{}, bool)`

GetTermsOk returns a tuple with the Terms field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTerms

`func (o *SearchAccessMethod) SetTerms(v map[string]interface{})`

SetTerms sets Terms field to given value.

### HasTerms

`func (o *SearchAccessMethod) HasTerms() bool`

HasTerms returns a boolean if a field has been set.

### GetStatus

`func (o *SearchAccessMethod) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *SearchAccessMethod) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *SearchAccessMethod) SetStatus(v string)`

SetStatus sets Status field to given value.

### HasStatus

`func (o *SearchAccessMethod) HasStatus() bool`

HasStatus returns a boolean if a field has been set.

### GetWeftFetch

`func (o *SearchAccessMethod) GetWeftFetch() SearchWeftFetchCompatibility`

GetWeftFetch returns the WeftFetch field if non-nil, zero value otherwise.

### GetWeftFetchOk

`func (o *SearchAccessMethod) GetWeftFetchOk() (*SearchWeftFetchCompatibility, bool)`

GetWeftFetchOk returns a tuple with the WeftFetch field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWeftFetch

`func (o *SearchAccessMethod) SetWeftFetch(v SearchWeftFetchCompatibility)`

SetWeftFetch sets WeftFetch field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
