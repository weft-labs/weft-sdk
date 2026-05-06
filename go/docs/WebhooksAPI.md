# \WebhooksAPI

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateWebhookEndpoint**](WebhooksAPI.md#CreateWebhookEndpoint) | **Post** /api/v1/webhook_endpoints | Create a webhook endpoint
[**DeleteWebhookEndpoint**](WebhooksAPI.md#DeleteWebhookEndpoint) | **Delete** /api/v1/webhook_endpoints/{id} | Delete a webhook endpoint
[**GetWebhookEndpoint**](WebhooksAPI.md#GetWebhookEndpoint) | **Get** /api/v1/webhook_endpoints/{id} | Get a webhook endpoint
[**ListWebhookEndpoints**](WebhooksAPI.md#ListWebhookEndpoints) | **Get** /api/v1/webhook_endpoints | List webhook endpoints
[**UpdateWebhookEndpoint**](WebhooksAPI.md#UpdateWebhookEndpoint) | **Patch** /api/v1/webhook_endpoints/{id} | Update a webhook endpoint



## CreateWebhookEndpoint

> WebhookEndpointCreatedResponse CreateWebhookEndpoint(ctx).CreateWebhookEndpointRequest(createWebhookEndpointRequest).Execute()

Create a webhook endpoint

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	createWebhookEndpointRequest := *openapiclient.NewCreateWebhookEndpointRequest("Url_example", []string{"Events_example"}) // CreateWebhookEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WebhooksAPI.CreateWebhookEndpoint(context.Background()).CreateWebhookEndpointRequest(createWebhookEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WebhooksAPI.CreateWebhookEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWebhookEndpoint`: WebhookEndpointCreatedResponse
	fmt.Fprintf(os.Stdout, "Response from `WebhooksAPI.CreateWebhookEndpoint`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWebhookEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createWebhookEndpointRequest** | [**CreateWebhookEndpointRequest**](CreateWebhookEndpointRequest.md) |  | 

### Return type

[**WebhookEndpointCreatedResponse**](WebhookEndpointCreatedResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWebhookEndpoint

> MessageResponse DeleteWebhookEndpoint(ctx, id).Execute()

Delete a webhook endpoint

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	id := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WebhooksAPI.DeleteWebhookEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WebhooksAPI.DeleteWebhookEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `DeleteWebhookEndpoint`: MessageResponse
	fmt.Fprintf(os.Stdout, "Response from `WebhooksAPI.DeleteWebhookEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWebhookEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MessageResponse**](MessageResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWebhookEndpoint

> WebhookEndpointResponse GetWebhookEndpoint(ctx, id).Execute()

Get a webhook endpoint

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	id := int32(56) // int32 | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WebhooksAPI.GetWebhookEndpoint(context.Background(), id).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WebhooksAPI.GetWebhookEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWebhookEndpoint`: WebhookEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `WebhooksAPI.GetWebhookEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWebhookEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ListWebhookEndpoints

> WebhookEndpointListResponse ListWebhookEndpoints(ctx).Page(page).PerPage(perPage).Execute()

List webhook endpoints

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	page := int32(56) // int32 |  (optional) (default to 1)
	perPage := int32(56) // int32 |  (optional) (default to 25)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WebhooksAPI.ListWebhookEndpoints(context.Background()).Page(page).PerPage(perPage).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WebhooksAPI.ListWebhookEndpoints``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ListWebhookEndpoints`: WebhookEndpointListResponse
	fmt.Fprintf(os.Stdout, "Response from `WebhooksAPI.ListWebhookEndpoints`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiListWebhookEndpointsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int32** |  | [default to 1]
 **perPage** | **int32** |  | [default to 25]

### Return type

[**WebhookEndpointListResponse**](WebhookEndpointListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateWebhookEndpoint

> WebhookEndpointResponse UpdateWebhookEndpoint(ctx, id).UpdateWebhookEndpointRequest(updateWebhookEndpointRequest).Execute()

Update a webhook endpoint

### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/weft-labs/weft-sdk/go/generated"
)

func main() {
	id := int32(56) // int32 | 
	updateWebhookEndpointRequest := *openapiclient.NewUpdateWebhookEndpointRequest() // UpdateWebhookEndpointRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WebhooksAPI.UpdateWebhookEndpoint(context.Background(), id).UpdateWebhookEndpointRequest(updateWebhookEndpointRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WebhooksAPI.UpdateWebhookEndpoint``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateWebhookEndpoint`: WebhookEndpointResponse
	fmt.Fprintf(os.Stdout, "Response from `WebhooksAPI.UpdateWebhookEndpoint`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**id** | **int32** |  | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateWebhookEndpointRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **updateWebhookEndpointRequest** | [**UpdateWebhookEndpointRequest**](UpdateWebhookEndpointRequest.md) |  | 

### Return type

[**WebhookEndpointResponse**](WebhookEndpointResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

