# Weft::ResourcesApi

All URIs are relative to *https://api.weftlabs.com*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**enroll_resource**](ResourcesApi.md#enroll_resource) | **POST** /api/v1/resources/enroll | Self-enroll a Resource (ghost) |


## enroll_resource

> <EnrolledResourceResponse> enroll_resource(enroll_resource_request)

Self-enroll a Resource (ghost)

Public, unauthenticated endpoint. An agent (or its operator) creates a ghost Resource — a Resource with no Provider attached. The server generates the slug and a single-use `claim_token`. The enrolling client passes the `claim_url` back to its human controller, who signs up and visits the URL to claim the Resource into their organization.  **Rate limit:** 10 enrollments / hour / IP. Exceeding the limit returns `429 Too Many Requests`.  **Server-controlled fields:** `slug` is generated from `name` and cannot be supplied. `category` is intentionally rejected — domain category is set after claim, by the human, from a constrained list. 

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::ResourcesApi.new
enroll_resource_request = Weft::EnrollResourceRequest.new({kind: 'agent', name: 'name_example'}) # EnrollResourceRequest | 

begin
  # Self-enroll a Resource (ghost)
  result = api_instance.enroll_resource(enroll_resource_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling ResourcesApi->enroll_resource: #{e}"
end
```

#### Using the enroll_resource_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<EnrolledResourceResponse>, Integer, Hash)> enroll_resource_with_http_info(enroll_resource_request)

```ruby
begin
  # Self-enroll a Resource (ghost)
  data, status_code, headers = api_instance.enroll_resource_with_http_info(enroll_resource_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <EnrolledResourceResponse>
rescue Weft::ApiError => e
  puts "Error when calling ResourcesApi->enroll_resource_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **enroll_resource_request** | [**EnrollResourceRequest**](EnrollResourceRequest.md) |  |  |

### Return type

[**EnrolledResourceResponse**](EnrolledResourceResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

