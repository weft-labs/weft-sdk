# weft_sdk.generated.SearchApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**search**](SearchApi.md#search) | **POST** /api/v1/search | Search the Weft index


# **search**
> SearchResponse search(search_request)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The
request body carries a free-text `query`, an optional `limit`, and
an optional `filters` object that narrows by price band, payment
protocol, agent protocol, or domain tag. Filters are applied as a
post-filter after the embedding score is computed.

Backend selection is server-side via the `SEARCH_BACKEND` env var:
`mock` (default, reads YAML fixtures and sets `_mock: true` in the
response) or `platform` (proxies to the upstream search service).
Both backends return the same envelope.

Account-scoped: the bearer token must be a buyer-scoped API key.
Free for authenticated buyers in v1; billing is planned for a later
release.

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
**422** | Invalid query (empty/missing) |  -  |
**502** | Upstream search backend error (platform backend only) |  -  |
**500** | Backend misconfigured (&#x60;SEARCH_BACKEND&#x60; unset or unknown) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

