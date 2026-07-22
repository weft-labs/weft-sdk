# weft_sdk.generated.FetchApi

All URIs are relative to *https://weft.network*

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
     `body_base64`, with `paid_usd`, `held_usd`, `payment_status`,
     `tx_hash`, and the merchant's reputation snapshot. `paid_usd`
     is "0" until the charge is CONFIRMED settled — a signed-but-
     unsettled hold (the common case for x402, which settles
     asynchronously) reports its amount in `held_usd` instead, never
     in `paid_usd`.

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
**402** | Payment refused. &#x60;EXCEEDED_MAX_COST&#x60; (over the caller cap) or &#x60;INSUFFICIENT_BALANCE&#x60; (the buyer is genuinely short). Also &#x60;CONVERSION_UNAVAILABLE&#x60; — a cross-chain provision route is down while the buyer&#39;s funds are intact (&#x60;details.venue&#x60;, &#x60;details.retryable: true&#x60;); retry later, do NOT top up. All use &#x60;FetchErrorResponse&#x60;.  |  -  |
**403** | Policy violation, denylisted recipient, or a merchant challenge on a chain outside the wallet&#39;s own environment — a testnet wallet may not pay a mainnet challenge, nor the reverse (&#x60;WALLET_ENVIRONMENT_MISMATCH&#x60;; terminal, not retryable). All three use &#x60;FetchErrorResponse&#x60;. Alternatively an OAuth access token lacking the &#x60;fetch&#x60; scope (&#x60;InsufficientScopeResponse&#x60;, RFC 6750 &#x60;insufficient_scope&#x60;, with a &#x60;WWW-Authenticate&#x60; challenge). The two envelopes are disjoint; branch on the &#x60;error&#x60; value.  |  -  |
**413** | Upstream artifact exceeded the proxy&#39;s size cap. |  -  |
**422** | Invalid request URL, a merchant payment method Weft cannot sign (&#x60;UNSUPPORTED_PAYMENT_METHOD&#x60;), or a merchant settlement token Weft cannot convert into (&#x60;UNSUPPORTED_ASSET&#x60; — the token&#39;s on-chain &#x60;currency()&#x60; is not USD; terminal for this merchant, funds untouched, &#x60;details.asset&#x60; names it).  |  -  |
**424** | &#x60;MERCHANT_RETURNED_NON_402&#x60; — the upstream merchant is at fault: it did not return a 402, or its 402 challenge was invalid. A 4xx (not 5xx) because Weft behaved correctly and the caller should act on &#x60;details.reason&#x60; (e.g. pick another merchant); it also keeps the error envelope intact through CDNs that replace 5xx bodies.  |  -  |
**502** | Settlement signing failed on Weft&#39;s side (&#x60;SETTLEMENT_FAILED&#x60;). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

