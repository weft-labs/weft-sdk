# ResourcesApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enrollResource**](ResourcesApi.md#enrollresource) | **POST** /api/v1/resources/enroll | Self-enroll a ghost resource (public, no auth) |



## enrollResource

> ResourceEnrollmentResponse enrollResource(resourceEnrollmentRequest)

Self-enroll a ghost resource (public, no auth)

Lets an unauthenticated agent (or its operator) self-enroll a Resource as a \&quot;ghost\&quot; (no owning provider). The server generates the &#x60;slug&#x60; and a single-use &#x60;claim_token&#x60;; the response also carries a &#x60;claim_url&#x60; the agent hands to its human controller to claim the resource from the dashboard.  Client-supplied &#x60;slug&#x60; and &#x60;category&#x60; are silently ignored: slugs are server-generated from &#x60;name&#x60; (so callers cannot squat on reserved names), and &#x60;category&#x60; is a post-claim concern set by a real human.  Rate-limited to 10 enrollments/hour/IP. 

### Example

```ts
import {
  Configuration,
  ResourcesApi,
} from '@weft-labs/sdk';
import type { EnrollResourceRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new ResourcesApi();

  const body = {
    // ResourceEnrollmentRequest
    resourceEnrollmentRequest: ...,
  } satisfies EnrollResourceRequest;

  try {
    const data = await api.enrollResource(body);
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
| **resourceEnrollmentRequest** | [ResourceEnrollmentRequest](ResourceEnrollmentRequest.md) |  | |

### Return type

[**ResourceEnrollmentResponse**](ResourceEnrollmentResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Ghost resource created |  -  |
| **422** | Validation error (missing/blank fields, or unknown &#x60;kind&#x60;) |  -  |
| **429** | Rate limit exceeded (10 enrollments/hour/IP) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

