# AccountBootstrapStatus

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Id** | **string** |  |
**Status** | **string** |  |
**Capabilities** | **[]string** |  |
**ExpiresAt** | **NullableTime** | Claim-window expiry. Null after the credential is promoted. |
**Approval** | [**AccountBootstrapApproval**](AccountBootstrapApproval.md) |  |

## Methods

### NewAccountBootstrapStatus

`func NewAccountBootstrapStatus(id string, status string, capabilities []string, expiresAt NullableTime, approval AccountBootstrapApproval, ) *AccountBootstrapStatus`

NewAccountBootstrapStatus instantiates a new AccountBootstrapStatus object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewAccountBootstrapStatusWithDefaults

`func NewAccountBootstrapStatusWithDefaults() *AccountBootstrapStatus`

NewAccountBootstrapStatusWithDefaults instantiates a new AccountBootstrapStatus object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetId

`func (o *AccountBootstrapStatus) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *AccountBootstrapStatus) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *AccountBootstrapStatus) SetId(v string)`

SetId sets Id field to given value.


### GetStatus

`func (o *AccountBootstrapStatus) GetStatus() string`

GetStatus returns the Status field if non-nil, zero value otherwise.

### GetStatusOk

`func (o *AccountBootstrapStatus) GetStatusOk() (*string, bool)`

GetStatusOk returns a tuple with the Status field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetStatus

`func (o *AccountBootstrapStatus) SetStatus(v string)`

SetStatus sets Status field to given value.


### GetCapabilities

`func (o *AccountBootstrapStatus) GetCapabilities() []string`

GetCapabilities returns the Capabilities field if non-nil, zero value otherwise.

### GetCapabilitiesOk

`func (o *AccountBootstrapStatus) GetCapabilitiesOk() (*[]string, bool)`

GetCapabilitiesOk returns a tuple with the Capabilities field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCapabilities

`func (o *AccountBootstrapStatus) SetCapabilities(v []string)`

SetCapabilities sets Capabilities field to given value.


### GetExpiresAt

`func (o *AccountBootstrapStatus) GetExpiresAt() time.Time`

GetExpiresAt returns the ExpiresAt field if non-nil, zero value otherwise.

### GetExpiresAtOk

`func (o *AccountBootstrapStatus) GetExpiresAtOk() (*time.Time, bool)`

GetExpiresAtOk returns a tuple with the ExpiresAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetExpiresAt

`func (o *AccountBootstrapStatus) SetExpiresAt(v time.Time)`

SetExpiresAt sets ExpiresAt field to given value.


### SetExpiresAtNil

`func (o *AccountBootstrapStatus) SetExpiresAtNil(b bool)`

 SetExpiresAtNil sets the value for ExpiresAt to be an explicit nil

### UnsetExpiresAt
`func (o *AccountBootstrapStatus) UnsetExpiresAt()`

UnsetExpiresAt ensures that no value is present for ExpiresAt, not even an explicit nil
### GetApproval

`func (o *AccountBootstrapStatus) GetApproval() AccountBootstrapApproval`

GetApproval returns the Approval field if non-nil, zero value otherwise.

### GetApprovalOk

`func (o *AccountBootstrapStatus) GetApprovalOk() (*AccountBootstrapApproval, bool)`

GetApprovalOk returns a tuple with the Approval field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetApproval

`func (o *AccountBootstrapStatus) SetApproval(v AccountBootstrapApproval)`

SetApproval sets Approval field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
