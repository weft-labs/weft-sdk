---
name: pi-weft
description: Call the Weft prod API from pi or any shell using a buyer wk_* API key. Trigger when the user wants to check the Weft wallet balance, search the paid-API index (free), or buy/fetch an x402-protected endpoint (paid) via the `weft` CLI or the TS/Python SDK — phrases like "call weft prod", "use the weft sdk", "WEFT_API_KEY", "weft fetch", "weft balance", "buy this api", "pay an x402 endpoint". This is the API-key path. Distinct from `weft-mcp` (hosted MCP server, weft_* tools, browser sign-in) and the `weft` skill (Claude Code MCP setup): use those when the weft_* MCP tools exist; use this one when they do not.
---

# pi-weft

Weft prod buyer access with an API key. Prod base URL: `https://weft.network`.

## Credentials

- Read the key from `WEFT_API_KEY` or source `~/.config/weft/.env` (mode 600, outside git):
  ```sh
  source ~/.config/weft/.env   # exports WEFT_API_KEY
  ```
- Verify with `weft me`. A `401` means a bad or expired key.
- Never commit the key and never forward it to a third party.

## Tools

### CLI (recommended, works from anywhere)

```sh
npx --package @weft-labs/sdk weft me
npx --package @weft-labs/sdk weft balance
npx --package @weft-labs/sdk weft search "weather data API" --max-results 5
npx --package @weft-labs/sdk weft fetch "https://merchant.example/data" --max-cost-usd 0.05
```

The same CLI ships in the repo checkout at `weft-sdk/typescript/cli/weft.mjs`.

### TypeScript SDK

```js
import { WeftClient } from "@weft-labs/sdk";
const weft = new WeftClient({ apiKey }); // defaults to https://weft.network
const account = await weft.me();
const search = await weft.search({ query: "weather data API", maxResults: 5 });
const artifact = await weft.fetch(url, maxCostUsd, idempotencyKey);
```

### Python SDK

```python
from weft_sdk import Client

with Client(api_key=api_key) as weft:
    account = weft.me()
    results = weft.search(query="weather data API", max_results=5)
    artifact = weft.fetch(url, max_cost_usd="0.05", idempotency_key=str(uuid4()))
```

## The loop

Always: **search (free) → choose → fetch (paid) → present**. Chain fetches like
shell pipelines; the output of one fetch becomes the input of the next.

### Search — free

- Use `max_results` / `maxResults` (1–50). Never use `limit` — the server rejects it.
- Narrow with filters: `type` (api/agent/mcp_tool/webpage/feed/document/dataset),
  `protocol` (x402/a2a/mpp/erc_8004), `price` (decimal STRING, e.g. `{"lte":"0.001"}`),
  `price_atomic` (integer micro-USD). Set `price` OR `price_atomic`, never both.
- Some results carry no `price` field (not live-verified). The `max_cost_usd` cap protects the spend.
- Attribution: the CLI has no `search_id` flag; the TS SDK's fetch request accepts an advisory `searchId` (attribution only — never affects payment, authorization, or idempotency). The MCP `weft_fetch` accepts `search_id` too. Keep the `queryTraceId` for your own records.

### Fetch — paid

- Always set `--max-cost-usd` — it is a ceiling, not a budget. Unset silently defaults to `"0.10"` — never rely on it. On `EXCEEDED_MAX_COST` the response includes the merchant's live quote (`details.amount_usd`) — raise the cap to at least that amount (within policy) and retry once, or switch providers.
- The CLI generates an idempotency key and returns it in `meta.idempotency_key`. Reuse it when retrying an uncertain request.
- Decode `bodyBase64` — that is the purchased data. Cost is `paid_usd + held_usd`.
- `paymentStatus: "pending"` with a `held_usd` amount is a successful request whose settlement is still confirming — money likely moved, do **not** retry.

## Safety

- The wallet enforces the spending policy on every paid call (per-tx, daily, weekly caps; balance). A refusal is a hard stop — explain it, do not weaken or work around it.
- Never automatically retry a paid fetch after a timeout or ambiguous response. Search and balance are safe to retry.
- A `POST` fetch is a real-world side effect: show the recipient and payload, get explicit confirmation first.
- Error semantics: `401` bad key · `403` policy/balance denial (read `code`/`details`) · `409` `IDEMPOTENCY_CONFLICT` — generate a new key, the old operation retries unchanged with its own key · `429` honor `Retry-After` · `5xx` retry with backoff, reuse the idempotency key for paid fetches · `status 0` network error before any response, `retryable: true`.

