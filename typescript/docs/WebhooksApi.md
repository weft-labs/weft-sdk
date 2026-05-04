# WebhooksApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**createWebhookEndpoint**](WebhooksApi.md#createwebhookendpointoperation) | **POST** /api/v1/webhook_endpoints | Create a webhook endpoint |
| [**deleteWebhookEndpoint**](WebhooksApi.md#deletewebhookendpoint) | **DELETE** /api/v1/webhook_endpoints/{id} | Delete a webhook endpoint |
| [**getWebhookEndpoint**](WebhooksApi.md#getwebhookendpoint) | **GET** /api/v1/webhook_endpoints/{id} | Get a webhook endpoint |
| [**listWebhookEndpoints**](WebhooksApi.md#listwebhookendpoints) | **GET** /api/v1/webhook_endpoints | List webhook endpoints |
| [**updateWebhookEndpoint**](WebhooksApi.md#updatewebhookendpointoperation) | **PATCH** /api/v1/webhook_endpoints/{id} | Update a webhook endpoint |



## createWebhookEndpoint

> WebhookEndpointCreatedResponse createWebhookEndpoint(createWebhookEndpointRequest)

Create a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@weft-labs/sdk';
import type { CreateWebhookEndpointOperationRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // CreateWebhookEndpointRequest
    createWebhookEndpointRequest: ...,
  } satisfies CreateWebhookEndpointOperationRequest;

  try {
    const data = await api.createWebhookEndpoint(body);
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
| **createWebhookEndpointRequest** | [CreateWebhookEndpointRequest](CreateWebhookEndpointRequest.md) |  | |

### Return type

[**WebhookEndpointCreatedResponse**](WebhookEndpointCreatedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Webhook endpoint created. The signing secret is only returned once. |  -  |
| **401** | Unauthorized |  -  |
| **422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteWebhookEndpoint

> MessageResponse deleteWebhookEndpoint(id)

Delete a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@weft-labs/sdk';
import type { DeleteWebhookEndpointRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // number
    id: 56,
  } satisfies DeleteWebhookEndpointRequest;

  try {
    const data = await api.deleteWebhookEndpoint(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Webhook endpoint deleted |  -  |
| **401** | Unauthorized |  -  |
| **404** | Webhook endpoint not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getWebhookEndpoint

> WebhookEndpointResponse getWebhookEndpoint(id)

Get a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@weft-labs/sdk';
import type { GetWebhookEndpointRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // number
    id: 56,
  } satisfies GetWebhookEndpointRequest;

  try {
    const data = await api.getWebhookEndpoint(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Webhook endpoint details |  -  |
| **401** | Unauthorized |  -  |
| **404** | Webhook endpoint not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listWebhookEndpoints

> WebhookEndpointListResponse listWebhookEndpoints(page, perPage)

List webhook endpoints

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@weft-labs/sdk';
import type { ListWebhookEndpointsRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // number (optional)
    page: 56,
    // number (optional)
    perPage: 56,
  } satisfies ListWebhookEndpointsRequest;

  try {
    const data = await api.listWebhookEndpoints(body);
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
| **page** | `number` |  | [Optional] [Defaults to `1`] |
| **perPage** | `number` |  | [Optional] [Defaults to `25`] |

### Return type

[**WebhookEndpointListResponse**](WebhookEndpointListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Paginated list of webhook endpoints |  -  |
| **401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateWebhookEndpoint

> WebhookEndpointResponse updateWebhookEndpoint(id, updateWebhookEndpointRequest)

Update a webhook endpoint

### Example

```ts
import {
  Configuration,
  WebhooksApi,
} from '@weft-labs/sdk';
import type { UpdateWebhookEndpointOperationRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new WebhooksApi(config);

  const body = {
    // number
    id: 56,
    // UpdateWebhookEndpointRequest
    updateWebhookEndpointRequest: ...,
  } satisfies UpdateWebhookEndpointOperationRequest;

  try {
    const data = await api.updateWebhookEndpoint(body);
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
| **id** | `number` |  | [Defaults to `undefined`] |
| **updateWebhookEndpointRequest** | [UpdateWebhookEndpointRequest](UpdateWebhookEndpointRequest.md) |  | |

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Webhook endpoint updated |  -  |
| **401** | Unauthorized |  -  |
| **404** | Webhook endpoint not found |  -  |
| **422** | Validation error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

