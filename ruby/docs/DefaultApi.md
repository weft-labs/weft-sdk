# Weft::DefaultApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_api_docs**](DefaultApi.md#get_api_docs) | **GET** /api/v1/docs | Fetch OpenAPI spec |


## get_api_docs

> String get_api_docs

Fetch OpenAPI spec

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::DefaultApi.new

begin
  # Fetch OpenAPI spec
  result = api_instance.get_api_docs
  p result
rescue Weft::ApiError => e
  puts "Error when calling DefaultApi->get_api_docs: #{e}"
end
```

#### Using the get_api_docs_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(String, Integer, Hash)> get_api_docs_with_http_info

```ruby
begin
  # Fetch OpenAPI spec
  data, status_code, headers = api_instance.get_api_docs_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => String
rescue Weft::ApiError => e
  puts "Error when calling DefaultApi->get_api_docs_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/yaml

