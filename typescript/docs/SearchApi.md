# SearchApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**search**](SearchApi.md#searchoperation) | **POST** /api/v1/search | Search the Weft index |



## search

> SearchResponse search(searchRequest)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The request body carries a free-text &#x60;query&#x60;, an optional &#x60;limit&#x60;, and an optional &#x60;filters&#x60; object that narrows by price band, payment protocol, agent protocol, or domain tag. Filters are applied as a post-filter after the embedding score is computed.  Backend selection is server-side via the &#x60;SEARCH_BACKEND&#x60; env var: &#x60;mock&#x60; (default, reads YAML fixtures and sets &#x60;_mock: true&#x60; in the response) or &#x60;platform&#x60; (proxies to the upstream search service). Both backends return the same envelope.  Account-scoped: the bearer token must be a buyer-scoped API key. Free for authenticated buyers in v1; billing is planned for a later release.  Response negotiation: &#x60;Accept: application/json&#x60; (default) returns the structured envelope; &#x60;Accept: text/markdown&#x60; returns a rendered Markdown digest of the same results — useful for piping into a chat UI or LLM prompt. 

### Example

```ts
import {
  Configuration,
  SearchApi,
} from '@weft-labs/sdk';
import type { SearchOperationRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new SearchApi(config);

  const body = {
    // SearchRequest
    searchRequest: ...,
  } satisfies SearchOperationRequest;

  try {
    const data = await api.search(body);
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
| **searchRequest** | [SearchRequest](SearchRequest.md) |  | |

### Return type

[**SearchResponse**](SearchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `text/markdown`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Search results |  -  |
| **401** | Unauthorized — missing or non-buyer-scoped API key |  -  |
| **403** | The OAuth access token authenticated but lacks the &#x60;search&#x60; scope (RFC 6750 &#x60;insufficient_scope&#x60;). Carries a &#x60;WWW-Authenticate: Bearer error&#x3D;\&quot;insufficient_scope\&quot;, scope&#x3D;\&quot;search\&quot;&#x60; header. &#x60;wk_&#x60; API keys are unscoped and never see this.  |  -  |
| **422** | Invalid query (empty/missing) |  -  |
| **502** | Upstream search backend error (platform backend only) |  -  |
| **500** | Backend misconfigured (&#x60;SEARCH_BACKEND&#x60; unset or unknown) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

