# `@weft-labs/sdk`

The supported TypeScript client and CLI for building buyer applications on
Weft.

## Get a buyer API key

Sign in at [weft.network](https://weft.network), then create a key in
[Dashboard → API keys](https://weft.network/dashboard/buyer/api_keys). Copy the
one-time `wk_*` value and store it as `WEFT_API_KEY` in your secret manager or
shell. Do not put it in source code, command arguments, or logs.

```sh
export WEFT_API_KEY="wk_..."
```

## Install

```sh
npm install @weft-labs/sdk @x402/core
```

Node.js 18 or newer is required. The client uses
`https://weft.network` unless `baseUrl` is explicitly supplied.

## First authenticated search

```js
import { WeftClient } from "@weft-labs/sdk";

const apiKey = process.env.WEFT_API_KEY;
if (!apiKey) throw new Error("Set WEFT_API_KEY to a buyer wk_* API key");

const weft = new WeftClient({ apiKey });

const account = await weft.me();
const search = await weft.search({ query: "weather data API" });

console.log({ account: account.data, results: search.results });
```

The complete example is shipped as [`examples/quickstart.mjs`](examples/quickstart.mjs)
and is executed from the packed npm artifact in CI.

## Bounded paid fetch

Every paid fetch needs an explicit spending ceiling. Supply an idempotency key
and reuse that same key when retrying after a timeout or uncertain response.

```js
import { randomUUID } from "node:crypto";
import { WeftClient } from "@weft-labs/sdk";

const apiKey = process.env.WEFT_API_KEY;
if (!apiKey) throw new Error("Set WEFT_API_KEY to a buyer wk_* API key");

const weft = new WeftClient({ apiKey });
const idempotencyKey = randomUUID();

const artifact = await weft.fetch(
  {
    url: "https://merchant.example/data",
    maxCostUsd: "0.05",
  },
  { idempotencyKey },
);

console.log({ idempotencyKey, artifact });
```

Do not create a new key for a retry of the same logical purchase. The CLI
generates a key automatically and returns it in its success envelope.

## CLI

The `weft` executable ships in this package.

```sh
npx --package @weft-labs/sdk weft me
npx --package @weft-labs/sdk weft balance
npx --package @weft-labs/sdk weft search "weather data API" --max-results 5
npx --package @weft-labs/sdk weft fetch "https://merchant.example/data" \
  --max-cost-usd 0.05
```

The CLI accepts credentials only from `WEFT_API_KEY` or `--api-key-stdin`. It
never accepts a key in process arguments. Every response is a versioned JSON
envelope suitable for scripts.

## Error handling

The generated transport throws `ResponseError` for non-2xx responses. Inspect
the status and the structured response body, and retain the server request ID
when asking for support.

```js
import { WeftClient, WeftError } from "@weft-labs/sdk";

const apiKey = process.env.WEFT_API_KEY;
if (!apiKey) throw new Error("Set WEFT_API_KEY to a buyer wk_* API key");

const weft = new WeftClient({ apiKey });

try {
  await weft.search({ query: "weather data API" });
} catch (error) {
  if (error instanceof WeftError) {
    console.error({
      status: error.status,
      code: error.code,
      requestId: error.requestId,
      retryable: error.retryable,
      details: error.details,
    });
  }
  throw error;
}
```

- `401`: confirm that `WEFT_API_KEY` contains a current buyer `wk_*` key.
- `403`: inspect `code` and `details` for an insufficient balance or spending
  policy denial before changing the request.
- `409` (`IDEMPOTENCY_CONFLICT`): this buyer already used the supplied
  idempotency key for a different fetch request. Generate a new key for the
  new operation; the original operation retries unchanged with its own key.
  `retryable` is `false` — resending the conflicting request will conflict
  again.
- `429`: honor `Retry-After` and back off.
- `5xx`: retry transient failures with backoff; reuse the idempotency key for a
  paid fetch.
- `status: 0` (`NETWORK_ERROR`): the request failed before any Weft response,
  so the outcome is uncertain. `retryable` is `true`; retry with backoff and
  reuse the idempotency key for a paid fetch.

## Advanced generated APIs

`WeftClient` is the stable application entrypoint. For operations it does not
yet wrap, the generated OpenAPI classes remain exported:

```js
import { Configuration, SearchApi } from "@weft-labs/sdk";

const configuration = new Configuration({
  accessToken: process.env.WEFT_API_KEY,
  basePath: "https://weft.network",
});
const searchApi = new SearchApi(configuration);
const result = await searchApi.search({
  searchRequest: { query: "weather data API" },
});
```

See the [API reference](https://weft.network/docs) and
[OpenAPI document](https://weft.network/docs/openapi.yaml) for the full
contract.

## Facilitator integration

Seller infrastructure can import the separately exported facilitator helpers:

```js
import { createFacilitatorClient, getFeeInfo } from "@weft-labs/sdk/facilitator";

const facilitator = createFacilitatorClient();
const fee = await getFeeInfo();
```

The default facilitator URL is `https://x402.weft.network`; override it through
the helper configuration or `X402_FACILITATOR_URL`.
