# CreateWebhookEndpointRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Url** | **string** | HTTPS URL to send webhook events to | 
**Events** | **[]string** | List of event types to subscribe to | 
**Description** | Pointer to **string** | Optional label for this endpoint | [optional] 

## Methods

### NewCreateWebhookEndpointRequest

`func NewCreateWebhookEndpointRequest(url string, events []string, ) *CreateWebhookEndpointRequest`

NewCreateWebhookEndpointRequest instantiates a new CreateWebhookEndpointRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewCreateWebhookEndpointRequestWithDefaults

`func NewCreateWebhookEndpointRequestWithDefaults() *CreateWebhookEndpointRequest`

NewCreateWebhookEndpointRequestWithDefaults instantiates a new CreateWebhookEndpointRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetUrl

`func (o *CreateWebhookEndpointRequest) GetUrl() string`

GetUrl returns the Url field if non-nil, zero value otherwise.

### GetUrlOk

`func (o *CreateWebhookEndpointRequest) GetUrlOk() (*string, bool)`

GetUrlOk returns a tuple with the Url field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUrl

`func (o *CreateWebhookEndpointRequest) SetUrl(v string)`

SetUrl sets Url field to given value.


### GetEvents

`func (o *CreateWebhookEndpointRequest) GetEvents() []string`

GetEvents returns the Events field if non-nil, zero value otherwise.

### GetEventsOk

`func (o *CreateWebhookEndpointRequest) GetEventsOk() (*[]string, bool)`

GetEventsOk returns a tuple with the Events field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEvents

`func (o *CreateWebhookEndpointRequest) SetEvents(v []string)`

SetEvents sets Events field to given value.


### GetDescription

`func (o *CreateWebhookEndpointRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *CreateWebhookEndpointRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *CreateWebhookEndpointRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *CreateWebhookEndpointRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


