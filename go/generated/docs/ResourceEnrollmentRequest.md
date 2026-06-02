# ResourceEnrollmentRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Kind** | **string** | Resource kind. Must be one of the supported kinds (currently &#x60;agent&#x60;); an unknown value is rejected with a 422.  | 
**Name** | **string** | Human-readable name; the server derives the slug from it. | 
**Description** | Pointer to **string** |  | [optional] 
**WalletAddress** | Pointer to **string** | Declared EVM wallet address for the ghost resource. Stored as a claim (unverified) until the resource is claimed.  | [optional] 

## Methods

### NewResourceEnrollmentRequest

`func NewResourceEnrollmentRequest(kind string, name string, ) *ResourceEnrollmentRequest`

NewResourceEnrollmentRequest instantiates a new ResourceEnrollmentRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewResourceEnrollmentRequestWithDefaults

`func NewResourceEnrollmentRequestWithDefaults() *ResourceEnrollmentRequest`

NewResourceEnrollmentRequestWithDefaults instantiates a new ResourceEnrollmentRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetKind

`func (o *ResourceEnrollmentRequest) GetKind() string`

GetKind returns the Kind field if non-nil, zero value otherwise.

### GetKindOk

`func (o *ResourceEnrollmentRequest) GetKindOk() (*string, bool)`

GetKindOk returns a tuple with the Kind field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetKind

`func (o *ResourceEnrollmentRequest) SetKind(v string)`

SetKind sets Kind field to given value.


### GetName

`func (o *ResourceEnrollmentRequest) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *ResourceEnrollmentRequest) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *ResourceEnrollmentRequest) SetName(v string)`

SetName sets Name field to given value.


### GetDescription

`func (o *ResourceEnrollmentRequest) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *ResourceEnrollmentRequest) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *ResourceEnrollmentRequest) SetDescription(v string)`

SetDescription sets Description field to given value.

### HasDescription

`func (o *ResourceEnrollmentRequest) HasDescription() bool`

HasDescription returns a boolean if a field has been set.

### GetWalletAddress

`func (o *ResourceEnrollmentRequest) GetWalletAddress() string`

GetWalletAddress returns the WalletAddress field if non-nil, zero value otherwise.

### GetWalletAddressOk

`func (o *ResourceEnrollmentRequest) GetWalletAddressOk() (*string, bool)`

GetWalletAddressOk returns a tuple with the WalletAddress field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWalletAddress

`func (o *ResourceEnrollmentRequest) SetWalletAddress(v string)`

SetWalletAddress sets WalletAddress field to given value.

### HasWalletAddress

`func (o *ResourceEnrollmentRequest) HasWalletAddress() bool`

HasWalletAddress returns a boolean if a field has been set.


[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


