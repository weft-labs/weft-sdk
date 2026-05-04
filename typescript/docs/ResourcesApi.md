# ResourcesApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**enrollResource**](ResourcesApi.md#enrollresourceoperation) | **POST** /api/v1/resources/enroll | Self-enroll a Resource (ghost) |



## enrollResource

> EnrolledResourceResponse enrollResource(enrollResourceRequest)

Self-enroll a Resource (ghost)

Public, unauthenticated endpoint. An agent (or its operator) creates a ghost Resource — a Resource with no Provider attached. The server generates the slug and a single-use &#x60;claim_token&#x60;. The enrolling client passes the &#x60;claim_url&#x60; back to its human controller, who signs up and visits the URL to claim the Resource into their organization.  **Rate limit:** 10 enrollments / hour / IP. Exceeding the limit returns &#x60;429 Too Many Requests&#x60;.  **Server-controlled fields:** &#x60;slug&#x60; is generated from &#x60;name&#x60; and cannot be supplied. &#x60;category&#x60; is intentionally rejected — domain category is set after claim, by the human, from a constrained list. 

### Example

```ts
import {
  Configuration,
  ResourcesApi,
} from '@weft-labs/sdk';
import type { EnrollResourceOperationRequest } from '@weft-labs/sdk';

async function example() {
  console.log("🚀 Testing @weft-labs/sdk SDK...");
  const api = new ResourcesApi();

  const body = {
    // EnrollResourceRequest
    enrollResourceRequest: ...,
  } satisfies EnrollResourceOperationRequest;

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
| **enrollResourceRequest** | [EnrollResourceRequest](EnrollResourceRequest.md) |  | |

### Return type

[**EnrolledResourceResponse**](EnrolledResourceResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Resource enrolled. Response includes the single-use claim token and URL. |  -  |
| **422** | Validation error (invalid &#x60;kind&#x60;, missing required field, slug collision after retry, etc.) |  -  |
| **429** | Rate limit exceeded (&gt;10 enrollments/hour from this IP) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

