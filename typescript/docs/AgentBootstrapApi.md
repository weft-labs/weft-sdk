# AgentBootstrapApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelAccountBootstrap**](AgentBootstrapApi.md#cancelaccountbootstrap) | **DELETE** /api/v1/account_bootstraps/{id} | Cancel or revoke a bootstrap credential |
| [**createAccountBootstrap**](AgentBootstrapApi.md#createaccountbootstrap) | **POST** /api/v1/account_bootstraps | Create a temporary agent bootstrap |
| [**getAccountBootstrap**](AgentBootstrapApi.md#getaccountbootstrap) | **GET** /api/v1/account_bootstraps/{id} | Read bootstrap lifecycle status |



## cancelAccountBootstrap

> AccountBootstrapStatusResponse cancelAccountBootstrap(id)

Cancel or revoke a bootstrap credential

A pending bootstrap becomes rejected. A claimed promoted credential becomes revoked and fails every subsequent request immediately.

### Example

```ts
import {
  Configuration,
  AgentBootstrapApi,
} from '@weft-labs/sdk';
import type { CancelAccountBootstrapRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bootstrapAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentBootstrapApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies CancelAccountBootstrapRequest;

  try {
    const data = await api.cancelAccountBootstrap(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Rejected or revoked terminal lifecycle status |  -  |
| **401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createAccountBootstrap

> AccountBootstrapCreatedResponse createAccountBootstrap(accountBootstrapRequest)

Create a temporary agent bootstrap

Creates a 30-minute, search-only bootstrap and emails a separate claim link to the supplied address. Human approval binds the same &#x60;wbt_*&#x60; bearer to the account and promotes it to the fixed durable capability set. The response is deliberately identical for new and existing account emails and never contains the claim token. Rate limits apply per IP and normalized email; request bodies over 4 KiB are rejected before parsing. The bootstrap row and one-time credentials are committed only after the mail relay accepts the claim email. A retryable 503 leaves no bootstrap row behind.

### Example

```ts
import {
  Configuration,
  AgentBootstrapApi,
} from '@weft-labs/sdk';
import type { CreateAccountBootstrapRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new AgentBootstrapApi();

  const body = {
    // AccountBootstrapRequest
    accountBootstrapRequest: ...,
  } satisfies CreateAccountBootstrapRequest;

  try {
    const data = await api.createAccountBootstrap(body);
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
| **accountBootstrapRequest** | [AccountBootstrapRequest](AccountBootstrapRequest.md) |  | |

### Return type

[**AccountBootstrapCreatedResponse**](AccountBootstrapCreatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Bootstrap created after the claim email is accepted for delivery |  -  |
| **503** | Claim email delivery is temporarily unavailable; no bootstrap was created and the request may be retried |  * Retry-After - Suggested delay before retrying, in seconds. <br>  |
| **413** | Request body exceeds the 4 KiB limit |  -  |
| **422** | Invalid bootstrap context |  -  |
| **429** | Rate limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getAccountBootstrap

> AccountBootstrapStatusResponse getAccountBootstrap(id)

Read bootstrap lifecycle status

### Example

```ts
import {
  Configuration,
  AgentBootstrapApi,
} from '@weft-labs/sdk';
import type { GetAccountBootstrapRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const config = new Configuration({
    // Configure HTTP bearer authorization: bootstrapAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AgentBootstrapApi(config);

  const body = {
    // string
    id: id_example,
  } satisfies GetAccountBootstrapRequest;

  try {
    const data = await api.getAccountBootstrap(body);
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
| **id** | `string` |  | [Defaults to `undefined`] |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Current lifecycle and polling guidance while the credential can authenticate |  -  |
| **401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
