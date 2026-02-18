# AgentsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getAgent**](AgentsApi.md#getagent) | **GET** /api/v1/agents/{id} | Get agent details |
| [**listAgents**](AgentsApi.md#listagents) | **GET** /api/v1/agents | List agents |



## getAgent

> AgentResponse getAgent(id)

Get agent details

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '@weft/sdk';
import type { GetAgentRequest } from '@weft/sdk';

async function example() {
  console.log("🚀 Testing @weft/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // string | Agent ID or slug
    id: id_example,
  } satisfies GetAgentRequest;

  try {
    const data = await api.getAgent(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | Agent ID or slug | [Defaults to `undefined`] |

### Return type

[**AgentResponse**](AgentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Agent details |  -  |
| **401** | Unauthorized |  -  |
| **404** | Agent not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listAgents

> AgentListResponse listAgents(page, perPage)

List agents

### Example

```ts
import {
  Configuration,
  AgentsApi,
} from '@weft/sdk';
import type { ListAgentsRequest } from '@weft/sdk';

async function example() {
  console.log("🚀 Testing @weft/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentsApi(config);

  const body = {
    // number | Page number (optional)
    page: 56,
    // number | Items per page (optional)
    perPage: 56,
  } satisfies ListAgentsRequest;

  try {
    const data = await api.listAgents(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **page** | `number` | Page number | [Optional] [Defaults to `1`] |
| **perPage** | `number` | Items per page | [Optional] [Defaults to `25`] |

### Return type

[**AgentListResponse**](AgentListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | List of agents |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

