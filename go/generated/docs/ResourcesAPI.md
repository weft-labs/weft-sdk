# \ResourcesAPI

All URIs are relative to *https://api.weftlabs.com*

Method | HTTP request | Description
------------- | ------------- | -------------
[**EnrollResource**](ResourcesAPI.md#EnrollResource) | **Post** /api/v1/resources/enroll | Self-enroll a Resource (ghost)



## EnrollResource

> EnrolledResourceResponse EnrollResource(ctx).EnrollResourceRequest(enrollResourceRequest).Execute()

Self-enroll a Resource (ghost)



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
	enrollResourceRequest := *openapiclient.NewEnrollResourceRequest("Kind_example", "Name_example") // EnrollResourceRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ResourcesAPI.EnrollResource(context.Background()).EnrollResourceRequest(enrollResourceRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ResourcesAPI.EnrollResource``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `EnrollResource`: EnrolledResourceResponse
	fmt.Fprintf(os.Stdout, "Response from `ResourcesAPI.EnrollResource`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiEnrollResourceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **enrollResourceRequest** | [**EnrollResourceRequest**](EnrollResourceRequest.md) |  | 

### Return type

[**EnrolledResourceResponse**](EnrolledResourceResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

