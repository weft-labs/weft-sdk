# DefaultApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getOpenApiDocument**](DefaultApi.md#getopenapidocument) | **GET** /docs/openapi.yaml | Fetch this OpenAPI document |



## getOpenApiDocument

> string getOpenApiDocument()

Fetch this OpenAPI document

### Example

```ts
import {
  Configuration,
  DefaultApi,
} from '@weft-labs/sdk';
import type { GetOpenApiDocumentRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new DefaultApi();

  try {
    const data = await api.getOpenApiDocument();
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
| **200** | OpenAPI 3.1 document (YAML) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

