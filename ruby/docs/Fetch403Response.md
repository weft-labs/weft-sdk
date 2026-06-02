# Weft::Fetch403Response

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'weft-sdk'

Weft::Fetch403Response.openapi_one_of
# =>
# [
#   :'FetchErrorResponse',
#   :'InsufficientScopeResponse'
# ]
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'weft-sdk'

Weft::Fetch403Response.build(data)
# => #<FetchErrorResponse:0x00007fdd4aab02a0>

Weft::Fetch403Response.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `FetchErrorResponse`
- `InsufficientScopeResponse`
- `nil` (if no type matches)

