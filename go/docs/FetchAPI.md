# \FetchAPI

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**Fetch**](FetchAPI.md#Fetch) | **Post** /api/v1/fetch | Pay-and-fetch any URL (x402 proxy)



## Fetch

> FetchResponse Fetch(ctx).FetchRequest(fetchRequest).Execute()

Pay-and-fetch any URL (x402 proxy)



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
	fetchRequest := *openapiclient.NewFetchRequest("https://x402.api.agentmail.to/v0/inboxes") // FetchRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.FetchAPI.Fetch(context.Background()).FetchRequest(fetchRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `FetchAPI.Fetch``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `Fetch`: FetchResponse
	fmt.Fprintf(os.Stdout, "Response from `FetchAPI.Fetch`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiFetchRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fetchRequest** | [**FetchRequest**](FetchRequest.md) |  | 

### Return type

[**FetchResponse**](FetchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

