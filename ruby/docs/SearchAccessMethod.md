# Weft::SearchAccessMethod

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **access_method_id** | **String** |  |  |
| **protocol** | **String** |  |  |
| **scheme** | **String** |  | [optional] |
| **network** | **String** |  | [optional] |
| **asset** | **String** |  | [optional] |
| **asset_decimals** | **Integer** |  | [optional] |
| **price** | **Object** |  |  |
| **merchant** | **Object** |  | [optional] |
| **terms** | **Object** |  | [optional] |
| **status** | **String** |  | [optional] |
| **weft_fetch** | [**SearchWeftFetchCompatibility**](SearchWeftFetchCompatibility.md) |  |  |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchAccessMethod.new(
  access_method_id: null,
  protocol: null,
  scheme: null,
  network: null,
  asset: null,
  asset_decimals: null,
  price: null,
  merchant: null,
  terms: null,
  status: null,
  weft_fetch: null
)
```
