# \AgentBootstrapAPI

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CancelAccountBootstrap**](AgentBootstrapAPI.md#CancelAccountBootstrap) | **Delete** /api/v1/account_bootstraps/{id} | Cancel or revoke a bootstrap credential
[**CreateAccountBootstrap**](AgentBootstrapAPI.md#CreateAccountBootstrap) | **Post** /api/v1/account_bootstraps | Create a temporary agent bootstrap
[**GetAccountBootstrap**](AgentBootstrapAPI.md#GetAccountBootstrap) | **Get** /api/v1/account_bootstraps/{id} | Read bootstrap lifecycle status



## CancelAccountBootstrap

> AccountBootstrapStatusResponse CancelAccountBootstrap(ctx, id).Execute()

Cancel or revoke a bootstrap credential



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weftlabs/weft-sdk/go/generated"
)

func main() {
	id := "id_example" // string |

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AgentBootstrapAPI.CancelAccountBootstrap(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AgentBootstrapAPI.CancelAccountBootstrap``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CancelAccountBootstrap`: AccountBootstrapStatusResponse
	fmt.Fprintf(os.Stdout, "Response from `AgentBootstrapAPI.CancelAccountBootstrap`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  |

### Other Parameters

Other parameters are passed through a pointer to a apiCancelAccountBootstrapRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## CreateAccountBootstrap

> AccountBootstrapCreatedResponse CreateAccountBootstrap(ctx).AccountBootstrapRequest(accountBootstrapRequest).Execute()

Create a temporary agent bootstrap



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weftlabs/weft-sdk/go/generated"
)

func main() {
	accountBootstrapRequest := *openapiclient.NewAccountBootstrapRequest("Email_example", "AgentName_example") // AccountBootstrapRequest |

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AgentBootstrapAPI.CreateAccountBootstrap(context.Background()).AccountBootstrapRequest(accountBootstrapRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AgentBootstrapAPI.CreateAccountBootstrap``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateAccountBootstrap`: AccountBootstrapCreatedResponse
	fmt.Fprintf(os.Stdout, "Response from `AgentBootstrapAPI.CreateAccountBootstrap`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateAccountBootstrapRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **accountBootstrapRequest** | [**AccountBootstrapRequest**](AccountBootstrapRequest.md) |  |

### Return type

[**AccountBootstrapCreatedResponse**](AccountBootstrapCreatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetAccountBootstrap

> AccountBootstrapStatusResponse GetAccountBootstrap(ctx, id).Execute()

Read bootstrap lifecycle status

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weftlabs/weft-sdk/go/generated"
)

func main() {
	id := "id_example" // string |

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AgentBootstrapAPI.GetAccountBootstrap(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AgentBootstrapAPI.GetAccountBootstrap``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetAccountBootstrap`: AccountBootstrapStatusResponse
	fmt.Fprintf(os.Stdout, "Response from `AgentBootstrapAPI.GetAccountBootstrap`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **string** |  |

### Other Parameters

Other parameters are passed through a pointer to a apiGetAccountBootstrapRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**AccountBootstrapStatusResponse**](AccountBootstrapStatusResponse.md)

### Authorization

[bootstrapAuth](../README.md#bootstrapAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)
