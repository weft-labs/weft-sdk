# Weft::SearchResponseWarningsInner

## Properties

| Name | Type | Description | Notes |
| ---- | ---- | ----------- | ----- |
| **code** | **String** |  |  |
| **message** | **String** |  |  |
| **cause** | **String** | Typed cause for codes that carry one (e.g. &#x60;DECOMPOSE_FALLBACK&#x60;). Null otherwise. | [optional] |
| **context** | **Object** | Structured context for the warning. Null when the code carries none. | [optional] |

## Example

```ruby
require 'weft-sdk'

instance = Weft::SearchResponseWarningsInner.new(
  code: null,
  message: null,
  cause: null,
  context: null
)
```

