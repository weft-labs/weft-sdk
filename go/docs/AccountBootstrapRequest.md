# AccountBootstrapRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Email** | **string** |  |
**AgentName** | **string** |  |
**HostName** | Pointer to **string** |  | [optional]
**Reason** | Pointer to **string** |  | [optional]
**OauthClientId** | Pointer to **string** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional]
**RequestedScopes** | Pointer to **[]string** | Transitional compatibility for older CLI releases that use OAuth device exchange. | [optional]

## Methods

### NewAccountBootstrapRequest

`func NewAccountBootstrapRequest(email string, agentName string, ) *AccountBootstrapRequest`

NewAccountBootstrapRequest instantiates a new AccountBootstrapRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountBootstrapRequestWithDefaults

`func NewAccountBootstrapRequestWithDefaults() *AccountBootstrapRequest`

NewAccountBootstrapRequestWithDefaults instantiates a new AccountBootstrapRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetEmail

`func (o *AccountBootstrapRequest) GetEmail() string`

GetEmail returns the Email field if non-nil, zero value otherwise.

### GetEmailOk

`func (o *AccountBootstrapRequest) GetEmailOk() (*string, bool)`

GetEmailOk returns a tuple with the Email field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEmail

`func (o *AccountBootstrapRequest) SetEmail(v string)`

SetEmail sets Email field to given value.


### GetAgentName

`func (o *AccountBootstrapRequest) GetAgentName() string`

GetAgentName returns the AgentName field if non-nil, zero value otherwise.

### GetAgentNameOk

`func (o *AccountBootstrapRequest) GetAgentNameOk() (*string, bool)`

GetAgentNameOk returns a tuple with the AgentName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetAgentName

`func (o *AccountBootstrapRequest) SetAgentName(v string)`

SetAgentName sets AgentName field to given value.


### GetHostName

`func (o *AccountBootstrapRequest) GetHostName() string`

GetHostName returns the HostName field if non-nil, zero value otherwise.

### GetHostNameOk

`func (o *AccountBootstrapRequest) GetHostNameOk() (*string, bool)`

GetHostNameOk returns a tuple with the HostName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetHostName

`func (o *AccountBootstrapRequest) SetHostName(v string)`

SetHostName sets HostName field to given value.

### HasHostName

`func (o *AccountBootstrapRequest) HasHostName() bool`

HasHostName returns a boolean if a field has been set.

### GetReason

`func (o *AccountBootstrapRequest) GetReason() string`

GetReason returns the Reason field if non-nil, zero value otherwise.

### GetReasonOk

`func (o *AccountBootstrapRequest) GetReasonOk() (*string, bool)`

GetReasonOk returns a tuple with the Reason field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReason

`func (o *AccountBootstrapRequest) SetReason(v string)`

SetReason sets Reason field to given value.

### HasReason

`func (o *AccountBootstrapRequest) HasReason() bool`

HasReason returns a boolean if a field has been set.

### GetOauthClientId

`func (o *AccountBootstrapRequest) GetOauthClientId() string`

GetOauthClientId returns the OauthClientId field if non-nil, zero value otherwise.

### GetOauthClientIdOk

`func (o *AccountBootstrapRequest) GetOauthClientIdOk() (*string, bool)`

GetOauthClientIdOk returns a tuple with the OauthClientId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOauthClientId

`func (o *AccountBootstrapRequest) SetOauthClientId(v string)`

SetOauthClientId sets OauthClientId field to given value.

### HasOauthClientId

`func (o *AccountBootstrapRequest) HasOauthClientId() bool`

HasOauthClientId returns a boolean if a field has been set.

### GetRequestedScopes

`func (o *AccountBootstrapRequest) GetRequestedScopes() []string`

GetRequestedScopes returns the RequestedScopes field if non-nil, zero value otherwise.

### GetRequestedScopesOk

`func (o *AccountBootstrapRequest) GetRequestedScopesOk() (*[]string, bool)`

GetRequestedScopesOk returns a tuple with the RequestedScopes field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRequestedScopes

`func (o *AccountBootstrapRequest) SetRequestedScopes(v []string)`

SetRequestedScopes sets RequestedScopes field to given value.

### HasRequestedScopes

`func (o *AccountBootstrapRequest) HasRequestedScopes() bool`

HasRequestedScopes returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
