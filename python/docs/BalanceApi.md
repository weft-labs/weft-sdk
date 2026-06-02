# weft_sdk.generated.BalanceApi

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_balance**](BalanceApi.md#get_balance) | **GET** /api/v1/balance | Get wallet, spending policy, and current-window spend


# **get_balance**
> BalanceResponse get_balance()

Get wallet, spending policy, and current-window spend

Read-only snapshot for the buyer behind the bearer token. The
response always includes a `promo` block — values are zero in v1
and fill in once the freemium promo ledger ships, without a
shape change. `wallet.balance_usdc` is fetched live from Privy;
if Privy is unreachable the field returns `"0.00"` rather than
erroring the whole call.

Account-scoped: the bearer must be a buyer-scoped API key.


### Example

* Bearer (APIKey) Authentication (bearerAuth):

```python
import weft_sdk.generated
from weft_sdk.generated.models.balance_response import BalanceResponse
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

# Configure Bearer authorization (APIKey): bearerAuth
configuration = weft_sdk.generated.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with weft_sdk.generated.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = weft_sdk.generated.BalanceApi(api_client)

    try:
        # Get wallet, spending policy, and current-window spend
        api_response = api_instance.get_balance()
        print("The response of BalanceApi->get_balance:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling BalanceApi->get_balance: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**BalanceResponse**](BalanceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Wallet + policy + spend snapshot |  -  |
**401** | Unauthorized — missing or non-buyer-scoped API key |  -  |
**403** | The OAuth access token authenticated but lacks the &#x60;balance&#x60; scope (RFC 6750 &#x60;insufficient_scope&#x60;). Carries a &#x60;WWW-Authenticate: Bearer error&#x3D;\&quot;insufficient_scope\&quot;, scope&#x3D;\&quot;balance\&quot;&#x60; header. &#x60;wk_&#x60; API keys are unscoped and never see this.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

