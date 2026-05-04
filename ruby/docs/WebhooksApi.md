# Weft::WebhooksApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**create_webhook_endpoint**](WebhooksApi.md#create_webhook_endpoint) | **POST** /api/v1/webhook_endpoints | Create a webhook endpoint |
| [**delete_webhook_endpoint**](WebhooksApi.md#delete_webhook_endpoint) | **DELETE** /api/v1/webhook_endpoints/{id} | Delete a webhook endpoint |
| [**get_webhook_endpoint**](WebhooksApi.md#get_webhook_endpoint) | **GET** /api/v1/webhook_endpoints/{id} | Get a webhook endpoint |
| [**list_webhook_endpoints**](WebhooksApi.md#list_webhook_endpoints) | **GET** /api/v1/webhook_endpoints | List webhook endpoints |
| [**update_webhook_endpoint**](WebhooksApi.md#update_webhook_endpoint) | **PATCH** /api/v1/webhook_endpoints/{id} | Update a webhook endpoint |


## create_webhook_endpoint

> <WebhookEndpointCreatedResponse> create_webhook_endpoint(create_webhook_endpoint_request)

Create a webhook endpoint

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::WebhooksApi.new
create_webhook_endpoint_request = Weft::CreateWebhookEndpointRequest.new({url: 'url_example', events: ['payment.received']}) # CreateWebhookEndpointRequest | 

begin
  # Create a webhook endpoint
  result = api_instance.create_webhook_endpoint(create_webhook_endpoint_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->create_webhook_endpoint: #{e}"
end
```

#### Using the create_webhook_endpoint_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<WebhookEndpointCreatedResponse>, Integer, Hash)> create_webhook_endpoint_with_http_info(create_webhook_endpoint_request)

```ruby
begin
  # Create a webhook endpoint
  data, status_code, headers = api_instance.create_webhook_endpoint_with_http_info(create_webhook_endpoint_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <WebhookEndpointCreatedResponse>
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->create_webhook_endpoint_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **create_webhook_endpoint_request** | [**CreateWebhookEndpointRequest**](CreateWebhookEndpointRequest.md) |  |  |

### Return type

[**WebhookEndpointCreatedResponse**](WebhookEndpointCreatedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## delete_webhook_endpoint

> <MessageResponse> delete_webhook_endpoint(id)

Delete a webhook endpoint

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::WebhooksApi.new
id = 56 # Integer | 

begin
  # Delete a webhook endpoint
  result = api_instance.delete_webhook_endpoint(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->delete_webhook_endpoint: #{e}"
end
```

#### Using the delete_webhook_endpoint_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MessageResponse>, Integer, Hash)> delete_webhook_endpoint_with_http_info(id)

```ruby
begin
  # Delete a webhook endpoint
  data, status_code, headers = api_instance.delete_webhook_endpoint_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MessageResponse>
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->delete_webhook_endpoint_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_webhook_endpoint

> <WebhookEndpointResponse> get_webhook_endpoint(id)

Get a webhook endpoint

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::WebhooksApi.new
id = 56 # Integer | 

begin
  # Get a webhook endpoint
  result = api_instance.get_webhook_endpoint(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->get_webhook_endpoint: #{e}"
end
```

#### Using the get_webhook_endpoint_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<WebhookEndpointResponse>, Integer, Hash)> get_webhook_endpoint_with_http_info(id)

```ruby
begin
  # Get a webhook endpoint
  data, status_code, headers = api_instance.get_webhook_endpoint_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <WebhookEndpointResponse>
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->get_webhook_endpoint_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## list_webhook_endpoints

> <WebhookEndpointListResponse> list_webhook_endpoints(opts)

List webhook endpoints

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::WebhooksApi.new
opts = {
  page: 56, # Integer | 
  per_page: 56 # Integer | 
}

begin
  # List webhook endpoints
  result = api_instance.list_webhook_endpoints(opts)
  p result
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->list_webhook_endpoints: #{e}"
end
```

#### Using the list_webhook_endpoints_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<WebhookEndpointListResponse>, Integer, Hash)> list_webhook_endpoints_with_http_info(opts)

```ruby
begin
  # List webhook endpoints
  data, status_code, headers = api_instance.list_webhook_endpoints_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <WebhookEndpointListResponse>
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->list_webhook_endpoints_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **page** | **Integer** |  | [optional][default to 1] |
| **per_page** | **Integer** |  | [optional][default to 25] |

### Return type

[**WebhookEndpointListResponse**](WebhookEndpointListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## update_webhook_endpoint

> <WebhookEndpointResponse> update_webhook_endpoint(id, update_webhook_endpoint_request)

Update a webhook endpoint

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::WebhooksApi.new
id = 56 # Integer | 
update_webhook_endpoint_request = Weft::UpdateWebhookEndpointRequest.new # UpdateWebhookEndpointRequest | 

begin
  # Update a webhook endpoint
  result = api_instance.update_webhook_endpoint(id, update_webhook_endpoint_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->update_webhook_endpoint: #{e}"
end
```

#### Using the update_webhook_endpoint_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<WebhookEndpointResponse>, Integer, Hash)> update_webhook_endpoint_with_http_info(id, update_webhook_endpoint_request)

```ruby
begin
  # Update a webhook endpoint
  data, status_code, headers = api_instance.update_webhook_endpoint_with_http_info(id, update_webhook_endpoint_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <WebhookEndpointResponse>
rescue Weft::ApiError => e
  puts "Error when calling WebhooksApi->update_webhook_endpoint_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** |  |  |
| **update_webhook_endpoint_request** | [**UpdateWebhookEndpointRequest**](UpdateWebhookEndpointRequest.md) |  |  |

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

