# FetchApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**fetch**](FetchApi.md#fetchoperation) | **POST** /api/v1/fetch | Pay-and-fetch any URL (x402 proxy) |



## fetch

> FetchResponse fetch(fetchRequest)

Pay-and-fetch any URL (x402 proxy)

Universal x402 fetch proxy. The caller provides a target &#x60;url&#x60;, a hard &#x60;max_cost_usd&#x60; ceiling, and optional &#x60;method&#x60; / &#x60;body&#x60; / &#x60;headers&#x60;. Weft:    1. Issues the request.   2. On &#x60;402 Payment Required&#x60;, parses the merchant\&#39;s challenge.   3. Compares the asking price to &#x60;max_cost_usd&#x60; and the      buyer\&#39;s policy (&#x60;max_tx_usd&#x60;, daily/weekly limits).   4. Signs an EIP-3009 transfer from the buyer\&#39;s wallet.   5. Replays the request with the &#x60;X-Payment&#x60; header.   6. Streams the upstream artifact back, base64-encoded under      &#x60;body_base64&#x60;, with &#x60;paid_usd&#x60;, &#x60;tx_hash&#x60;, and the      merchant\&#39;s reputation snapshot.  Errors are structured with a stable &#x60;error&#x60; code, and each error response carries the buyer\&#39;s &#x60;policy&#x60;, &#x60;balance&#x60;, and a &#x60;dashboard_url&#x60; so a CLI can render an actionable message without a second round-trip.  Account-scoped: the bearer must be a buyer-scoped API key.  **Forwarded headers:** the caller\&#39;s &#x60;headers&#x60; are passed through to the upstream, except a denylist of hop-by-hop and Weft-internal headers (&#x60;host&#x60;, &#x60;authorization&#x60;, &#x60;cookie&#x60;, &#x60;proxy-authorization&#x60;, &#x60;x-forwarded-*&#x60;, &#x60;x-real-ip&#x60;, &#x60;x-payment&#x60;, &#x60;connection&#x60;, &#x60;upgrade&#x60;). Up to 32 headers, 4 KB of combined value bytes. 

### Example

```ts
import {
  Configuration,
  FetchApi,
} from '@weft-labs/sdk';
import type { FetchOperationRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new FetchApi(config);

  const body = {
    // FetchRequest
    fetchRequest: ...,
  } satisfies FetchOperationRequest;

  try {
    const data = await api.fetch(body);
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
| **fetchRequest** | [FetchRequest](FetchRequest.md) |  | |

### Return type

[**FetchResponse**](FetchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Fetch succeeded (or upstream was free); artifact streamed back base64-encoded. |  -  |
| **401** | Unauthorized — missing or non-buyer-scoped API key |  -  |
| **402** | Payment refused. &#x60;EXCEEDED_MAX_COST&#x60; (over the caller cap) or &#x60;INSUFFICIENT_BALANCE&#x60; (the buyer is genuinely short). Also &#x60;CONVERSION_UNAVAILABLE&#x60; — a cross-chain provision route is down while the buyer\&#39;s funds are intact (&#x60;details.venue&#x60;, &#x60;details.retryable: true&#x60;); retry later, do NOT top up. All use &#x60;FetchErrorResponse&#x60;.  |  -  |
| **403** | Policy violation, denylisted recipient, or a merchant challenge on a chain outside the wallet\&#39;s own environment — a testnet wallet may not pay a mainnet challenge, nor the reverse (&#x60;WALLET_ENVIRONMENT_MISMATCH&#x60;; terminal, not retryable). All three use &#x60;FetchErrorResponse&#x60;. Alternatively an OAuth access token lacking the &#x60;fetch&#x60; scope (&#x60;InsufficientScopeResponse&#x60;, RFC 6750 &#x60;insufficient_scope&#x60;, with a &#x60;WWW-Authenticate&#x60; challenge). The two envelopes are disjoint; branch on the &#x60;error&#x60; value.  |  -  |
| **413** | Upstream artifact exceeded the proxy\&#39;s size cap. |  -  |
| **422** | Invalid request URL, or the merchant advertised a payment method Weft cannot sign. |  -  |
| **424** | &#x60;MERCHANT_RETURNED_NON_402&#x60; — the upstream merchant is at fault: it did not return a 402, or its 402 challenge was invalid. A 4xx (not 5xx) because Weft behaved correctly and the caller should act on &#x60;details.reason&#x60; (e.g. pick another merchant); it also keeps the error envelope intact through CDNs that replace 5xx bodies.  |  -  |
| **502** | Settlement signing failed on Weft\&#39;s side (&#x60;SETTLEMENT_FAILED&#x60;). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

