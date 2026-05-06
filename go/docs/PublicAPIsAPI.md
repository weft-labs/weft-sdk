# \PublicAPIsAPI

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetApiBySlug**](PublicAPIsAPI.md#GetApiBySlug) | **Get** /apis/{slug} | Get a public OpenAPI document for a data_api Resource
[**GetApiOpenApiBySlug**](PublicAPIsAPI.md#GetApiOpenApiBySlug) | **Get** /apis/{slug}/openapi | Get the OpenAPI document for a data_api Resource (deterministic JSON)



## GetApiBySlug

> OpenApiDocument GetApiBySlug(ctx, slug).Execute()

Get a public OpenAPI document for a data_api Resource



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
	slug := "slug_example" // string | Resource slug

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PublicAPIsAPI.GetApiBySlug(context.Background(), slug).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PublicAPIsAPI.GetApiBySlug``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetApiBySlug`: OpenApiDocument
	fmt.Fprintf(os.Stdout, "Response from `PublicAPIsAPI.GetApiBySlug`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**slug** | **string** | Resource slug | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetApiBySlugRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetApiOpenApiBySlug

> OpenApiDocument GetApiOpenApiBySlug(ctx, slug).Execute()

Get the OpenAPI document for a data_api Resource (deterministic JSON)



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
	slug := "slug_example" // string | Resource slug

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.PublicAPIsAPI.GetApiOpenApiBySlug(context.Background(), slug).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `PublicAPIsAPI.GetApiOpenApiBySlug``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetApiOpenApiBySlug`: OpenApiDocument
	fmt.Fprintf(os.Stdout, "Response from `PublicAPIsAPI.GetApiOpenApiBySlug`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**slug** | **string** | Resource slug | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetApiOpenApiBySlugRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

