# PublicAPIsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getApiBySlug**](PublicAPIsApi.md#getapibyslug) | **GET** /apis/{slug} | Get a public OpenAPI document for a data_api Resource |
| [**getApiOpenApiBySlug**](PublicAPIsApi.md#getapiopenapibyslug) | **GET** /apis/{slug}/openapi | Get the OpenAPI document for a data_api Resource (deterministic JSON) |



## getApiBySlug

> OpenApiDocument getApiBySlug(slug)

Get a public OpenAPI document for a data_api Resource

Returns the OpenAPI 3.1 document published by a claimed, public-or-unlisted &#x60;data_api&#x60; Resource. Pricing is intentionally absent — under x402 the price is negotiated per-request via the &#x60;402 Payment Required&#x60; challenge from the resource server itself.  Browsers (&#x60;Accept: text/html&#x60;) get an Inertia-rendered HTML landing page instead; SDKs and tooling should prefer &#x60;GET /apis/{slug}/openapi&#x60; to avoid content-type negotiation.  Ghost Resources (no Provider attached) and &#x60;private_profile&#x60; Resources return &#x60;404&#x60;. 

### Example

```ts
import {
  Configuration,
  PublicAPIsApi,
} from '@weft-labs/sdk';
import type { GetApiBySlugRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new PublicAPIsApi();

  const body = {
    // string | Resource slug
    slug: slug_example,
  } satisfies GetApiBySlugRequest;

  try {
    const data = await api.getApiBySlug(body);
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
| **slug** | `string` | Resource slug | [Defaults to `undefined`] |

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OpenAPI 3.1 document |  -  |
| **404** | Resource not found, ghost (unclaimed), or private |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getApiOpenApiBySlug

> OpenApiDocument getApiOpenApiBySlug(slug)

Get the OpenAPI document for a data_api Resource (deterministic JSON)

Always returns the OpenAPI 3.1 JSON document, regardless of &#x60;Accept&#x60; header. SDKs and code-generators should use this path; it is not subject to the HTML/JSON content-type negotiation that &#x60;GET /apis/{slug}&#x60; performs.  Same visibility rules as &#x60;GET /apis/{slug}&#x60; (Ghost Resources and &#x60;private_profile&#x60; Resources return &#x60;404&#x60;). 

### Example

```ts
import {
  Configuration,
  PublicAPIsApi,
} from '@weft-labs/sdk';
import type { GetApiOpenApiBySlugRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new PublicAPIsApi();

  const body = {
    // string | Resource slug
    slug: slug_example,
  } satisfies GetApiOpenApiBySlugRequest;

  try {
    const data = await api.getApiOpenApiBySlug(body);
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
| **slug** | `string` | Resource slug | [Defaults to `undefined`] |

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OpenAPI 3.1 document |  -  |
| **404** | Resource not found, ghost (unclaimed), or private |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

