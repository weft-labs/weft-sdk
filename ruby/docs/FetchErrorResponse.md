# Weft::FetchErrorResponse

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **error** | **String** | Stable error code. |  |
| **details** | **Hash&lt;String, Object&gt;** | Optional context. Shape varies by error code. |  |
| **policy** | [**SpendingPolicy**](SpendingPolicy.md) |  |  |
| **balance** | [**FetchBalanceSnapshot**](FetchBalanceSnapshot.md) |  |  |
| **dashboard_url** | **String** | Deep-link to the dashboard&#39;s policy page. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::FetchErrorResponse.new(
  error: EXCEEDED_MAX_COST,
  details: null,
  policy: null,
  balance: null,
  dashboard_url: null
)
```

