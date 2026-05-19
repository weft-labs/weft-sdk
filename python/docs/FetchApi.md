# weft_sdk.generated.FetchApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**fetch**](FetchApi.md#fetch) | **POST** /api/v1/fetch | Pay-and-fetch any URL (x402 proxy)


# **fetch**
> FetchResponse fetch(fetch_request)

Pay-and-fetch any URL (x402 proxy)

Universal x402 fetch proxy. The caller provides a target `url`,
a hard `max_cost_usd` ceiling, and optional `method` / `body` /
`headers`. Weft:

  1. Issues the request.
  2. On `402 Payment Required`, parses the merchant's challenge.
  3. Compares the asking price to `max_cost_usd` and the
     buyer's policy (`max_tx_usd`, daily/weekly limits).
  4. Signs an EIP-3009 transfer from the buyer's wallet.
  5. Replays the request with the `X-Payment` header.
  6. Streams the upstream artifact back, base64-encoded under
     `body_base64`, with `paid_usd`, `tx_hash`, and the
     merchant's reputation snapshot.

Errors are structured with a stable `error` code, and each error
response carries the buyer's `policy`, `balance`, and a
`dashboard_url` so a CLI can render an actionable message without
a second round-trip.

Account-scoped: the bearer must be a buyer-scoped API key.

**Forwarded headers:** the caller's `headers` are passed through
to the upstream, except a denylist of hop-by-hop and
Weft-internal headers (`host`, `authorization`, `cookie`,
`proxy-authorization`, `x-forwarded-*`, `x-real-ip`,
`x-payment`, `connection`, `upgrade`). Up to 32 headers, 4 KB of
combined value bytes.


### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.fetch_request import FetchRequest
from weft_sdk.generated.models.fetch_response import FetchResponse
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
    api_instance = weft_sdk.generated.FetchApi(api_client)
    fetch_request = weft_sdk.generated.FetchRequest() # FetchRequest | 

    try:
        # Pay-and-fetch any URL (x402 proxy)
        api_response = api_instance.fetch(fetch_request)
        print("The response of FetchApi->fetch:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling FetchApi->fetch: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fetch_request** | [**FetchRequest**](FetchRequest.md)|  | 

### Return type

[**FetchResponse**](FetchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Fetch succeeded (or upstream was free); artifact streamed back base64-encoded. |  -  |
**401** | Unauthorized — missing or non-buyer-scoped API key |  -  |
**402** | Payment refused — &#x60;EXCEEDED_MAX_COST&#x60; or &#x60;INSUFFICIENT_BALANCE&#x60;. |  -  |
**403** | Policy violation or denylisted recipient. |  -  |
**413** | Upstream artifact exceeded the proxy&#39;s size cap. |  -  |
**422** | Invalid request URL. |  -  |
**502** | Upstream did not return a valid 402 challenge, or settlement signing failed. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

