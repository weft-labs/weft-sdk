# Weft::AgentBootstrapApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**cancel_account_bootstrap**](AgentBootstrapApi.md#cancel_account_bootstrap) | **DELETE** /api/v1/account_bootstraps/{id} | Cancel or revoke a bootstrap credential |
| [**create_account_bootstrap**](AgentBootstrapApi.md#create_account_bootstrap) | **POST** /api/v1/account_bootstraps | Create a temporary agent bootstrap |
| [**get_account_bootstrap**](AgentBootstrapApi.md#get_account_bootstrap) | **GET** /api/v1/account_bootstraps/{id} | Read bootstrap lifecycle status |


## cancel_account_bootstrap

> <AccountBootstrapStatusResponse> cancel_account_bootstrap(id)

Cancel or revoke a bootstrap credential

A pending bootstrap becomes rejected. A claimed promoted credential becomes revoked and fails every subsequent request immediately.

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (BootstrapToken): bootstrapAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AgentBootstrapApi.new
id = 'id_example' # String |

begin
  # Cancel or revoke a bootstrap credential
  result = api_instance.cancel_account_bootstrap(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->cancel_account_bootstrap: #{e}"
end
```

#### Using the cancel_account_bootstrap_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AccountBootstrapStatusResponse>, Integer, Hash)> cancel_account_bootstrap_with_http_info(id)

```ruby
begin
  # Cancel or revoke a bootstrap credential
  data, status_code, headers = api_instance.cancel_account_bootstrap_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AccountBootstrapStatusResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->cancel_account_bootstrap_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  |  |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## create_account_bootstrap

> <AccountBootstrapCreatedResponse> create_account_bootstrap(account_bootstrap_request)

Create a temporary agent bootstrap

Creates a 30-minute, search-only bootstrap and emails a separate claim link to the supplied address. Human approval binds the same `wbt_*` bearer to the account and promotes it to the fixed durable capability set. The response is deliberately identical for new and existing account emails and never contains the claim token. Rate limits apply per IP and normalized email; request bodies over 4 KiB are rejected before parsing. The bootstrap row and one-time credentials are committed only after the mail relay accepts the claim email. A retryable 503 leaves no bootstrap row behind.

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::AgentBootstrapApi.new
account_bootstrap_request = Weft::AccountBootstrapRequest.new({email: 'email_example', agent_name: 'agent_name_example'}) # AccountBootstrapRequest |

begin
  # Create a temporary agent bootstrap
  result = api_instance.create_account_bootstrap(account_bootstrap_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->create_account_bootstrap: #{e}"
end
```

#### Using the create_account_bootstrap_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AccountBootstrapCreatedResponse>, Integer, Hash)> create_account_bootstrap_with_http_info(account_bootstrap_request)

```ruby
begin
  # Create a temporary agent bootstrap
  data, status_code, headers = api_instance.create_account_bootstrap_with_http_info(account_bootstrap_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AccountBootstrapCreatedResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->create_account_bootstrap_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **account_bootstrap_request** | [**AccountBootstrapRequest**](AccountBootstrapRequest.md) |  |  |

### Return type

[**AccountBootstrapCreatedResponse**](AccountBootstrapCreatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## get_account_bootstrap

> <AccountBootstrapStatusResponse> get_account_bootstrap(id)

Read bootstrap lifecycle status

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (BootstrapToken): bootstrapAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AgentBootstrapApi.new
id = 'id_example' # String |

begin
  # Read bootstrap lifecycle status
  result = api_instance.get_account_bootstrap(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->get_account_bootstrap: #{e}"
end
```

#### Using the get_account_bootstrap_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AccountBootstrapStatusResponse>, Integer, Hash)> get_account_bootstrap_with_http_info(id)

```ruby
begin
  # Read bootstrap lifecycle status
  data, status_code, headers = api_instance.get_account_bootstrap_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AccountBootstrapStatusResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentBootstrapApi->get_account_bootstrap_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** |  |  |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json
