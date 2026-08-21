# AgentBootstrapApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**cancelAccountBootstrap**](AgentBootstrapApi.md#cancelaccountbootstrap) | **DELETE** /api/v1/account_bootstraps/{id} | Cancel a bootstrap and revoke delivered OAuth access |
| [**createAccountBootstrap**](AgentBootstrapApi.md#createaccountbootstrap) | **POST** /api/v1/account_bootstraps | Create a temporary agent bootstrap |
| [**getAccountBootstrap**](AgentBootstrapApi.md#getaccountbootstrap) | **GET** /api/v1/account_bootstraps/{id} | Read bootstrap lifecycle status |



## cancelAccountBootstrap

> AccountBootstrapStatusResponse cancelAccountBootstrap(id)

Cancel a bootstrap and revoke delivered OAuth access

Pending and claimed bootstraps become rejected. A consumed bootstrap also revokes the delivered OAuth grant and all refresh descendants. Repeated cancellation is idempotent.

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
| **200** | Rejected terminal lifecycle status |  -  |
| **401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createAccountBootstrap

> AccountBootstrapCreatedResponse createAccountBootstrap(accountBootstrapRequest)

Create a temporary agent bootstrap

When WEFT_ACCOUNT_BOOTSTRAP_ENABLED&#x3D;true, creates a 30-minute, search-only bootstrap and emails a separate claim link to the supplied address. The response includes one-time device credentials and is deliberately identical for new and existing account emails and never contains the claim token. Rate limits apply per IP, normalized email, and OAuth client; request bodies over 4 KiB are rejected before parsing. Creation is disabled by default and answers 404 unless the deployment enables the preview. The bootstrap row and one-time credentials are committed only after the mail relay accepts the claim email. A retryable 503 leaves no bootstrap row behind.

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
| **404** | Bootstrap creation is disabled on this deployment. Default-off; a deployment that has not enabled the preview is indistinguishable from one without the feature. Status and cancel are unaffected.  |  -  |
| **413** | Request body exceeds the 4 KiB limit |  -  |
| **422** | Invalid context, OAuth client, or requested scopes |  -  |
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
| **200** | Current lifecycle and polling guidance, including terminal expiry status |  -  |
| **401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)
