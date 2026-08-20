# weft_sdk.generated.SearchApi

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_curated_marketplace_contract**](SearchApi.md#get_curated_marketplace_contract) | **GET** /contracts/curated-marketplace/{digest}/{operation_id}.json | Get a curated marketplace operation contract
[**search**](SearchApi.md#search) | **POST** /api/v1/search | Search the Weft index


# **get_curated_marketplace_contract**
> CuratedMarketplaceContract get_curated_marketplace_contract(digest, operation_id)

Get a curated marketplace operation contract

Public, content-addressed detail document linked from compact hosted-MCP
search results. A matching document is cacheable for one year and
immutable. The digest is the SHA-256 of the canonical JSON document.
Every reviewed endpoint includes its request and response evidence;
asynchronous endpoints also include the authored submit-and-poll
lifecycle, identity-header reuse, terminal states, and known gaps.


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.curated_marketplace_contract import CuratedMarketplaceContract
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://weft.network
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://weft.network"
)


# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.SearchApi(api_client)
    digest = 'digest_example' # str |
    operation_id = 'operation_id_example' # str |

    try:
        # Get a curated marketplace operation contract
        api_response = api_instance.get_curated_marketplace_contract(digest, operation_id)
        print("The response of SearchApi->get_curated_marketplace_contract:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SearchApi->get_curated_marketplace_contract: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **digest** | **str**|  |
 **operation_id** | **str**|  |

### Return type

[**CuratedMarketplaceContract**](CuratedMarketplaceContract.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Full immutable operation contract |  * Cache-Control - public, max-age&#x3D;31536000, immutable <br>  * ETag - Quoted SHA-256 document digest <br>  |
**304** | The caller already has the document identified by ETag |  -  |
**404** | Unknown operation or digest mismatch |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **search**
> SearchResponse search(search_request)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The
request body is the weft-search-platform `/v1/search` contract:
a free-text `query`, optional `max_results`, and optional structured
`filters` (price / price_atomic / type / protocol — the canonical
FilterSpec v1 vocabulary, vendored verbatim from the platform). Price is
a dual representation of one constraint: `price` in USD decimal strings
(the reasoning form) XOR `price_atomic` in integer micro-USD (the
settlement form) — mutually exclusive, set at most one.

Account-scoped: the bearer token must be a buyer-scoped API key, an
OAuth token carrying `search`, or a pending or claimed `wbt_*` bootstrap
bearer. Bootstrap access never resolves to a User. A claim keeps
temporary search available until successful OAuth token delivery
consumes the bootstrap, avoiding an access gap during credential
replacement. Rejection, cancellation, expiry, and consumption end
temporary search. Bootstrap search is limited to 60 requests per
credential and 120 per IP each hour.

Response negotiation: `Accept: application/json` (default) returns
the structured envelope; `Accept: text/markdown` returns a rendered
Markdown digest of the same results — useful for piping into a chat
UI or LLM prompt.


### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.search_request import SearchRequest
from weft_sdk.generated.models.search_response import SearchResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://weft.network
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://weft.network"
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
    api_instance = weft_sdk.generated.SearchApi(api_client)
    search_request = weft_sdk.generated.SearchRequest() # SearchRequest |

    try:
        # Search the Weft index
        api_response = api_instance.search(search_request)
        print("The response of SearchApi->search:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling SearchApi->search: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **search_request** | [**SearchRequest**](SearchRequest.md)|  |

### Return type

[**SearchResponse**](SearchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json, text/markdown

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Search results |  -  |
**401** | Unauthorized — missing or non-buyer-scoped API key |  -  |
**403** | The OAuth access token authenticated but lacks the &#x60;search&#x60; scope (RFC 6750 &#x60;insufficient_scope&#x60;). Carries a &#x60;WWW-Authenticate: Bearer error&#x3D;\&quot;insufficient_scope\&quot;, scope&#x3D;\&quot;search\&quot;&#x60; header. &#x60;wk_&#x60; API keys are unscoped and never see this.  |  -  |
**422** | Invalid request — empty/missing &#x60;query&#x60;, out-of-range &#x60;max_results&#x60;, an unknown top-level parameter, or invalid &#x60;filters&#x60; (unknown filter key/operator, bad enum value, or a sub-filter without exactly one operator). See the &#x60;error&#x60; code.  |  -  |
**429** | Bootstrap search rate limit exceeded |  -  |
**502** | Search service unavailable |  -  |
**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
