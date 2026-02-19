# Weft::APIKeysApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**create_api_key**](APIKeysApi.md#create_api_key) | **POST** /api/v1/api_keys | Create an API key |
| [**list_api_keys**](APIKeysApi.md#list_api_keys) | **GET** /api/v1/api_keys | List API keys |
| [**revoke_api_key**](APIKeysApi.md#revoke_api_key) | **DELETE** /api/v1/api_keys/{id} | Revoke an API key |


## create_api_key

> <ApiKeyCreatedResponse> create_api_key(create_api_key_request)

Create an API key

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::APIKeysApi.new
create_api_key_request = Weft::CreateApiKeyRequest.new # CreateApiKeyRequest | 

begin
  # Create an API key
  result = api_instance.create_api_key(create_api_key_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->create_api_key: #{e}"
end
```

#### Using the create_api_key_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<ApiKeyCreatedResponse>, Integer, Hash)> create_api_key_with_http_info(create_api_key_request)

```ruby
begin
  # Create an API key
  data, status_code, headers = api_instance.create_api_key_with_http_info(create_api_key_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <ApiKeyCreatedResponse>
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->create_api_key_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **create_api_key_request** | [**CreateApiKeyRequest**](CreateApiKeyRequest.md) |  |  |

### Return type

[**ApiKeyCreatedResponse**](ApiKeyCreatedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## list_api_keys

> <ApiKeyListResponse> list_api_keys

List API keys

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::APIKeysApi.new

begin
  # List API keys
  result = api_instance.list_api_keys
  p result
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->list_api_keys: #{e}"
end
```

#### Using the list_api_keys_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<ApiKeyListResponse>, Integer, Hash)> list_api_keys_with_http_info

```ruby
begin
  # List API keys
  data, status_code, headers = api_instance.list_api_keys_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <ApiKeyListResponse>
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->list_api_keys_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ApiKeyListResponse**](ApiKeyListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## revoke_api_key

> <MessageResponse> revoke_api_key(id)

Revoke an API key

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::APIKeysApi.new
id = 56 # Integer | API key ID

begin
  # Revoke an API key
  result = api_instance.revoke_api_key(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->revoke_api_key: #{e}"
end
```

#### Using the revoke_api_key_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MessageResponse>, Integer, Hash)> revoke_api_key_with_http_info(id)

```ruby
begin
  # Revoke an API key
  data, status_code, headers = api_instance.revoke_api_key_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MessageResponse>
rescue Weft::ApiError => e
  puts "Error when calling APIKeysApi->revoke_api_key_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** | API key ID |  |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

