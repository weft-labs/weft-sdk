# weft_sdk.generated.ResourcesApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**enroll_resource**](ResourcesApi.md#enroll_resource) | **POST** /api/v1/resources/enroll | Self-enroll a Resource (ghost)


# **enroll_resource**
> EnrolledResourceResponse enroll_resource(enroll_resource_request)

Self-enroll a Resource (ghost)

Public, unauthenticated endpoint. An agent (or its operator) creates
a ghost Resource — a Resource with no Provider attached. The server
generates the slug and a single-use `claim_token`. The enrolling
client passes the `claim_url` back to its human controller, who
signs up and visits the URL to claim the Resource into their
organization.

**Rate limit:** 10 enrollments / hour / IP. Exceeding the limit
returns `429 Too Many Requests`.

**Server-controlled fields:** `slug` is generated from `name` and
cannot be supplied. `category` is intentionally rejected — domain
category is set after claim, by the human, from a constrained list.


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.enroll_resource_request import EnrollResourceRequest
from weft_sdk.generated.models.enrolled_resource_response import EnrolledResourceResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
)


# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.ResourcesApi(api_client)
    enroll_resource_request = weft_sdk.generated.EnrollResourceRequest() # EnrollResourceRequest | 

    try:
        # Self-enroll a Resource (ghost)
        api_response = api_instance.enroll_resource(enroll_resource_request)
        print("The response of ResourcesApi->enroll_resource:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ResourcesApi->enroll_resource: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **enroll_resource_request** | [**EnrollResourceRequest**](EnrollResourceRequest.md)|  | 

### Return type

[**EnrolledResourceResponse**](EnrolledResourceResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Resource enrolled. Response includes the single-use claim token and URL. |  -  |
**422** | Validation error (invalid &#x60;kind&#x60;, missing required field, slug collision after retry, etc.) |  -  |
**429** | Rate limit exceeded (&gt;10 enrollments/hour from this IP) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

