# SearchProviderRef

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ProviderId** | Pointer to **string** |  | [optional]
**DisplayName** | Pointer to **string** |  | [optional]
**OriginDomains** | Pointer to **[]string** |  | [optional]

## Methods

### NewSearchProviderRef

`func NewSearchProviderRef() *SearchProviderRef`

NewSearchProviderRef instantiates a new SearchProviderRef object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchProviderRefWithDefaults

`func NewSearchProviderRefWithDefaults() *SearchProviderRef`

NewSearchProviderRefWithDefaults instantiates a new SearchProviderRef object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProviderId

`func (o *SearchProviderRef) GetProviderId() string`

GetProviderId returns the ProviderId field if non-nil, zero value otherwise.

### GetProviderIdOk

`func (o *SearchProviderRef) GetProviderIdOk() (*string, bool)`

GetProviderIdOk returns a tuple with the ProviderId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProviderId

`func (o *SearchProviderRef) SetProviderId(v string)`

SetProviderId sets ProviderId field to given value.

### HasProviderId

`func (o *SearchProviderRef) HasProviderId() bool`

HasProviderId returns a boolean if a field has been set.

### GetDisplayName

`func (o *SearchProviderRef) GetDisplayName() string`

GetDisplayName returns the DisplayName field if non-nil, zero value otherwise.

### GetDisplayNameOk

`func (o *SearchProviderRef) GetDisplayNameOk() (*string, bool)`

GetDisplayNameOk returns a tuple with the DisplayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDisplayName

`func (o *SearchProviderRef) SetDisplayName(v string)`

SetDisplayName sets DisplayName field to given value.

### HasDisplayName

`func (o *SearchProviderRef) HasDisplayName() bool`

HasDisplayName returns a boolean if a field has been set.

### GetOriginDomains

`func (o *SearchProviderRef) GetOriginDomains() []string`

GetOriginDomains returns the OriginDomains field if non-nil, zero value otherwise.

### GetOriginDomainsOk

`func (o *SearchProviderRef) GetOriginDomainsOk() (*[]string, bool)`

GetOriginDomainsOk returns a tuple with the OriginDomains field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOriginDomains

`func (o *SearchProviderRef) SetOriginDomains(v []string)`

SetOriginDomains sets OriginDomains field to given value.

### HasOriginDomains

`func (o *SearchProviderRef) HasOriginDomains() bool`

HasOriginDomains returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
