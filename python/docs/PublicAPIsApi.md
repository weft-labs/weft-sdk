# weft_sdk.generated.PublicAPIsApi

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_api_by_slug**](PublicAPIsApi.md#get_api_by_slug) | **GET** /apis/{slug} | Get a public OpenAPI document for a data_api Resource
[**get_api_open_api_by_slug**](PublicAPIsApi.md#get_api_open_api_by_slug) | **GET** /apis/{slug}/openapi | Get the OpenAPI document for a data_api Resource (deterministic JSON)


# **get_api_by_slug**
> OpenApiDocument get_api_by_slug(slug)

Get a public OpenAPI document for a data_api Resource

Returns the OpenAPI 3.1 document published by a claimed,
public-or-unlisted `data_api` Resource. Pricing is intentionally
absent — under x402 the price is negotiated per-request via the
`402 Payment Required` challenge from the resource server itself.

Browsers (`Accept: text/html`) get an Inertia-rendered HTML landing
page instead; SDKs and tooling should prefer
`GET /apis/{slug}/openapi` to avoid content-type negotiation.

Ghost Resources (no Provider attached) and `private_profile`
Resources return `404`.


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.open_api_document import OpenApiDocument
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
    api_instance = weft_sdk.generated.PublicAPIsApi(api_client)
    slug = 'slug_example' # str | Resource slug

    try:
        # Get a public OpenAPI document for a data_api Resource
        api_response = api_instance.get_api_by_slug(slug)
        print("The response of PublicAPIsApi->get_api_by_slug:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PublicAPIsApi->get_api_by_slug: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Resource slug | 

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OpenAPI 3.1 document |  -  |
**404** | Resource not found, ghost (unclaimed), or private |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_api_open_api_by_slug**
> OpenApiDocument get_api_open_api_by_slug(slug)

Get the OpenAPI document for a data_api Resource (deterministic JSON)

Always returns the OpenAPI 3.1 JSON document, regardless of `Accept`
header. SDKs and code-generators should use this path; it is not
subject to the HTML/JSON content-type negotiation that `GET /apis/{slug}`
performs.

Same visibility rules as `GET /apis/{slug}` (Ghost Resources and
`private_profile` Resources return `404`).


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.open_api_document import OpenApiDocument
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
    api_instance = weft_sdk.generated.PublicAPIsApi(api_client)
    slug = 'slug_example' # str | Resource slug

    try:
        # Get the OpenAPI document for a data_api Resource (deterministic JSON)
        api_response = api_instance.get_api_open_api_by_slug(slug)
        print("The response of PublicAPIsApi->get_api_open_api_by_slug:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling PublicAPIsApi->get_api_open_api_by_slug: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **slug** | **str**| Resource slug | 

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OpenAPI 3.1 document |  -  |
**404** | Resource not found, ghost (unclaimed), or private |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

