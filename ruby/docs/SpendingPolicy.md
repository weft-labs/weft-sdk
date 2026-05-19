# Weft::SpendingPolicy

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **max_tx_usd** | **String** | Maximum USD per single transaction. |  |
| **daily_limit_usd** | **String** | Maximum USD spent in a 24-hour window. |  |
| **weekly_limit_usd** | **String** | Maximum USD spent in a 7-day window. |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SpendingPolicy.new(
  max_tx_usd: 1.00,
  daily_limit_usd: 10.00,
  weekly_limit_usd: 50.00
)
```

