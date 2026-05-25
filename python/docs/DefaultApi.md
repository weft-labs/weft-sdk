# weft_sdk.generated.DefaultApi

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_open_api_document**](DefaultApi.md#get_open_api_document) | **GET** /docs/openapi.yaml | Fetch this OpenAPI document


# **get_open_api_document**
> str get_open_api_document()

Fetch this OpenAPI document

### Example


```python
import weft_sdk.generated
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
    api_instance = weft_sdk.generated.DefaultApi(api_client)

    try:
        # Fetch this OpenAPI document
        api_response = api_instance.get_open_api_document()
        print("The response of DefaultApi->get_open_api_document:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling DefaultApi->get_open_api_document: %s\n" % e)
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
**200** | OpenAPI 3.1 document (YAML) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

