# \AuthAPI

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ConfirmAccount**](AuthAPI.md#ConfirmAccount) | **Post** /api/v1/auth/confirm | Confirm an account
[**RequestPasswordReset**](AuthAPI.md#RequestPasswordReset) | **Post** /api/v1/auth/password/reset | Request password reset
[**ResendConfirmation**](AuthAPI.md#ResendConfirmation) | **Post** /api/v1/auth/resend-confirmation | Resend confirmation email
[**SignIn**](AuthAPI.md#SignIn) | **Post** /api/v1/auth/sign_in | Sign in with email and password
[**SignUp**](AuthAPI.md#SignUp) | **Post** /api/v1/auth/sign_up | Create an account
[**UpdatePassword**](AuthAPI.md#UpdatePassword) | **Post** /api/v1/auth/password/update | Update password with reset token



## ConfirmAccount

> AuthResponse ConfirmAccount(ctx).ConfirmRequest(confirmRequest).Execute()

Confirm an account

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	confirmRequest := *openapiclient.NewConfirmRequest("ConfirmationToken_example") // ConfirmRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.ConfirmAccount(context.Background()).ConfirmRequest(confirmRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.ConfirmAccount``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ConfirmAccount`: AuthResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.ConfirmAccount`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiConfirmAccountRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **confirmRequest** | [**ConfirmRequest**](ConfirmRequest.md) |  | 

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## RequestPasswordReset

> MessageResponse RequestPasswordReset(ctx).PasswordResetRequest(passwordResetRequest).Execute()

Request password reset

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	passwordResetRequest := *openapiclient.NewPasswordResetRequest("Email_example") // PasswordResetRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.RequestPasswordReset(context.Background()).PasswordResetRequest(passwordResetRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.RequestPasswordReset``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `RequestPasswordReset`: MessageResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.RequestPasswordReset`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiRequestPasswordResetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **passwordResetRequest** | [**PasswordResetRequest**](PasswordResetRequest.md) |  | 

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ResendConfirmation

> MessageResponse ResendConfirmation(ctx).ResendConfirmationRequest(resendConfirmationRequest).Execute()

Resend confirmation email

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	resendConfirmationRequest := *openapiclient.NewResendConfirmationRequest("Email_example") // ResendConfirmationRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.ResendConfirmation(context.Background()).ResendConfirmationRequest(resendConfirmationRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.ResendConfirmation``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ResendConfirmation`: MessageResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.ResendConfirmation`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiResendConfirmationRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resendConfirmationRequest** | [**ResendConfirmationRequest**](ResendConfirmationRequest.md) |  | 

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SignIn

> AuthResponse SignIn(ctx).SignInRequest(signInRequest).Execute()

Sign in with email and password

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	signInRequest := *openapiclient.NewSignInRequest("Email_example", "Password_example") // SignInRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.SignIn(context.Background()).SignInRequest(signInRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.SignIn``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SignIn`: AuthResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.SignIn`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSignInRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signInRequest** | [**SignInRequest**](SignInRequest.md) |  | 

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## SignUp

> AuthResponse SignUp(ctx).SignUpRequest(signUpRequest).Execute()

Create an account

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	signUpRequest := *openapiclient.NewSignUpRequest("Email_example", "Password_example", "PasswordConfirmation_example") // SignUpRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.SignUp(context.Background()).SignUpRequest(signUpRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.SignUp``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SignUp`: AuthResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.SignUp`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSignUpRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signUpRequest** | [**SignUpRequest**](SignUpRequest.md) |  | 

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdatePassword

> MessageResponse UpdatePassword(ctx).PasswordUpdateRequest(passwordUpdateRequest).Execute()

Update password with reset token

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	passwordUpdateRequest := *openapiclient.NewPasswordUpdateRequest("ResetPasswordToken_example", "Password_example", "PasswordConfirmation_example") // PasswordUpdateRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.UpdatePassword(context.Background()).PasswordUpdateRequest(passwordUpdateRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.UpdatePassword``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdatePassword`: MessageResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.UpdatePassword`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiUpdatePasswordRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **passwordUpdateRequest** | [**PasswordUpdateRequest**](PasswordUpdateRequest.md) |  | 

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

