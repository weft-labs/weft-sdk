# \BalanceAPI

All URIs are relative to *https://weft.network*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetBalance**](BalanceAPI.md#GetBalance) | **Get** /api/v1/balance | Get wallet, spending policy, and current-window spend



## GetBalance

> BalanceResponse GetBalance(ctx).Execute()

Get wallet, spending policy, and current-window spend



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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.BalanceAPI.GetBalance(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `BalanceAPI.GetBalance``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetBalance`: BalanceResponse
	fmt.Fprintf(os.Stdout, "Response from `BalanceAPI.GetBalance`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetBalanceRequest struct via the builder pattern


### Return type

[**BalanceResponse**](BalanceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

