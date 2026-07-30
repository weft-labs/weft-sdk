# PurchasesApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getPurchase**](PurchasesApi.md#getpurchase) | **GET** /api/v1/purchases/{id} | Get a buyer purchase |
| [**listPurchases**](PurchasesApi.md#listpurchases) | **GET** /api/v1/purchases | List buyer purchases |



## getPurchase

> PurchaseResponse getPurchase(id)

Get a buyer purchase

### Example

```ts
import {
  Configuration,
  PurchasesApi,
} from '@weft-labs/sdk';
import type { GetPurchaseRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchasesApi(config);

  const body = {
    // number | Purchase ID
    id: 56,
  } satisfies GetPurchaseRequest;

  try {
    const data = await api.getPurchase(body);
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
| **id** | `number` | Purchase ID | [Defaults to `undefined`] |

### Return type

[**PurchaseResponse**](PurchaseResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Buyer purchase details |  -  |
| **401** | Unauthorized — missing or non-buyer-scoped credential |  -  |
| **403** | OAuth token lacks the &#x60;balance&#x60; scope. |  -  |
| **404** | Purchase not found or owned by another buyer |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listPurchases

> PurchaseListResponse listPurchases(page, perPage)

List buyer purchases

Returns the authenticated buyer\&#39;s signing and settlement ledger. Unlike &#x60;/api/v1/payments&#x60;, this endpoint is User-scoped and backed by &#x60;signed_events&#x60;, so rejected and pending attempts are included.

### Example

```ts
import {
  Configuration,
  PurchasesApi,
} from '@weft-labs/sdk';
import type { ListPurchasesRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new PurchasesApi(config);

  const body = {
    // number | Page number (optional)
    page: 56,
    // number | Items per page (optional)
    perPage: 56,
  } satisfies ListPurchasesRequest;

  try {
    const data = await api.listPurchases(body);
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
| **page** | `number` | Page number | [Optional] [Defaults to `1`] |
| **perPage** | `number` | Items per page | [Optional] [Defaults to `25`] |

### Return type

[**PurchaseListResponse**](PurchaseListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Buyer purchase ledger |  -  |
| **401** | Unauthorized — missing or non-buyer-scoped credential |  -  |
| **403** | OAuth token lacks the &#x60;balance&#x60; scope. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
