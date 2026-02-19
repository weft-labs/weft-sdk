# weft_sdk.generated.DefaultApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_api_docs**](DefaultApi.md#get_api_docs) | **GET** /api/v1/docs | Fetch OpenAPI spec


# **get_api_docs**
> str get_api_docs()

Fetch OpenAPI spec

### Example


```python
import weft_sdk.generated
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
    api_instance = weft_sdk.generated.DefaultApi(api_client)

    try:
        # Fetch OpenAPI spec
        api_response = api_instance.get_api_docs()
        print("The response of DefaultApi->get_api_docs:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_api_docs: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

**str**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/yaml

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OpenAPI document |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

