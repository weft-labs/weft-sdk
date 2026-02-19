# Weft::AgentsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_agent**](AgentsApi.md#get_agent) | **GET** /api/v1/agents/{id} | Get agent details |
| [**list_agents**](AgentsApi.md#list_agents) | **GET** /api/v1/agents | List agents |


## get_agent

> <AgentResponse> get_agent(id)

Get agent details

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AgentsApi.new
id = 'id_example' # String | Agent ID or slug

begin
  # Get agent details
  result = api_instance.get_agent(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->get_agent: #{e}"
end
```

#### Using the get_agent_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AgentResponse>, Integer, Hash)> get_agent_with_http_info(id)

```ruby
begin
  # Get agent details
  data, status_code, headers = api_instance.get_agent_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AgentResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->get_agent_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** | Agent ID or slug |  |

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## list_agents

> <AgentListResponse> list_agents(opts)

List agents

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AgentsApi.new
opts = {
  page: 56, # Integer | Page number
  per_page: 56 # Integer | Items per page
}

begin
  # List agents
  result = api_instance.list_agents(opts)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->list_agents: #{e}"
end
```

#### Using the list_agents_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AgentListResponse>, Integer, Hash)> list_agents_with_http_info(opts)

```ruby
begin
  # List agents
  data, status_code, headers = api_instance.list_agents_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AgentListResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->list_agents_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **page** | **Integer** | Page number | [optional][default to 1] |
| **per_page** | **Integer** | Items per page | [optional][default to 25] |

### Return type

[**AgentListResponse**](AgentListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

