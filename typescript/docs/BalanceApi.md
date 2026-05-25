# BalanceApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getBalance**](BalanceApi.md#getbalance) | **GET** /api/v1/balance | Get wallet, spending policy, and current-window spend |



## getBalance

> BalanceResponse getBalance()

Get wallet, spending policy, and current-window spend

Read-only snapshot for the buyer behind the bearer token. The response always includes a &#x60;promo&#x60; block — values are zero in v1 and fill in once the freemium promo ledger ships, without a shape change. &#x60;wallet.balance_usdc&#x60; is fetched live from Privy; if Privy is unreachable the field returns &#x60;\&quot;0.00\&quot;&#x60; rather than erroring the whole call.  Account-scoped: the bearer must be a buyer-scoped API key. 

### Example

```ts
import {
  Configuration,
  BalanceApi,
} from '@weft-labs/sdk';
import type { GetBalanceRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new BalanceApi(config);

  try {
    const data = await api.getBalance();
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

[**BalanceResponse**](BalanceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Wallet + policy + spend snapshot |  -  |
| **401** | Unauthorized — missing or non-buyer-scoped API key |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

