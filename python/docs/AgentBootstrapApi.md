# weft_sdk.generated.AgentBootstrapApi

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**cancel_account_bootstrap**](AgentBootstrapApi.md#cancel_account_bootstrap) | **DELETE** /api/v1/account_bootstraps/{id} | Cancel a bootstrap and revoke delivered OAuth access
[**create_account_bootstrap**](AgentBootstrapApi.md#create_account_bootstrap) | **POST** /api/v1/account_bootstraps | Create a temporary agent bootstrap
[**get_account_bootstrap**](AgentBootstrapApi.md#get_account_bootstrap) | **GET** /api/v1/account_bootstraps/{id} | Read bootstrap lifecycle status


# **cancel_account_bootstrap**
> AccountBootstrapStatusResponse cancel_account_bootstrap(id)

Cancel a bootstrap and revoke delivered OAuth access

Pending and claimed bootstraps become rejected. A consumed bootstrap
also revokes the delivered OAuth grant and all refresh descendants.
Repeated cancellation is idempotent.


### Example

* Bearer (BootstrapToken) Authentication (bootstrapAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.account_bootstrap_status_response import AccountBootstrapStatusResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://weft.network
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://weft.network"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (BootstrapToken): bootstrapAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentBootstrapApi(api_client)
    id = 'id_example' # str |

    try:
        # Cancel a bootstrap and revoke delivered OAuth access
        api_response = api_instance.cancel_account_bootstrap(id)
        print("The response of AgentBootstrapApi->cancel_account_bootstrap:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentBootstrapApi->cancel_account_bootstrap: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Rejected terminal lifecycle status |  -  |
**401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_account_bootstrap**
> AccountBootstrapCreatedResponse create_account_bootstrap(account_bootstrap_request)

Create a temporary agent bootstrap

When WEFT_ACCOUNT_BOOTSTRAP_ENABLED=true, creates a 30-minute,
search-only bootstrap and emails a separate claim link to the supplied
address. The response includes one-time device credentials and is deliberately identical
for new and existing account emails and never contains the claim token.
Rate limits apply per IP, normalized email, and OAuth client; request
bodies over 4 KiB are rejected before parsing. Creation is disabled by
default and answers 404 unless the deployment enables the preview. The
bootstrap row and
one-time credentials are committed only after the mail relay accepts the
claim email. A retryable 503 leaves no bootstrap row behind.


### Example


```python
import weft_sdk.generated
from weft_sdk.generated.models.account_bootstrap_created_response import AccountBootstrapCreatedResponse
from weft_sdk.generated.models.account_bootstrap_request import AccountBootstrapRequest
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
    api_instance = weft_sdk.generated.AgentBootstrapApi(api_client)
    account_bootstrap_request = weft_sdk.generated.AccountBootstrapRequest() # AccountBootstrapRequest |

    try:
        # Create a temporary agent bootstrap
        api_response = api_instance.create_account_bootstrap(account_bootstrap_request)
        print("The response of AgentBootstrapApi->create_account_bootstrap:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentBootstrapApi->create_account_bootstrap: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **account_bootstrap_request** | [**AccountBootstrapRequest**](AccountBootstrapRequest.md)|  |

### Return type

[**AccountBootstrapCreatedResponse**](AccountBootstrapCreatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Bootstrap created after the claim email is accepted for delivery |  -  |
**503** | Claim email delivery is temporarily unavailable; no bootstrap was created and the request may be retried |  * Retry-After - Suggested delay before retrying, in seconds. <br>  |
**404** | Bootstrap creation is disabled on this deployment. Default-off; a deployment that has not enabled the preview is indistinguishable from one without the feature. Status and cancel are unaffected.  |  -  |
**413** | Request body exceeds the 4 KiB limit |  -  |
**422** | Invalid context, OAuth client, or requested scopes |  -  |
**429** | Rate limit exceeded |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_account_bootstrap**
> AccountBootstrapStatusResponse get_account_bootstrap(id)

Read bootstrap lifecycle status

### Example

* Bearer (BootstrapToken) Authentication (bootstrapAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.account_bootstrap_status_response import AccountBootstrapStatusResponse
from weft_sdk.generated.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://weft.network
# See configuration.py for a list of all supported configuration parameters.
configuration = weft_sdk.generated.Configuration(
    host = "https://weft.network"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (BootstrapToken): bootstrapAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.AgentBootstrapApi(api_client)
    id = 'id_example' # str |

    try:
        # Read bootstrap lifecycle status
        api_response = api_instance.get_account_bootstrap(id)
        print("The response of AgentBootstrapApi->get_account_bootstrap:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling AgentBootstrapApi->get_account_bootstrap: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **str**|  |

### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Current lifecycle and polling guidance, including terminal expiry status |  -  |
**401** | Unknown ID or non-matching bootstrap credential |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
