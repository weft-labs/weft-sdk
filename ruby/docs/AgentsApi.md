# Weft::AgentsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**create_agent**](AgentsApi.md#create_agent) | **POST** /api/v1/agents | Create an agent |
| [**get_agent**](AgentsApi.md#get_agent) | **GET** /api/v1/agents/{id} | Get agent details |
| [**list_agents**](AgentsApi.md#list_agents) | **GET** /api/v1/agents | List agents |
| [**update_agent**](AgentsApi.md#update_agent) | **PATCH** /api/v1/agents/{id} | Update an agent |


## create_agent

> <AgentResponse> create_agent(create_agent_request)

Create an agent

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
create_agent_request = Weft::CreateAgentRequest.new({name: 'name_example', wallet_address: 'wallet_address_example'}) # CreateAgentRequest | 

begin
  # Create an agent
  result = api_instance.create_agent(create_agent_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->create_agent: #{e}"
end
```

#### Using the create_agent_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AgentResponse>, Integer, Hash)> create_agent_with_http_info(create_agent_request)

```ruby
begin
  # Create an agent
  data, status_code, headers = api_instance.create_agent_with_http_info(create_agent_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AgentResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->create_agent_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **create_agent_request** | [**CreateAgentRequest**](CreateAgentRequest.md) |  |  |

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


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


## update_agent

> <AgentResponse> update_agent(id, update_agent_request)

Update an agent

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
update_agent_request = Weft::UpdateAgentRequest.new # UpdateAgentRequest | 

begin
  # Update an agent
  result = api_instance.update_agent(id, update_agent_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->update_agent: #{e}"
end
```

#### Using the update_agent_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AgentResponse>, Integer, Hash)> update_agent_with_http_info(id, update_agent_request)

```ruby
begin
  # Update an agent
  data, status_code, headers = api_instance.update_agent_with_http_info(id, update_agent_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AgentResponse>
rescue Weft::ApiError => e
  puts "Error when calling AgentsApi->update_agent_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **String** | Agent ID or slug |  |
| **update_agent_request** | [**UpdateAgentRequest**](UpdateAgentRequest.md) |  |  |

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

