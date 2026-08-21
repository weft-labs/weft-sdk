# AccountBootstrapCreated

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  |
**Status** | **string** |  |
**Capabilities** | **[]string** |  |
**ExpiresAt** | **time.Time** |  |
**Approval** | [**AccountBootstrapCreatedApproval**](AccountBootstrapCreatedApproval.md) |  |
**TemporaryApiKey** | **string** | Returned once. Store as a secret; it cannot be recovered. |
**DeviceCode** | **string** | Returned once. Poll the OAuth token endpoint with this secret. |

## Methods

### NewAccountBootstrapCreated

`func NewAccountBootstrapCreated(id string, status string, capabilities []string, expiresAt time.Time, approval AccountBootstrapCreatedApproval, temporaryApiKey string, deviceCode string, ) *AccountBootstrapCreated`

NewAccountBootstrapCreated instantiates a new AccountBootstrapCreated object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountBootstrapCreatedWithDefaults

`func NewAccountBootstrapCreatedWithDefaults() *AccountBootstrapCreated`

NewAccountBootstrapCreatedWithDefaults instantiates a new AccountBootstrapCreated object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *AccountBootstrapCreated) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *AccountBootstrapCreated) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *AccountBootstrapCreated) SetId(v string)`

SetId sets Id field to given value.


### GetStatus

`func (o *AccountBootstrapCreated) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *AccountBootstrapCreated) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *AccountBootstrapCreated) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetCapabilities

`func (o *AccountBootstrapCreated) GetCapabilities() []string`

GetCapabilities returns the Capabilities field if non-nil, zero value otherwise.

### GetCapabilitiesOk

`func (o *AccountBootstrapCreated) GetCapabilitiesOk() (*[]string, bool)`

GetCapabilitiesOk returns a tuple with the Capabilities field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCapabilities

`func (o *AccountBootstrapCreated) SetCapabilities(v []string)`

SetCapabilities sets Capabilities field to given value.


### GetExpiresAt

`func (o *AccountBootstrapCreated) GetExpiresAt() time.Time`

GetExpiresAt returns the ExpiresAt field if non-nil, zero value otherwise.

### GetExpiresAtOk

`func (o *AccountBootstrapCreated) GetExpiresAtOk() (*time.Time, bool)`

GetExpiresAtOk returns a tuple with the ExpiresAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresAt

`func (o *AccountBootstrapCreated) SetExpiresAt(v time.Time)`

SetExpiresAt sets ExpiresAt field to given value.


### GetApproval

`func (o *AccountBootstrapCreated) GetApproval() AccountBootstrapCreatedApproval`

GetApproval returns the Approval field if non-nil, zero value otherwise.

### GetApprovalOk

`func (o *AccountBootstrapCreated) GetApprovalOk() (*AccountBootstrapCreatedApproval, bool)`

GetApprovalOk returns a tuple with the Approval field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApproval

`func (o *AccountBootstrapCreated) SetApproval(v AccountBootstrapCreatedApproval)`

SetApproval sets Approval field to given value.


### GetTemporaryApiKey

`func (o *AccountBootstrapCreated) GetTemporaryApiKey() string`

GetTemporaryApiKey returns the TemporaryApiKey field if non-nil, zero value otherwise.

### GetTemporaryApiKeyOk

`func (o *AccountBootstrapCreated) GetTemporaryApiKeyOk() (*string, bool)`

GetTemporaryApiKeyOk returns a tuple with the TemporaryApiKey field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTemporaryApiKey

`func (o *AccountBootstrapCreated) SetTemporaryApiKey(v string)`

SetTemporaryApiKey sets TemporaryApiKey field to given value.


### GetDeviceCode

`func (o *AccountBootstrapCreated) GetDeviceCode() string`

GetDeviceCode returns the DeviceCode field if non-nil, zero value otherwise.

### GetDeviceCodeOk

`func (o *AccountBootstrapCreated) GetDeviceCodeOk() (*string, bool)`

GetDeviceCodeOk returns a tuple with the DeviceCode field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDeviceCode

`func (o *AccountBootstrapCreated) SetDeviceCode(v string)`

SetDeviceCode sets DeviceCode field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
