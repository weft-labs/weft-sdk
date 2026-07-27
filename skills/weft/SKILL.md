---
name: weft
description: Use the Weft Account wallet to search the agent web and pay any x402 endpoint from Claude. Trigger when the user asks to find paid APIs, agents, or data resources, or asks to retrieve/buy from a URL that may require payment. Reads balance, runs paid searches, and fetches x402-protected resources via the hosted Weft MCP server.
---

# Weft

Weft Account is a self-custodial wallet for paying x402-protected endpoints from inside an agent host. The three tools — `weft_balance`, `weft_search`, `weft_fetch` — let you check funds, find paid resources, and buy from them within the user's spending policy.

## Setup

If `weft_*` tools are not available, add the Weft MCP server:

```sh
claude mcp add --transport http weft https://weft.network/mcp
```

Then open Claude Code — on first tool use it redirects you to Weft to sign in
once. Nothing to paste; the grant shows up under Connections and is revocable.

The server URL is a **positional** argument. `claude mcp add` has no `--url`
flag and no `--remote` flag — check `claude mcp add --help` before rewriting
this command.

Editing `~/.claude/mcp.json` by hand instead, the server is declared with
`type`, not `transport` (Claude Code ignores a `transport` key entirely):

```json
{ "mcpServers": { "weft": { "type": "http", "url": "https://weft.network/mcp" } } }
```

## Usage

- Use `weft_balance` before suggesting any paid action; abort if `balance.wallet_usdc < expected_cost`.
- Use `weft_search` to discover paid resources. Free for authenticated buyers in v1.
- Use `weft_fetch(url, max_cost_usd)` to retrieve a paid resource. Always set `max_cost_usd` to a tight ceiling — never omit it. If the returned cost is suspicious (very new merchant, no settlement history), flag to the user before re-using.

## Errors

If a tool returns an error with code `POLICY_VIOLATION_*`, the user has exceeded their spending policy. Surface the `dashboard_url` so they can adjust. Don't retry silently.

If a tool returns `SETTLEMENT_FAILED`, the user's transaction is in `locked` status — surface and stop.
