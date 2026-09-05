# DocumentationApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getOpenApiDocument**](DocumentationApi.md#getopenapidocument) | **GET** /docs/openapi.yaml | Fetch this OpenAPI document |



## getOpenApiDocument

> string getOpenApiDocument()

Fetch this OpenAPI document

### Example

```ts
import {
  Configuration,
  DocumentationApi,
} from '@weftlabs/sdk';
import type { GetOpenApiDocumentRequest } from '@weftlabs/sdk';

async function example() {
  console.log("🚀 Testing @weftlabs/sdk SDK...");
  const api = new DocumentationApi();

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
