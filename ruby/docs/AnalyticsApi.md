# Weft::AnalyticsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_analytics**](AnalyticsApi.md#get_analytics) | **GET** /api/v1/analytics | Get payment analytics |


## get_analytics

> <AnalyticsResponse> get_analytics

Get payment analytics

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AnalyticsApi.new

begin
  # Get payment analytics
  result = api_instance.get_analytics
  p result
rescue Weft::ApiError => e
  puts "Error when calling AnalyticsApi->get_analytics: #{e}"
end
```

#### Using the get_analytics_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<AnalyticsResponse>, Integer, Hash)> get_analytics_with_http_info

```ruby
begin
  # Get payment analytics
  data, status_code, headers = api_instance.get_analytics_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <AnalyticsResponse>
rescue Weft::ApiError => e
  puts "Error when calling AnalyticsApi->get_analytics_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AnalyticsResponse**](AnalyticsResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

