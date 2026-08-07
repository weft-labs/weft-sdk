# Weft::AccountApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_me**](AccountApi.md#get_me) | **GET** /api/v1/me | Get the current credential principal |


## get_me

> <MeResponse> get_me

Get the current credential principal

Returns the seller Organization represented by an `ax_live_*` resource key, or the buyer User represented by a `wk_*` account key or OAuth access token. Branch on `data.principal_type`.

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::AccountApi.new

begin
  # Get the current credential principal
  result = api_instance.get_me
  p result
rescue Weft::ApiError => e
  puts "Error when calling AccountApi->get_me: #{e}"
end
```

#### Using the get_me_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<MeResponse>, Integer, Hash)> get_me_with_http_info

```ruby
begin
  # Get the current credential principal
  data, status_code, headers = api_instance.get_me_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <MeResponse>
rescue Weft::ApiError => e
  puts "Error when calling AccountApi->get_me_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**MeResponse**](MeResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json
