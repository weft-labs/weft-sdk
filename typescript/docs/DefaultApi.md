# DefaultApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getApiDocs**](DefaultApi.md#getapidocs) | **GET** /api/v1/docs | Fetch OpenAPI spec |



## getApiDocs

> string getApiDocs()

Fetch OpenAPI spec

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@weft/sdk';
import type { GetApiDocsRequest } from '@weft/sdk';

async function example() {
  console.log("🚀 Testing @weft/sdk SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getApiDocs();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

**string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/yaml`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OpenAPI document |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

