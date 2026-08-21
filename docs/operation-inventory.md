# SDK and CLI operation inventory

The generated clients expose the complete OpenAPI contract. `WeftClient` and
the separate `@weft-labs/cli` package intentionally expose the buyer runtime needed by applications
and autonomous agents; credential lifecycle, seller, and organization-scoped
operations stay on the lower-level generated clients.

| OpenAPI operation | `WeftClient` | CLI | Classification |
| --- | --- | --- | --- |
| `getOpenApiDocument` | — | — | Excluded: contract discovery metadata |
| `createAccountBootstrap` | — | `weft bootstrap --email EMAIL --agent-name NAME --reason TEXT` | Agent bootstrap lifecycle |
| `getAccountBootstrap` | — | `weft auth status` | Agent bootstrap lifecycle status |
| `cancelAccountBootstrap` | — | — | Agent bootstrap cancel; API capability only, no CLI command in this version |
| `enrollResource` | — | — | Excluded: seller resource enrollment |
| `signUp` | — | — | Excluded: interactive account lifecycle |
| `confirmAccount` | — | — | Excluded: interactive account lifecycle |
| `resendConfirmation` | — | — | Excluded: interactive account lifecycle |
| `signIn` | — | — | Excluded: CLI uses API keys or stored bootstrap/OAuth credentials |
| `requestPasswordReset` | — | — | Excluded: interactive account lifecycle |
| `updatePassword` | — | — | Excluded: interactive account lifecycle |
| `getMe` | `me()` | `weft me` | Buyer runtime |
| `listApiKeys` | — | — | Excluded: credential lifecycle |
| `createApiKey` | — | — | Excluded: prevents secrets in CLI output/history |
| `revokeApiKey` | — | — | Excluded: credential lifecycle |
| `getBalance` | `balance()` | `weft balance` | Buyer runtime |
| `getCuratedMarketplaceContract` | — | — | Excluded: contract discovery metadata |
| `search` | `search(request)` | `weft search QUERY` | Buyer runtime |
| `fetch` | `fetch(request, options)` | `weft fetch URL --max-cost-usd USD` | Paid buyer runtime |
| `listPayments` | — | — | Excluded: organization-scoped seller ledger |
| `getPayment` | — | — | Excluded: organization-scoped seller ledger |
| `listPurchases` | `purchases(options)` | `weft purchases` | Buyer purchase ledger |
| `getPurchase` | `purchase(id)` | `weft purchases ID` | Buyer purchase detail |

## CLI contract

Authentication precedence is explicit `--api-key-stdin`, then `WEFT_API_KEY`,
then the protected local bootstrap or OAuth credential store. A
`--api-key VALUE` argument is rejected so credentials do not leak into shell
history or process listings. Stored OAuth credentials refresh before expiry.
The API origin defaults to `https://weft.network` and can be changed with
`WEFT_BASE_URL` or `--base-url`; stored credentials retain their API origin.

Every command prints one versioned JSON object. Success uses
`{"schema_version":"1","ok":true,"command":"…","data":…}` on stdout.
Errors use
`{"schema_version":"1","ok":false,"command":"…","error":{"code":"…","message":"…","details":…}}`
on stderr. Fetch success also includes
`"meta":{"idempotency_key":"…"}` so an uncertain call can be retried with
the exact same key.

`weft --help` returns every command, global option, authentication method, and
exit code as JSON. `weft <command> --help` returns command-specific usage and
options. Help does not require authentication or make a network request.

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

## Agent bootstrap

The package implements the bootstrap lifecycle with no subsidy. Read
`weft --help` before scripting it so the installed CLI remains the source of
command syntax.

| Command | Purpose |
| --- | --- |
| `weft bootstrap --email EMAIL --agent-name NAME --reason TEXT` | Create a temporary bootstrap, email the human a claim link, store the `wbt_` and device credentials in a mode-0600 local file |
| `weft auth status` | Report the bootstrap lifecycle state; poll at the interval returned by `weft bootstrap` |

The temporary `wbt_` credential is secret, expires 30 minutes after creation,
and carries only the `search`, `status`, and `cancel` capabilities. Balance,
paid fetch, wallet, transfer, withdrawal, seller, and organization mutation
surfaces refuse it. Lifecycle states are `pending`, `claimed`, `rejected`,
`expired`, and `consumed`; the last three are terminal. Search remains available
through `claimed` and ends only after successful OAuth token delivery consumes
the temporary credential. Cancellation is an API capability; no CLI cancel
command is shipped in this version.

No promotional balance, free credit, or subsidy is part of this lifecycle. A
paid fetch requires the human to fund the wallet after the claim.
