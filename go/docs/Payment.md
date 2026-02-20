# Payment

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **int32** |  | 
**TxHash** | **string** |  | 
**PayerAddress** | **string** |  | 
**RecipientAddress** | **string** |  | 
**Amount** | **int32** | Amount in atomic units (1 USDC &#x3D; 1,000,000) | 
**AmountFormatted** | **string** | Human-readable amount (e.g. \&quot;1.00 USDC\&quot;) | 
**Currency** | **string** |  | 
**Network** | **string** | CAIP-2 chain identifier | 
**ResourceUrl** | Pointer to **string** |  | [optional] 
**ResourceHost** | Pointer to **string** |  | [optional] 
**FeeAmount** | Pointer to **int32** |  | [optional] 
**SettlementLatencyMs** | Pointer to **int32** |  | [optional] 
**SettledAt** | **time.Time** |  | 
**ApiKeyName** | **string** |  | 

## Methods

### NewPayment

`func NewPayment(id int32, txHash string, payerAddress string, recipientAddress string, amount int32, amountFormatted string, currency string, network string, settledAt time.Time, apiKeyName string, ) *Payment`

NewPayment instantiates a new Payment object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewPaymentWithDefaults

`func NewPaymentWithDefaults() *Payment`

NewPaymentWithDefaults instantiates a new Payment object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *Payment) GetId() int32`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *Payment) GetIdOk() (*int32, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *Payment) SetId(v int32)`

SetId sets Id field to given value.


### GetTxHash

`func (o *Payment) GetTxHash() string`

GetTxHash returns the TxHash field if non-nil, zero value otherwise.

### GetTxHashOk

`func (o *Payment) GetTxHashOk() (*string, bool)`

GetTxHashOk returns a tuple with the TxHash field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTxHash

`func (o *Payment) SetTxHash(v string)`

SetTxHash sets TxHash field to given value.


### GetPayerAddress

`func (o *Payment) GetPayerAddress() string`

GetPayerAddress returns the PayerAddress field if non-nil, zero value otherwise.

### GetPayerAddressOk

`func (o *Payment) GetPayerAddressOk() (*string, bool)`

GetPayerAddressOk returns a tuple with the PayerAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPayerAddress

`func (o *Payment) SetPayerAddress(v string)`

SetPayerAddress sets PayerAddress field to given value.


### GetRecipientAddress

`func (o *Payment) GetRecipientAddress() string`

GetRecipientAddress returns the RecipientAddress field if non-nil, zero value otherwise.

### GetRecipientAddressOk

`func (o *Payment) GetRecipientAddressOk() (*string, bool)`

GetRecipientAddressOk returns a tuple with the RecipientAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipientAddress

`func (o *Payment) SetRecipientAddress(v string)`

SetRecipientAddress sets RecipientAddress field to given value.


### GetAmount

`func (o *Payment) GetAmount() int32`

GetAmount returns the Amount field if non-nil, zero value otherwise.

### GetAmountOk

`func (o *Payment) GetAmountOk() (*int32, bool)`

GetAmountOk returns a tuple with the Amount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAmount

`func (o *Payment) SetAmount(v int32)`

SetAmount sets Amount field to given value.


### GetAmountFormatted

`func (o *Payment) GetAmountFormatted() string`

GetAmountFormatted returns the AmountFormatted field if non-nil, zero value otherwise.

### GetAmountFormattedOk

`func (o *Payment) GetAmountFormattedOk() (*string, bool)`

GetAmountFormattedOk returns a tuple with the AmountFormatted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAmountFormatted

`func (o *Payment) SetAmountFormatted(v string)`

SetAmountFormatted sets AmountFormatted field to given value.


### GetCurrency

`func (o *Payment) GetCurrency() string`

GetCurrency returns the Currency field if non-nil, zero value otherwise.

### GetCurrencyOk

`func (o *Payment) GetCurrencyOk() (*string, bool)`

GetCurrencyOk returns a tuple with the Currency field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCurrency

