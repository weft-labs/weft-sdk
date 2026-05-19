# SearchFilters

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**MinPriceUsd** | Pointer to **string** | Decimal USD floor; agent must have at least one skill priced at or above this. | [optional] 
**MaxPriceUsd** | Pointer to **string** | Decimal USD ceiling; agent must have at least one skill priced at or below this. | [optional] 
**PaymentProtocol** | Pointer to **string** | Payment protocol the agent settles on. | [optional] 
**AgentProtocol** | Pointer to **string** | Agent protocol surface (Agent-to-Agent, MCP, or raw OpenAPI). | [optional] 
**Domain** | Pointer to **string** | Substring match against any of the agent&#39;s declared domain tags (e.g. &#x60;email&#x60;, &#x60;sales&#x60;, &#x60;enrichment&#x60;).  | [optional] 

## Methods

### NewSearchFilters

`func NewSearchFilters() *SearchFilters`

NewSearchFilters instantiates a new SearchFilters object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSearchFiltersWithDefaults

`func NewSearchFiltersWithDefaults() *SearchFilters`

NewSearchFiltersWithDefaults instantiates a new SearchFilters object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMinPriceUsd

`func (o *SearchFilters) GetMinPriceUsd() string`

GetMinPriceUsd returns the MinPriceUsd field if non-nil, zero value otherwise.

### GetMinPriceUsdOk

`func (o *SearchFilters) GetMinPriceUsdOk() (*string, bool)`

GetMinPriceUsdOk returns a tuple with the MinPriceUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMinPriceUsd

`func (o *SearchFilters) SetMinPriceUsd(v string)`

SetMinPriceUsd sets MinPriceUsd field to given value.

### HasMinPriceUsd

`func (o *SearchFilters) HasMinPriceUsd() bool`

HasMinPriceUsd returns a boolean if a field has been set.

### GetMaxPriceUsd

`func (o *SearchFilters) GetMaxPriceUsd() string`

GetMaxPriceUsd returns the MaxPriceUsd field if non-nil, zero value otherwise.

### GetMaxPriceUsdOk

`func (o *SearchFilters) GetMaxPriceUsdOk() (*string, bool)`

GetMaxPriceUsdOk returns a tuple with the MaxPriceUsd field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMaxPriceUsd

`func (o *SearchFilters) SetMaxPriceUsd(v string)`

SetMaxPriceUsd sets MaxPriceUsd field to given value.

### HasMaxPriceUsd

`func (o *SearchFilters) HasMaxPriceUsd() bool`

HasMaxPriceUsd returns a boolean if a field has been set.

### GetPaymentProtocol

`func (o *SearchFilters) GetPaymentProtocol() string`

GetPaymentProtocol returns the PaymentProtocol field if non-nil, zero value otherwise.

### GetPaymentProtocolOk

`func (o *SearchFilters) GetPaymentProtocolOk() (*string, bool)`

GetPaymentProtocolOk returns a tuple with the PaymentProtocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPaymentProtocol

`func (o *SearchFilters) SetPaymentProtocol(v string)`

SetPaymentProtocol sets PaymentProtocol field to given value.

### HasPaymentProtocol

`func (o *SearchFilters) HasPaymentProtocol() bool`

HasPaymentProtocol returns a boolean if a field has been set.

### GetAgentProtocol

`func (o *SearchFilters) GetAgentProtocol() string`

GetAgentProtocol returns the AgentProtocol field if non-nil, zero value otherwise.

### GetAgentProtocolOk

`func (o *SearchFilters) GetAgentProtocolOk() (*string, bool)`

GetAgentProtocolOk returns a tuple with the AgentProtocol field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAgentProtocol

`func (o *SearchFilters) SetAgentProtocol(v string)`

SetAgentProtocol sets AgentProtocol field to given value.

### HasAgentProtocol

`func (o *SearchFilters) HasAgentProtocol() bool`

HasAgentProtocol returns a boolean if a field has been set.

### GetDomain

`func (o *SearchFilters) GetDomain() string`

GetDomain returns the Domain field if non-nil, zero value otherwise.

### GetDomainOk

`func (o *SearchFilters) GetDomainOk() (*string, bool)`

GetDomainOk returns a tuple with the Domain field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDomain

`func (o *SearchFilters) SetDomain(v string)`

SetDomain sets Domain field to given value.

### HasDomain

`func (o *SearchFilters) HasDomain() bool`

HasDomain returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


