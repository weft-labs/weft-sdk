# SDK and CLI operation inventory

The generated clients expose the complete OpenAPI contract. `WeftClient` and
the separate `@weft-labs/cli` package intentionally expose the buyer runtime needed by applications
and autonomous agents; credential lifecycle, seller, and organization-scoped
operations stay on the lower-level generated clients.

| OpenAPI operation | `WeftClient` | CLI | Classification |
| --- | --- | --- | --- |
| `getOpenApiDocument` | — | — | Excluded: contract discovery metadata |
| `enrollResource` | — | — | Excluded: seller resource enrollment |
| `signUp` | — | — | Excluded: interactive account lifecycle |
| `confirmAccount` | — | — | Excluded: interactive account lifecycle |
| `resendConfirmation` | — | — | Excluded: interactive account lifecycle |
| `signIn` | — | — | Excluded: CLI accepts API keys only |
| `requestPasswordReset` | — | — | Excluded: interactive account lifecycle |
| `updatePassword` | — | — | Excluded: interactive account lifecycle |
| `getMe` | `me()` | `weft me` | Buyer runtime |
| `listApiKeys` | — | — | Excluded: credential lifecycle |
| `createApiKey` | — | — | Excluded: prevents secrets in CLI output/history |
| `revokeApiKey` | — | — | Excluded: credential lifecycle |
| `getBalance` | `balance()` | `weft balance` | Buyer runtime |
| `search` | `search(request)` | `weft search QUERY` | Buyer runtime |
| `fetch` | `fetch(request, options)` | `weft fetch URL --max-cost-usd USD` | Paid buyer runtime |
| `listPayments` | — | — | Excluded: organization-scoped seller ledger |
| `getPayment` | — | — | Excluded: organization-scoped seller ledger |
| `listPurchases` | `purchases(options)` | `weft purchases` | Buyer purchase ledger |
| `getPurchase` | `purchase(id)` | `weft purchases ID` | Buyer purchase detail |

## CLI contract

Authentication is accepted only through `WEFT_API_KEY` or
`--api-key-stdin`; a `--api-key VALUE` argument is rejected so credentials do
not leak into shell history or process listings. The API origin defaults to
`https://weft.network` and can be changed with `WEFT_BASE_URL` or
`--base-url`.

Every command prints one versioned JSON object. Success uses
`{"schema_version":"1","ok":true,"command":"…","data":…}` on stdout.
Errors use
`{"schema_version":"1","ok":false,"command":"…","error":{"code":"…","message":"…","details":…}}`
on stderr. Fetch success also includes
`"meta":{"idempotency_key":"…"}` so an uncertain call can be retried with
the exact same key.

Exit codes are stable:

- `0`: success
- `2`: invalid command, argument, or option
- `3`: missing authentication or an HTTP `401`/`403`
- `4`: other HTTP `4xx` API or policy rejection
- `5`: HTTP `5xx`, network, runtime, or unexpected internal failure

`weft fetch` always requires `--max-cost-usd`. It accepts
`--idempotency-key`; when omitted, the CLI generates a UUID for the
`Idempotency-Key` header.

`--max-results` is validated as `1..50`, and `--per-page` as `1..100`,
before a network request is made.
