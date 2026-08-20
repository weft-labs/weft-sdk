# Weft SDK

Build buyer applications and agents on Weft. The TypeScript SDK, the separate
`weft` CLI package, and the Python buyer client are the supported application surfaces;
generated clients remain available when you need direct access to the OpenAPI
contract.

## TypeScript quickstart

1. Sign in at [weft.network](https://weft.network).
2. Create a buyer API key in
   [Dashboard → API keys](https://weft.network/dashboard/buyer/api_keys). Copy
   the one-time `wk_*` value and keep it out of source control.
3. Install the SDK and set the key in your shell:

   ```sh
   npm install @weft-labs/sdk @x402/core
   export WEFT_API_KEY="wk_..."
   ```

4. Create `quickstart.mjs`:

   ```js
   import { WeftClient } from "@weft-labs/sdk";

   const apiKey = process.env.WEFT_API_KEY;
   if (!apiKey) throw new Error("Set WEFT_API_KEY to a buyer wk_* API key");

   const weft = new WeftClient({ apiKey });

   const account = await weft.me();
   const search = await weft.search({ query: "weather data API" });

   console.log({ account: account.data, results: search.results });
   ```

   ```sh
   node quickstart.mjs
   ```

`WeftClient` uses `https://weft.network` by default. See the
[TypeScript guide](typescript/README.md) for bounded paid fetches, retries, error
handling, the CLI, and low-level generated APIs. The executable source for the
quickstart is shipped in the package at
[`examples/quickstart.mjs`](typescript/examples/quickstart.mjs).

## CLI quickstart

The CLI is published separately from the application SDK.

```sh
npm install -g @weft-labs/cli
weft --help

npx --package @weft-labs/cli weft me
npx --package @weft-labs/cli weft search "weather data API"
npx --package @weft-labs/cli weft fetch "https://merchant.example/data" \
  --max-cost-usd 0.05
```

`fetch` requires a maximum cost. The CLI also generates an idempotency key and
returns it in `meta.idempotency_key`, so a caller can safely reuse it when
retrying an uncertain request. A global npm install also installs the Weft
Skill for supported agent hosts. See the [CLI guide](cli/README.md) for
credential-free bootstrap and human claim.

## Language support

| Language | Package | Support level | Recommended surface |
|---|---|---|---|
| TypeScript | `@weft-labs/sdk` | Supported | `WeftClient` |
| CLI | `@weft-labs/cli` | Supported | `weft` executable |
| Python | `weft-sdk` | Supported | `Client` buyer façade |
| Ruby | `weft-sdk` | Generated client preview | Generated APIs |
| Go | `github.com/weft-labs/weft-sdk/go` | Generated client preview | Generated APIs |

“Generated client preview” means the package is published and tracks the API
contract, but has not yet passed a clean-install buyer quickstart gate.

## Reference and support

- [API reference](https://weft.network/docs)
- [OpenAPI document](https://weft.network/docs/openapi.yaml)
- [TypeScript package guide](typescript/README.md)
- [Python package guide](python/README.md)
- [GitHub issues](https://github.com/weft-labs/weft-sdk/issues)

## Repository layout

- `spec/openapi.yaml` — canonical contract copy synchronized from `weft-app`
- `typescript/` — npm package `@weft-labs/sdk`
- `cli/` — npm package `@weft-labs/cli`
- `python/` — PyPI package `weft-sdk`
- `ruby/` — RubyGems package `weft-sdk`
- `go/` — Go module `github.com/weft-labs/weft-sdk/go`
- `scripts/` — generation, conformance, and release checks

All language packages share a version tied to the OpenAPI version. Generated
sources are updated by the spec-sync workflow and must not be edited manually.

## Local development tools

Mise pins the repository runtimes and standalone source tools. Install them and
enable the Git hooks with:

```sh
mise install
mise exec -- lefthook install
```

Pre-commit checks lint or format staged files only. Pre-push runs whole-repo
lint plus the four deterministic unit-test suites. Builds, generated-code
checks, type checks, quickstarts, and network tests remain in CI.
