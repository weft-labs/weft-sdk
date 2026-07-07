---
name: weft
description: Use the Weft Account wallet to search the agent web and pay any x402 endpoint. Trigger when the user asks to find paid APIs, agents, or data resources, or asks to retrieve/buy from a URL that may require payment. Drives the `weft` CLI to read balance, run paid searches, and fetch x402-protected resources within the user's spending policy.
---

# Weft

Weft Account is a self-custodial wallet for paying x402-protected endpoints from
inside an agent host. The `weft` CLI wraps the Weft buyer API: check funds, find
paid resources, and buy from them within the user's spending policy.

In a developer/agent loop, **drive the CLI** — it is deterministic, pipeable, and
an order of magnitude cheaper and more reliable than tool calls (see
`directives/agent-developer-experience.md`). Reach for the hosted MCP only on the
narrow path below (non-shell hosts like ChatGPT).

## Setup (CLI — the default)

If the `weft` command is not available, bootstrap it:

```sh
bash <(curl -sSL https://weftlabs.com/skill/install.sh)
```

Direct equivalents:

```sh
npm i -g @weft-labs/cli            # persistent `weft` on PATH
# or, zero-install, pinned:
npx -y @weft-labs/cli@latest <cmd>
```

Authenticate once. For scripting/CI use an API key; for a human, use interactive
browser login:

```sh
export WEFT_API_KEY=wk_…           # or: weft login --api-key wk_…
weft login                         # interactive browser OAuth (PKCE loopback)
```

Point at a non-production host with `--base-url` or `WEFT_BASE_URL`
(defaults to production).

## Usage

Add `--json` to any command for machine-readable, credential-free output to pipe
into `jq`.

- **Check funds first.** Run `weft balance` before suggesting any paid action;
  abort if the wallet balance is below the expected cost.

  ```sh
  weft balance --json | jq -r '.wallet.balance_usdc'
  ```

- **Discover paid resources** with `weft search`. Free for authenticated buyers in v1.

  ```sh
  weft search "fresh crawl of <topic>" --limit 5
  ```

- **Buy a resource** with `weft fetch`. Always pass a tight `--max-cost-usd`
  ceiling — never omit it. If the returned cost looks suspicious (very new
  merchant, no settlement history), flag to the user before re-using.

  ```sh
  weft fetch <url> --max-cost-usd 0.01 [--method POST --body '<json>']
  ```

## Errors

The CLI decodes the `FetchErrorResponse` envelope and prints actionable fields
(it does not dump raw JSON unless `--json` is set):

- **Insufficient balance** — shows current balance + the `dashboard_url` to top
  up. Stop and surface the URL; do not retry.
- **Policy denial** (`POLICY_VIOLATION_*`) — the user exceeded their spending
  policy. Surface the policy reason + `dashboard_url`; don't retry silently.
- **`SETTLEMENT_FAILED`** — the transaction is in `locked` status; surface and stop.
- **`ORGANIZATION_REQUIRED`** (on `weft whoami` / `weft keys`) — the user is on
  an account key (`wk_`) where an organization key is required; the CLI renders
  this in plain language with the `dashboard_url`.

## When to use the hosted MCP instead (the narrow path)

The CLI is the default for any host with a shell. Use the hosted Weft MCP server
**only** when the agent runs in a host that cannot run a CLI — most importantly
**ChatGPT** (and other non-Anthropic web harnesses), which connect to remote MCP
servers over OAuth rather than running local binaries.

- **In Claude Code** (CLI also available — prefer the CLI; MCP only if you
  specifically need the governed remote surface):

  ```sh
  claude mcp add weft --remote https://weft.network/mcp
  ```

- **In ChatGPT** (no shell — MCP is the only option): enable Developer Mode
  (Plus/Pro/Team/Enterprise/Edu), then Settings → Connectors → Add custom
  connector, paste `https://weft.network/mcp`, and complete the OAuth flow.
  ChatGPT supports only remote (HTTPS) MCP servers, not local stdio.

Over MCP the capabilities are the same three tools — `weft_balance`,
`weft_search`, `weft_fetch` — with identical semantics and error shapes to the
CLI commands above (`directives/agent-developer-experience.md` no-drift rule).
The `weft_fetch(url, max_cost_usd)` ceiling rule is identical to `--max-cost-usd`.
