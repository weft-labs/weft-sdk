# Weft::SearchApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_curated_marketplace_contract**](SearchApi.md#get_curated_marketplace_contract) | **GET** /contracts/curated-marketplace/{digest}/{operation_id}.json | Get a curated marketplace operation contract |
| [**search**](SearchApi.md#search) | **POST** /api/v1/search | Search the Weft index |


## get_curated_marketplace_contract

> <CuratedMarketplaceContract> get_curated_marketplace_contract(digest, operation_id)

Get a curated marketplace operation contract

Public, content-addressed detail document linked from compact hosted-MCP search results. A matching document is cacheable for one year and immutable. The digest is the SHA-256 of the canonical JSON document. Every reviewed endpoint includes its request and response evidence; asynchronous endpoints also include the authored submit-and-poll lifecycle, identity-header reuse, terminal states, and known gaps.

### Examples

```ruby
require 'time'
require 'weft-sdk'

api_instance = Weft::SearchApi.new
digest = 'digest_example' # String |
operation_id = 'operation_id_example' # String |

begin
  # Get a curated marketplace operation contract
  result = api_instance.get_curated_marketplace_contract(digest, operation_id)
  p result
rescue Weft::ApiError => e
  puts "Error when calling SearchApi->get_curated_marketplace_contract: #{e}"
end
```

#### Using the get_curated_marketplace_contract_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<CuratedMarketplaceContract>, Integer, Hash)> get_curated_marketplace_contract_with_http_info(digest, operation_id)

```ruby
begin
  # Get a curated marketplace operation contract
  data, status_code, headers = api_instance.get_curated_marketplace_contract_with_http_info(digest, operation_id)
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <CuratedMarketplaceContract>
rescue Weft::ApiError => e
  puts "Error when calling SearchApi->get_curated_marketplace_contract_with_http_info: #{e}"
end
```

### Parameters

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **digest** | **String** |  |  |
| **operation_id** | **String** |  |  |

### Return type

[**CuratedMarketplaceContract**](CuratedMarketplaceContract.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## search

> <SearchResponse> search(search_request)

Search the Weft index

Semantic search over the Weft index of paid agent resources. The request body is the weft-search-platform `/v1/search` contract: a free-text `query`, optional `max_results`, and optional structured `filters` (price / price_atomic / type / protocol — the canonical FilterSpec v1 vocabulary, vendored verbatim from the platform). Price is a dual representation of one constraint: `price` in USD decimal strings (the reasoning form) XOR `price_atomic` in integer micro-USD (the settlement form) — mutually exclusive, set at most one.  Account-scoped: the bearer token must be a buyer-scoped API key, an OAuth token carrying `search`, or a pending or claimed `wbt_*` bootstrap bearer. Pending bootstrap access uses an anonymous bootstrap identity; after claim, the promoted bearer uses its bound User. Rejection, cancellation, expiry, and revocation end bootstrap search. Bootstrap search is limited to 60 requests per credential and 120 per IP each hour before native credential promotion.  Response negotiation: `Accept: application/json` (default) returns the structured envelope; `Accept: text/markdown` returns a rendered Markdown digest of the same results — useful for piping into a chat UI or LLM prompt.

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
