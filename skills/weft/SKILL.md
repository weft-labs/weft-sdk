---
name: weft
description: Use the Weft Account wallet to search the agent web and pay any x402 endpoint from Claude. Trigger when the user asks to find paid APIs, agents, or data resources, or asks to retrieve/buy from a URL that may require payment. Reads balance, runs paid searches, and fetches x402-protected resources via the hosted Weft MCP server.
---

# Weft

Weft Account is a self-custodial wallet for paying x402-protected endpoints from inside an agent host. The three tools — `weft.balance`, `weft.search`, `weft.fetch` — let you check funds, find paid resources, and buy from them within the user's spending policy.

## Setup

If `weft.*` tools are not available, run:

```sh
bash <(curl -sSL https://weftlabs.com/skill/install.sh)
```

This installs the Weft MCP server (`https://mcp.weft.network`) into Claude Code and walks the user through the browser OAuth flow.

## Usage

- Use `weft.balance` before suggesting any paid action; abort if `balance.wallet_usdc < expected_cost` and `balance.promo_usd < expected_cost`.
- Use `weft.search` to discover paid resources. The first 10 calls per account are free (promo balance).
- Use `weft.fetch(url, max_cost_usd)` to retrieve a paid resource. Always set `max_cost_usd` to a tight ceiling — never omit it. If the returned cost is suspicious (very new merchant, no settlement history), flag to the user before re-using.

## Errors

If a tool returns an error with code `POLICY_VIOLATION_*`, the user has exceeded their spending policy. Surface the `dashboard_url` so they can adjust. Don't retry silently.

If a tool returns `SETTLEMENT_FAILED`, the user's transaction is in `locked` status — surface and stop.
