# Weft::MeResponseData

## Class instance methods

### `openapi_one_of`

Returns the list of classes defined in oneOf.

#### Example

```ruby
require 'weft-sdk'

Weft::MeResponseData.openapi_one_of
# =>
# [
#   :'AccountDetails',
#   :'UserPrincipal'
# ]
```

### `openapi_discriminator_name`

Returns the discriminator's property name.

#### Example

```ruby
require 'weft-sdk'

Weft::MeResponseData.openapi_discriminator_name
# => :'principal_type'
```

### `openapi_discriminator_name`

Returns the discriminator's mapping.

#### Example

```ruby
require 'weft-sdk'

Weft::MeResponseData.openapi_discriminator_mapping
# =>
# {
#   :'organization' => :'AccountDetails',
#   :'user' => :'UserPrincipal'
# }
```

### build

Find the appropriate object from the `openapi_one_of` list and casts the data into it.

#### Example

```ruby
require 'weft-sdk'

Weft::MeResponseData.build(data)
# => #<AccountDetails:0x00007fdd4aab02a0>

Weft::MeResponseData.build(data_that_doesnt_match)
# => nil
```

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| **data** | **Mixed** | data to be matched against the list of oneOf items |

#### Return type

- `AccountDetails`
- `UserPrincipal`
- `nil` (if no type matches)
