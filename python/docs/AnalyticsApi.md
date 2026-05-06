# weft_sdk.generated.AnalyticsApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_analytics**](AnalyticsApi.md#get_analytics) | **GET** /api/v1/analytics | Get payment analytics


# **get_analytics**
> AnalyticsResponse get_analytics()

Get payment analytics

### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.analytics_response import AnalyticsResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.weftlabs.com
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://api.weftlabs.com"
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
    api_instance = weft_sdk.generated.AnalyticsApi(api_client)

    try:
        # Get payment analytics
        api_response = api_instance.get_analytics()
        print("The response of AnalyticsApi->get_analytics:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AnalyticsApi->get_analytics: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**AnalyticsResponse**](AnalyticsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Analytics data |  -  |
**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

