# Weft::ResourcesApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**enroll_resource**](ResourcesApi.md#enroll_resource) | **POST** /api/v1/resources/enroll | Self-enroll a ghost resource (public, no auth) |


## enroll_resource

> <ResourceEnrollmentResponse> enroll_resource(resource_enrollment_request)

Self-enroll a ghost resource (public, no auth)

Lets an unauthenticated agent (or its operator) self-enroll a Resource as a \"ghost\" (no owning provider). The server generates the `slug` and a single-use `claim_token`; the response also carries a `claim_url` the agent hands to its human controller to claim the resource from the dashboard.  Client-supplied `slug` and `category` are silently ignored: slugs are server-generated from `name` (so callers cannot squat on reserved names), and `category` is a post-claim concern set by a real human.  Rate-limited to 10 enrollments/hour/IP. 

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::ResourcesApi.new
resource_enrollment_request = Weft::ResourceEnrollmentRequest.new({kind: 'agent', name: 'Self-Enrolled Bot'}) # ResourceEnrollmentRequest | 

begin
  # Self-enroll a ghost resource (public, no auth)
  result = api_instance.enroll_resource(resource_enrollment_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling ResourcesApi->enroll_resource: #{e}"
end
```

#### Using the enroll_resource_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<ResourceEnrollmentResponse>, Integer, Hash)> enroll_resource_with_http_info(resource_enrollment_request)

```ruby
begin
  # Self-enroll a ghost resource (public, no auth)
  data, status_code, headers = api_instance.enroll_resource_with_http_info(resource_enrollment_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <ResourceEnrollmentResponse>
rescue Weft::ApiError => e
  puts "Error when calling ResourcesApi->enroll_resource_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **resource_enrollment_request** | [**ResourceEnrollmentRequest**](ResourceEnrollmentRequest.md) |  |  |

### Return type

[**ResourceEnrollmentResponse**](ResourceEnrollmentResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

