# weft_sdk.generated.ResourcesApi

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**enroll_resource**](ResourcesApi.md#enroll_resource) | **POST** /api/v1/resources/enroll | Self-enroll a ghost resource (public, no auth)


# **enroll_resource**
> ResourceEnrollmentResponse enroll_resource(resource_enrollment_request)

Self-enroll a ghost resource (public, no auth)

Lets an unauthenticated agent (or its operator) self-enroll a
Resource as a "ghost" (no owning provider). The server generates the
`slug` and a single-use `claim_token`; the response also carries a
`claim_url` the agent hands to its human controller to claim the
resource from the dashboard.

Client-supplied `slug` and `category` are silently ignored: slugs are
server-generated from `name` (so callers cannot squat on reserved
names), and `category` is a post-claim concern set by a real human.

Rate-limited to 10 enrollments/hour/IP.


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.resource_enrollment_request import ResourceEnrollmentRequest
from weft_sdk.generated.models.resource_enrollment_response import ResourceEnrollmentResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://weft.network
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://weft.network"
)


# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.ResourcesApi(api_client)
    resource_enrollment_request = weft_sdk.generated.ResourceEnrollmentRequest() # ResourceEnrollmentRequest | 

    try:
        # Self-enroll a ghost resource (public, no auth)
        api_response = api_instance.enroll_resource(resource_enrollment_request)
        print("The response of ResourcesApi->enroll_resource:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ResourcesApi->enroll_resource: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resource_enrollment_request** | [**ResourceEnrollmentRequest**](ResourceEnrollmentRequest.md)|  | 

### Return type

[**ResourceEnrollmentResponse**](ResourceEnrollmentResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Ghost resource created |  -  |
**422** | Validation error (missing/blank fields, or unknown &#x60;kind&#x60;) |  -  |
**429** | Rate limit exceeded (10 enrollments/hour/IP) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

