# \ResourcesAPI

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**EnrollResource**](ResourcesAPI.md#EnrollResource) | **Post** /api/v1/resources/enroll | Self-enroll a ghost resource (public, no auth)



## EnrollResource

> ResourceEnrollmentResponse EnrollResource(ctx).ResourceEnrollmentRequest(resourceEnrollmentRequest).Execute()

Self-enroll a ghost resource (public, no auth)



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
	resourceEnrollmentRequest := *openapiclient.NewResourceEnrollmentRequest("agent", "Self-Enrolled Bot") // ResourceEnrollmentRequest | 

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.ResourcesAPI.EnrollResource(context.Background()).ResourceEnrollmentRequest(resourceEnrollmentRequest).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `ResourcesAPI.EnrollResource``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `EnrollResource`: ResourceEnrollmentResponse
	fmt.Fprintf(os.Stdout, "Response from `ResourcesAPI.EnrollResource`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiEnrollResourceRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resourceEnrollmentRequest** | [**ResourceEnrollmentRequest**](ResourceEnrollmentRequest.md) |  | 

### Return type

[**ResourceEnrollmentResponse**](ResourceEnrollmentResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

