# Weft::AuthApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**confirm_account**](AuthApi.md#confirm_account) | **POST** /api/v1/auth/confirm | Confirm an account |
| [**request_password_reset**](AuthApi.md#request_password_reset) | **POST** /api/v1/auth/password/reset | Request password reset |
| [**resend_confirmation**](AuthApi.md#resend_confirmation) | **POST** /api/v1/auth/resend-confirmation | Resend confirmation email |
| [**sign_in**](AuthApi.md#sign_in) | **POST** /api/v1/auth/sign_in | Sign in with email and password |
| [**sign_up**](AuthApi.md#sign_up) | **POST** /api/v1/auth/sign_up | Create an account |
| [**update_password**](AuthApi.md#update_password) | **POST** /api/v1/auth/password/update | Update password with reset token |


## confirm_account

> <AuthResponse> confirm_account(confirm_request)

Confirm an account

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
confirm_request = Weft::ConfirmRequest.new({confirmation_token: 'confirmation_token_example'}) # ConfirmRequest | 

begin
  # Confirm an account
  result = api_instance.confirm_account(confirm_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->confirm_account: #{e}"
end
```

#### Using the confirm_account_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AuthResponse>, Integer, Hash)> confirm_account_with_http_info(confirm_request)

```ruby
begin
  # Confirm an account
  data, status_code, headers = api_instance.confirm_account_with_http_info(confirm_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AuthResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->confirm_account_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **confirm_request** | [**ConfirmRequest**](ConfirmRequest.md) |  |  |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## request_password_reset

> <MessageResponse> request_password_reset(password_reset_request)

Request password reset

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
password_reset_request = Weft::PasswordResetRequest.new({email: 'email_example'}) # PasswordResetRequest | 

begin
  # Request password reset
  result = api_instance.request_password_reset(password_reset_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->request_password_reset: #{e}"
end
```

#### Using the request_password_reset_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MessageResponse>, Integer, Hash)> request_password_reset_with_http_info(password_reset_request)

```ruby
begin
  # Request password reset
  data, status_code, headers = api_instance.request_password_reset_with_http_info(password_reset_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MessageResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->request_password_reset_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **password_reset_request** | [**PasswordResetRequest**](PasswordResetRequest.md) |  |  |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## resend_confirmation

> <MessageResponse> resend_confirmation(resend_confirmation_request)

Resend confirmation email

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
resend_confirmation_request = Weft::ResendConfirmationRequest.new({email: 'email_example'}) # ResendConfirmationRequest | 

begin
  # Resend confirmation email
  result = api_instance.resend_confirmation(resend_confirmation_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->resend_confirmation: #{e}"
end
```

#### Using the resend_confirmation_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MessageResponse>, Integer, Hash)> resend_confirmation_with_http_info(resend_confirmation_request)

```ruby
begin
  # Resend confirmation email
  data, status_code, headers = api_instance.resend_confirmation_with_http_info(resend_confirmation_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MessageResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->resend_confirmation_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **resend_confirmation_request** | [**ResendConfirmationRequest**](ResendConfirmationRequest.md) |  |  |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sign_in

> <AuthResponse> sign_in(sign_in_request)

Sign in with email and password

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
sign_in_request = Weft::SignInRequest.new({email: 'email_example', password: 'password_example'}) # SignInRequest | 

begin
  # Sign in with email and password
  result = api_instance.sign_in(sign_in_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->sign_in: #{e}"
end
```

#### Using the sign_in_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AuthResponse>, Integer, Hash)> sign_in_with_http_info(sign_in_request)

```ruby
begin
  # Sign in with email and password
  data, status_code, headers = api_instance.sign_in_with_http_info(sign_in_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AuthResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->sign_in_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **sign_in_request** | [**SignInRequest**](SignInRequest.md) |  |  |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## sign_up

> <AuthResponse> sign_up(sign_up_request)

Create an account

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
sign_up_request = Weft::SignUpRequest.new({email: 'email_example', password: 'password_example', password_confirmation: 'password_confirmation_example'}) # SignUpRequest | 

begin
  # Create an account
  result = api_instance.sign_up(sign_up_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->sign_up: #{e}"
end
```

#### Using the sign_up_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AuthResponse>, Integer, Hash)> sign_up_with_http_info(sign_up_request)

```ruby
begin
  # Create an account
  data, status_code, headers = api_instance.sign_up_with_http_info(sign_up_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AuthResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->sign_up_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **sign_up_request** | [**SignUpRequest**](SignUpRequest.md) |  |  |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## update_password

> <MessageResponse> update_password(password_update_request)

Update password with reset token

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AuthApi.new
password_update_request = Weft::PasswordUpdateRequest.new({reset_password_token: 'reset_password_token_example', password: 'password_example', password_confirmation: 'password_confirmation_example'}) # PasswordUpdateRequest | 

begin
  # Update password with reset token
  result = api_instance.update_password(password_update_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->update_password: #{e}"
end
```

#### Using the update_password_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MessageResponse>, Integer, Hash)> update_password_with_http_info(password_update_request)

```ruby
begin
  # Update password with reset token
  data, status_code, headers = api_instance.update_password_with_http_info(password_update_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MessageResponse>
rescue Weft::ApiError => e
  puts "Error when calling AuthApi->update_password_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **password_update_request** | [**PasswordUpdateRequest**](PasswordUpdateRequest.md) |  |  |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

