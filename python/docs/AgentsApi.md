# weft_sdk.generated.AgentsApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_agent**](AgentsApi.md#create_agent) | **POST** /api/v1/agents | Create an agent
[**get_agent**](AgentsApi.md#get_agent) | **GET** /api/v1/agents/{id} | Get agent details
[**list_agents**](AgentsApi.md#list_agents) | **GET** /api/v1/agents | List agents
[**update_agent**](AgentsApi.md#update_agent) | **PATCH** /api/v1/agents/{id} | Update an agent


# **create_agent**
> AgentResponse create_agent(create_agent_request)

Create an agent

### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.agent_response import AgentResponse
from weft_sdk.generated.models.create_agent_request import CreateAgentRequest
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (APIKey): bearerAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentsApi(api_client)
    create_agent_request = weft_sdk.generated.CreateAgentRequest() # CreateAgentRequest | 

    try:
        # Create an agent
        api_response = api_instance.create_agent(create_agent_request)
        print("The response of AgentsApi->create_agent:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentsApi->create_agent: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **create_agent_request** | [**CreateAgentRequest**](CreateAgentRequest.md)|  | 

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Agent created |  -  |
**401** | Unauthorized |  -  |
**422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_agent**
> AgentResponse get_agent(id)

Get agent details

### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.agent_response import AgentResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (APIKey): bearerAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentsApi(api_client)
    id = 'id_example' # str | Agent ID or slug

    try:
        # Get agent details
        api_response = api_instance.get_agent(id)
        print("The response of AgentsApi->get_agent:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentsApi->get_agent: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| Agent ID or slug | 

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Agent details |  -  |
**401** | Unauthorized |  -  |
**404** | Agent not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_agents**
> AgentListResponse list_agents(page=page, per_page=per_page)

List agents

### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.agent_list_response import AgentListResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (APIKey): bearerAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentsApi(api_client)
    page = 1 # int | Page number (optional) (default to 1)
    per_page = 25 # int | Items per page (optional) (default to 25)

    try:
        # List agents
        api_response = api_instance.list_agents(page=page, per_page=per_page)
        print("The response of AgentsApi->list_agents:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentsApi->list_agents: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int**| Page number | [optional] [default to 1]
 **per_page** | **int**| Items per page | [optional] [default to 25]

### Return type

[**AgentListResponse**](AgentListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of agents |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_agent**
> AgentResponse update_agent(id, update_agent_request)

Update an agent

### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.agent_response import AgentResponse
from weft_sdk.generated.models.update_agent_request import UpdateAgentRequest
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (APIKey): bearerAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentsApi(api_client)
    id = 'id_example' # str | Agent ID or slug
    update_agent_request = weft_sdk.generated.UpdateAgentRequest() # UpdateAgentRequest | 

    try:
        # Update an agent
        api_response = api_instance.update_agent(id, update_agent_request)
        print("The response of AgentsApi->update_agent:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentsApi->update_agent: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**| Agent ID or slug | 
 **update_agent_request** | [**UpdateAgentRequest**](UpdateAgentRequest.md)|  | 

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Agent updated |  -  |
**401** | Unauthorized |  -  |
**404** | Agent not found |  -  |
**422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