## Traps (from real sessions, 2026-08-14)

- **Indexed price can be stale.** `EXCEEDED_MAX_COST` with a live quote above the indexed price is common. Do not retry at the same cap — either raise `max_cost_usd` to the merchant's quoted amount (within the wallet policy) or pick another provider.
- **Only fetch URLs that actually serve a 402 challenge.** A `MERCHANT_RETURNED_NON_402` (200/301/401/403/404) means the URL is not a purchasable x402 endpoint. Never `weft_fetch` ordinary web pages — use plain HTTP for free content.
- **Async jobs return a poll URL.** When a fetch returns a `poll_url` + `feedback_token` (job accepted, `status: processing`), poll it with a plain authenticated GET — never `weft_fetch` the poll URL; it is not an x402 endpoint.
- **Check the endpoint's `call` contract before POSTing.** Wrong payload shape causes `HTTP_400` *after* payment is held (declined-pending). Example: PDL-style people-enrich rejects `{"name":…}` and requires `first_name` + `last_name` + `company_name`.

## POST requests (people-intelligence pipeline)

The CLI cannot send a JSON body or headers — `weft fetch` supports only
`--max-cost-usd`, `--method`, `--idempotency-key` — and the Python façade's
`fetch` accepts no body/headers either. For JSON POST endpoints use the
TypeScript SDK:

```js
import { WeftClient } from "@weft-labs/sdk";
import { randomUUID } from "node:crypto";

const weft = new WeftClient({ apiKey: process.env.WEFT_API_KEY });
const res = await weft.fetch(
  {
    url: "https://api.exa.ai/search",
    maxCostUsd: "0.02",
    method: "POST",
    headers: { "Content-Type": "application/json" }, // required — gateway drops the body without it
    body: JSON.stringify({ query: "companies like Lyzr.ai", numResults: 8, category: "company" }),
  },
  { idempotencyKey: randomUUID() },
);
const data = JSON.parse(Buffer.from(res.bodyBase64, "base64").toString("utf-8"));
```

Verified 2026-08-14: Exa `/search` through this pattern returned HTTP 200,
paid $0.007, settled on-chain. GET endpoints (e.g. email-finder
`/api/find?domain=…&firstName=…&lastName=…`) work through the CLI with the
query string embedded in the URL.

## Do-not-use endpoints (observed broken or mispriced)

| Endpoint | Problem | Status |
|---|---|---|
| `stable-enrich-git-shafu-merchant-health-sc-efad26-merit-systems.vercel.app/api/fullenrich/people-search` | Merchant out of credits — `403 "Not enough credits"` | Broken until merchant tops up |
| `gillinghammer--agentwonderland-api.modal.run/jobs/*` | Async job poll URL, not an x402 endpoint — `401` | Do not `weft_fetch`; poll directly with `feedback_token` |
| `stable-enrich-git-shafu-stableenrich-pdl-p-274589-merit-systems.vercel.app/api/pdl/people-enrich` | Index price $0.14 vs live quote $0.20; rejects `name` field | Use cap ≥ $0.20 and structured `first_name`/`last_name`/`company_name` |
| `gateway.apiosk.com/prospect-research/person-enrichment` | Live quote $0.15 vs indexed price lower | Verify price before fetch; cap ≥ $0.15 |
| Ordinary web pages (e.g. botsify.com, rasa.com, g2.com, stackai.com blog/list pages) | No x402 challenge — free content | Never `weft_fetch`; plain HTTP instead |

## Verified against prod (2026-08-14)

- `me`: patrick@weftlabs.com, buyer enabled, wallet `0x5E93…9288` on base_mainnet.
- `balance`: ~$10.05 USDC + ~$2.52 tempo; policy maxTx $12 / daily $23 / weekly $124.
- `search`: free; 200 candidates for "weather data API".
- `fetch`: SuVerse weather endpoint paid $0.05 (x402, `eip155:8453`), returned NYC weather JSON. Settlement was `pending` with `heldUsd` at capture time.
