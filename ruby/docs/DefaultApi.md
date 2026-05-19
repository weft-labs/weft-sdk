# Weft::DefaultApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_open_api_document**](DefaultApi.md#get_open_api_document) | **GET** /docs/openapi.yaml | Fetch this OpenAPI document |


## get_open_api_document

> String get_open_api_document

Fetch this OpenAPI document

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::DefaultApi.new

begin
  # Fetch this OpenAPI document
  result = api_instance.get_open_api_document
  p result
rescue Weft::ApiError => e
  puts "Error when calling DefaultApi->get_open_api_document: #{e}"
end
```

#### Using the get_open_api_document_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(String, Integer, Hash)> get_open_api_document_with_http_info

```ruby
begin
  # Fetch this OpenAPI document
  data, status_code, headers = api_instance.get_open_api_document_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => String
rescue Weft::ApiError => e
  puts "Error when calling DefaultApi->get_open_api_document_with_http_info: #{e}"
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

