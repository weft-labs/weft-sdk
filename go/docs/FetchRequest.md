# FetchRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Url** | **string** | Target URL. Must pass Weft&#39;s URL safety check (no SSRF / private IP ranges). | 
**MaxCostUsd** | Pointer to **string** | Hard ceiling on what the buyer is willing to pay. Defaults to &#x60;0.10&#x60; USD. | [optional] [default to "0.10"]
**Method** | Pointer to **string** | HTTP method to use against the upstream. | [optional] [default to "GET"]
**Body** | Pointer to [**NullableFetchRequestBody**](FetchRequestBody.md) |  | [optional] 
**Headers** | Pointer to **map[string]string** | Headers forwarded to the upstream. Up to 32 headers, 4 KB total. The following are silently stripped: &#x60;host&#x60;, &#x60;authorization&#x60;, &#x60;cookie&#x60;, &#x60;proxy-authorization&#x60;, &#x60;x-forwarded-*&#x60;, &#x60;x-real-ip&#x60;, &#x60;x-payment&#x60;, &#x60;connection&#x60;, &#x60;upgrade&#x60;.  | [optional] 

## Methods

### NewFetchRequest

`func NewFetchRequest(url string, ) *FetchRequest`

NewFetchRequest instantiates a new FetchRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewFetchRequestWithDefaults

`func NewFetchRequestWithDefaults() *FetchRequest`

NewFetchRequestWithDefaults instantiates a new FetchRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUrl

`func (o *FetchRequest) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *FetchRequest) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *FetchRequest) SetUrl(v string)`

SetUrl sets Url field to given value.


### GetMaxCostUsd

`func (o *FetchRequest) GetMaxCostUsd() string`

GetMaxCostUsd returns the MaxCostUsd field if non-nil, zero value otherwise.

### GetMaxCostUsdOk

`func (o *FetchRequest) GetMaxCostUsdOk() (*string, bool)`

GetMaxCostUsdOk returns a tuple with the MaxCostUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxCostUsd

`func (o *FetchRequest) SetMaxCostUsd(v string)`

SetMaxCostUsd sets MaxCostUsd field to given value.

### HasMaxCostUsd

`func (o *FetchRequest) HasMaxCostUsd() bool`

HasMaxCostUsd returns a boolean if a field has been set.

### GetMethod

`func (o *FetchRequest) GetMethod() string`

GetMethod returns the Method field if non-nil, zero value otherwise.

### GetMethodOk

`func (o *FetchRequest) GetMethodOk() (*string, bool)`

GetMethodOk returns a tuple with the Method field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMethod

`func (o *FetchRequest) SetMethod(v string)`

SetMethod sets Method field to given value.

### HasMethod

`func (o *FetchRequest) HasMethod() bool`

HasMethod returns a boolean if a field has been set.

### GetBody

`func (o *FetchRequest) GetBody() FetchRequestBody`

GetBody returns the Body field if non-nil, zero value otherwise.

### GetBodyOk

`func (o *FetchRequest) GetBodyOk() (*FetchRequestBody, bool)`

GetBodyOk returns a tuple with the Body field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBody

`func (o *FetchRequest) SetBody(v FetchRequestBody)`

SetBody sets Body field to given value.

### HasBody

`func (o *FetchRequest) HasBody() bool`

HasBody returns a boolean if a field has been set.

### SetBodyNil

`func (o *FetchRequest) SetBodyNil(b bool)`

 SetBodyNil sets the value for Body to be an explicit nil

### UnsetBody
`func (o *FetchRequest) UnsetBody()`

UnsetBody ensures that no value is present for Body, not even an explicit nil
### GetHeaders

`func (o *FetchRequest) GetHeaders() map[string]string`

GetHeaders returns the Headers field if non-nil, zero value otherwise.

### GetHeadersOk

`func (o *FetchRequest) GetHeadersOk() (*map[string]string, bool)`

GetHeadersOk returns a tuple with the Headers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHeaders

`func (o *FetchRequest) SetHeaders(v map[string]string)`

SetHeaders sets Headers field to given value.

### HasHeaders

`func (o *FetchRequest) HasHeaders() bool`

HasHeaders returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


