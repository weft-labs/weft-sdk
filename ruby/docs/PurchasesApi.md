# Weft::PurchasesApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_purchase**](PurchasesApi.md#get_purchase) | **GET** /api/v1/purchases/{id} | Get a buyer purchase |
| [**list_purchases**](PurchasesApi.md#list_purchases) | **GET** /api/v1/purchases | List buyer purchases |


## get_purchase

> <PurchaseResponse> get_purchase(id)

Get a buyer purchase

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::PurchasesApi.new
id = 56 # Integer | Purchase ID

begin
  # Get a buyer purchase
  result = api_instance.get_purchase(id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling PurchasesApi->get_purchase: #{e}"
end
```

#### Using the get_purchase_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<PurchaseResponse>, Integer, Hash)> get_purchase_with_http_info(id)

```ruby
begin
  # Get a buyer purchase
  data, status_code, headers = api_instance.get_purchase_with_http_info(id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <PurchaseResponse>
rescue Weft::ApiError => e
  puts "Error when calling PurchasesApi->get_purchase_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **id** | **Integer** | Purchase ID |  |

### Return type

[**PurchaseResponse**](PurchaseResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## list_purchases

> <PurchaseListResponse> list_purchases(opts)

List buyer purchases

Returns the authenticated buyer's signing and settlement ledger. Unlike `/api/v1/payments`, this endpoint is User-scoped and backed by `signed_events`, so rejected and pending attempts are included.  Scoped to the buyer's own merchant spend, matching the dashboard's Purchases page. Internal signings are excluded: historical refill self-transfers (`rebalance`) and operator signings (`manual`) are not payments the buyer made and never appear here.

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::PurchasesApi.new
opts = {
  page: 56, # Integer | Page number
  per_page: 56 # Integer | Items per page
}

begin
  # List buyer purchases
  result = api_instance.list_purchases(opts)
  p result
rescue Weft::ApiError => e
  puts "Error when calling PurchasesApi->list_purchases: #{e}"
end
```

#### Using the list_purchases_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<PurchaseListResponse>, Integer, Hash)> list_purchases_with_http_info(opts)

```ruby
begin
  # List buyer purchases
  data, status_code, headers = api_instance.list_purchases_with_http_info(opts)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <PurchaseListResponse>
rescue Weft::ApiError => e
  puts "Error when calling PurchasesApi->list_purchases_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **page** | **Integer** | Page number | [optional][default to 1] |
| **per_page** | **Integer** | Items per page | [optional][default to 25] |

### Return type

[**PurchaseListResponse**](PurchaseListResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json
