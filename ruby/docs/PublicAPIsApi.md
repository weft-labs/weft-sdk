# Weft::PublicAPIsApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_api_by_slug**](PublicAPIsApi.md#get_api_by_slug) | **GET** /apis/{slug} | Get a public OpenAPI document for a data_api Resource |
| [**get_api_open_api_by_slug**](PublicAPIsApi.md#get_api_open_api_by_slug) | **GET** /apis/{slug}/openapi | Get the OpenAPI document for a data_api Resource (deterministic JSON) |


## get_api_by_slug

> <OpenApiDocument> get_api_by_slug(slug)

Get a public OpenAPI document for a data_api Resource

Returns the OpenAPI 3.1 document published by a claimed, public-or-unlisted `data_api` Resource. Pricing is intentionally absent — under x402 the price is negotiated per-request via the `402 Payment Required` challenge from the resource server itself.  Browsers (`Accept: text/html`) get an Inertia-rendered HTML landing page instead; SDKs and tooling should prefer `GET /apis/{slug}/openapi` to avoid content-type negotiation.  Ghost Resources (no Provider attached) and `private_profile` Resources return `404`. 

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::PublicAPIsApi.new
slug = 'slug_example' # String | Resource slug

begin
  # Get a public OpenAPI document for a data_api Resource
  result = api_instance.get_api_by_slug(slug)
  p result
rescue Weft::ApiError => e
  puts "Error when calling PublicAPIsApi->get_api_by_slug: #{e}"
end
```

#### Using the get_api_by_slug_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<OpenApiDocument>, Integer, Hash)> get_api_by_slug_with_http_info(slug)

```ruby
begin
  # Get a public OpenAPI document for a data_api Resource
  data, status_code, headers = api_instance.get_api_by_slug_with_http_info(slug)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <OpenApiDocument>
rescue Weft::ApiError => e
  puts "Error when calling PublicAPIsApi->get_api_by_slug_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **slug** | **String** | Resource slug |  |

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## get_api_open_api_by_slug

> <OpenApiDocument> get_api_open_api_by_slug(slug)

Get the OpenAPI document for a data_api Resource (deterministic JSON)

Always returns the OpenAPI 3.1 JSON document, regardless of `Accept` header. SDKs and code-generators should use this path; it is not subject to the HTML/JSON content-type negotiation that `GET /apis/{slug}` performs.  Same visibility rules as `GET /apis/{slug}` (Ghost Resources and `private_profile` Resources return `404`). 

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::PublicAPIsApi.new
slug = 'slug_example' # String | Resource slug

begin
  # Get the OpenAPI document for a data_api Resource (deterministic JSON)
  result = api_instance.get_api_open_api_by_slug(slug)
  p result
rescue Weft::ApiError => e
  puts "Error when calling PublicAPIsApi->get_api_open_api_by_slug: #{e}"
end
```

#### Using the get_api_open_api_by_slug_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<OpenApiDocument>, Integer, Hash)> get_api_open_api_by_slug_with_http_info(slug)

```ruby
begin
  # Get the OpenAPI document for a data_api Resource (deterministic JSON)
  data, status_code, headers = api_instance.get_api_open_api_by_slug_with_http_info(slug)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <OpenApiDocument>
rescue Weft::ApiError => e
  puts "Error when calling PublicAPIsApi->get_api_open_api_by_slug_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **slug** | **String** | Resource slug |  |

### Return type

[**OpenApiDocument**](OpenApiDocument.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

