# SearchApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getCuratedMarketplaceContract**](SearchApi.md#getcuratedmarketplacecontract) | **GET** /contracts/curated-marketplace/{digest}/{operation_id}.json | Get a curated marketplace operation contract |
| [**search**](SearchApi.md#searchoperation) | **POST** /api/v1/search | Search the Weft index |



## getCuratedMarketplaceContract

> CuratedMarketplaceContract getCuratedMarketplaceContract(digest, operationId)

Get a curated marketplace operation contract

Public, content-addressed detail document linked from compact hosted-MCP search results. A matching document is cacheable for one year and immutable. The digest is the SHA-256 of the canonical JSON document. Every reviewed endpoint includes its request and response evidence; asynchronous endpoints also include the authored submit-and-poll lifecycle, identity-header reuse, terminal states, and known gaps.

### Example

```ts
import {
  Configuration,
  SearchApi,
} from '@weft-labs/sdk';
import type { GetCuratedMarketplaceContractRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new SearchApi();

  const body = {
    // string
    digest: digest_example,
    // string
    operationId: operationId_example,
  } satisfies GetCuratedMarketplaceContractRequest;

  try {
    const data = await api.getCuratedMarketplaceContract(body);
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
| **digest** | `string` |  | [Defaults to `undefined`] |
| **operationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**CuratedMarketplaceContract**](CuratedMarketplaceContract.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Full immutable operation contract |  * Cache-Control - public, max-age&#x3D;31536000, immutable <br>  * ETag - Quoted SHA-256 document digest <br>  |
| **304** | The caller already has the document identified by ETag |  -  |
| **404** | Unknown operation or digest mismatch |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## search

> SearchResponse search(searchRequest)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The request body is the weft-search-platform &#x60;/v1/search&#x60; contract: a free-text &#x60;query&#x60;, optional &#x60;max_results&#x60;, and optional structured &#x60;filters&#x60; (price / price_atomic / type / protocol — the canonical FilterSpec v1 vocabulary, vendored verbatim from the platform). Price is a dual representation of one constraint: &#x60;price&#x60; in USD decimal strings (the reasoning form) XOR &#x60;price_atomic&#x60; in integer micro-USD (the settlement form) — mutually exclusive, set at most one.  Account-scoped: the bearer token must be a buyer-scoped API key, an OAuth token carrying &#x60;search&#x60;, or a pending or claimed &#x60;wbt_*&#x60; bootstrap bearer. Pending bootstrap access uses an anonymous bootstrap identity; after claim, the promoted bearer uses its bound User. Rejection, cancellation, expiry, and revocation end bootstrap search. Bootstrap search is limited to 60 requests per credential and 120 per IP each hour before native credential promotion.  Response negotiation: &#x60;Accept: application/json&#x60; (default) returns the structured envelope; &#x60;Accept: text/markdown&#x60; returns a rendered Markdown digest of the same results — useful for piping into a chat UI or LLM prompt.

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
| **422** | Invalid request — empty/missing &#x60;query&#x60;, out-of-range &#x60;max_results&#x60;, an unknown top-level parameter, or invalid &#x60;filters&#x60; (unknown filter key/operator, bad enum value, or a sub-filter without exactly one operator). See the &#x60;error&#x60; code.  |  -  |
| **429** | Bootstrap search rate limit exceeded |  -  |
| **502** | Search service unavailable |  -  |
| **500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