`func (o *Payment) SetCurrency(v string)`

SetCurrency sets Currency field to given value.


### GetNetwork

`func (o *Payment) GetNetwork() string`

GetNetwork returns the Network field if non-nil, zero value otherwise.

### GetNetworkOk

`func (o *Payment) GetNetworkOk() (*string, bool)`

GetNetworkOk returns a tuple with the Network field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNetwork

`func (o *Payment) SetNetwork(v string)`

SetNetwork sets Network field to given value.


### GetResourceUrl

`func (o *Payment) GetResourceUrl() string`

GetResourceUrl returns the ResourceUrl field if non-nil, zero value otherwise.

### GetResourceUrlOk

`func (o *Payment) GetResourceUrlOk() (*string, bool)`

GetResourceUrlOk returns a tuple with the ResourceUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResourceUrl

`func (o *Payment) SetResourceUrl(v string)`

SetResourceUrl sets ResourceUrl field to given value.

### HasResourceUrl

`func (o *Payment) HasResourceUrl() bool`

HasResourceUrl returns a boolean if a field has been set.

### GetResourceHost

`func (o *Payment) GetResourceHost() string`

GetResourceHost returns the ResourceHost field if non-nil, zero value otherwise.

### GetResourceHostOk

`func (o *Payment) GetResourceHostOk() (*string, bool)`

GetResourceHostOk returns a tuple with the ResourceHost field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetResourceHost

`func (o *Payment) SetResourceHost(v string)`

SetResourceHost sets ResourceHost field to given value.

### HasResourceHost

`func (o *Payment) HasResourceHost() bool`

HasResourceHost returns a boolean if a field has been set.

### GetFeeAmount

`func (o *Payment) GetFeeAmount() int32`

GetFeeAmount returns the FeeAmount field if non-nil, zero value otherwise.

### GetFeeAmountOk

`func (o *Payment) GetFeeAmountOk() (*int32, bool)`

GetFeeAmountOk returns a tuple with the FeeAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFeeAmount

`func (o *Payment) SetFeeAmount(v int32)`

SetFeeAmount sets FeeAmount field to given value.

### HasFeeAmount

`func (o *Payment) HasFeeAmount() bool`

HasFeeAmount returns a boolean if a field has been set.

### GetSettlementLatencyMs

`func (o *Payment) GetSettlementLatencyMs() int32`

GetSettlementLatencyMs returns the SettlementLatencyMs field if non-nil, zero value otherwise.

### GetSettlementLatencyMsOk

`func (o *Payment) GetSettlementLatencyMsOk() (*int32, bool)`

GetSettlementLatencyMsOk returns a tuple with the SettlementLatencyMs field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettlementLatencyMs

`func (o *Payment) SetSettlementLatencyMs(v int32)`

SetSettlementLatencyMs sets SettlementLatencyMs field to given value.

### HasSettlementLatencyMs

`func (o *Payment) HasSettlementLatencyMs() bool`

HasSettlementLatencyMs returns a boolean if a field has been set.

### GetSettledAt

`func (o *Payment) GetSettledAt() time.Time`

GetSettledAt returns the SettledAt field if non-nil, zero value otherwise.

### GetSettledAtOk

`func (o *Payment) GetSettledAtOk() (*time.Time, bool)`

GetSettledAtOk returns a tuple with the SettledAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSettledAt

`func (o *Payment) SetSettledAt(v time.Time)`

SetSettledAt sets SettledAt field to given value.


### GetApiKeyName

`func (o *Payment) GetApiKeyName() string`

GetApiKeyName returns the ApiKeyName field if non-nil, zero value otherwise.

### GetApiKeyNameOk

`func (o *Payment) GetApiKeyNameOk() (*string, bool)`

GetApiKeyNameOk returns a tuple with the ApiKeyName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApiKeyName

`func (o *Payment) SetApiKeyName(v string)`

SetApiKeyName sets ApiKeyName field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


