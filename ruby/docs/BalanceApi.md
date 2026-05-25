# Weft::BalanceApi

All URIs are relative to *https://weft.network*

| Method | HTTP request | Description |
| ------ | ------------ | ----------- |
| [**get_balance**](BalanceApi.md#get_balance) | **GET** /api/v1/balance | Get wallet, spending policy, and current-window spend |


## get_balance

> <BalanceResponse> get_balance

Get wallet, spending policy, and current-window spend

Read-only snapshot for the buyer behind the bearer token. The response always includes a `promo` block — values are zero in v1 and fill in once the freemium promo ledger ships, without a shape change. `wallet.balance_usdc` is fetched live from Privy; if Privy is unreachable the field returns `\"0.00\"` rather than erroring the whole call.  Account-scoped: the bearer must be a buyer-scoped API key. 

### Examples

```ruby
require 'time'
require 'weft-sdk'
# setup authorization
Weft.configure do |config|
  # Configure Bearer authorization (APIKey): bearerAuth
  config.access_token = 'YOUR_BEARER_TOKEN'
end

api_instance = Weft::BalanceApi.new

begin
  # Get wallet, spending policy, and current-window spend
  result = api_instance.get_balance
  p result
rescue Weft::ApiError => e
  puts "Error when calling BalanceApi->get_balance: #{e}"
end
```

#### Using the get_balance_with_http_info variant

This returns an Array which contains the response data, status code and headers.

> <Array(<BalanceResponse>, Integer, Hash)> get_balance_with_http_info

```ruby
begin
  # Get wallet, spending policy, and current-window spend
  data, status_code, headers = api_instance.get_balance_with_http_info
  p status_code # => 2xx
  p headers # => { ... }
  p data # => <BalanceResponse>
rescue Weft::ApiError => e
  puts "Error when calling BalanceApi->get_balance_with_http_info: #{e}"
end
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**BalanceResponse**](BalanceResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

