# Weft::SearchApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**search**](SearchApi.md#search) | **POST** /api/v1/search | Search the Weft index |


## search

> <SearchResponse> search(search_request)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The request body carries a free-text `query`, an optional `limit`, and an optional `filters` object that narrows by price band, payment protocol, agent protocol, or domain tag. Filters are applied as a post-filter after the embedding score is computed.  Backend selection is server-side via the `SEARCH_BACKEND` env var: `mock` (default, reads YAML fixtures and sets `_mock: true` in the response) or `platform` (proxies to the upstream search service). Both backends return the same envelope.  Account-scoped: the bearer token must be a buyer-scoped API key. Free for authenticated buyers in v1; billing is planned for a later release.  Response negotiation: `Accept: application/json` (default) returns the structured envelope; `Accept: text/markdown` returns a rendered Markdown digest of the same results — useful for piping into a chat UI or LLM prompt. 

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::SearchApi.new
search_request = Weft::SearchRequest.new({query: 'send email from an agent'}) # SearchRequest | 

begin
  # Search the Weft index
  result = api_instance.search(search_request)
  p result
rescue Weft::ApiError => e
  puts "Error when calling SearchApi->search: #{e}"
end
```

#### Using the search_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<SearchResponse>, Integer, Hash)> search_with_http_info(search_request)

```ruby
begin
  # Search the Weft index
  data, status_code, headers = api_instance.search_with_http_info(search_request)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <SearchResponse>
rescue Weft::ApiError => e
  puts "Error when calling SearchApi->search_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **search_request** | [**SearchRequest**](SearchRequest.md) |  |  |

### Return type

[**SearchResponse**](SearchResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json, text/markdown

