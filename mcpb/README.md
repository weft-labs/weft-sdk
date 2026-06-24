# Weft — Claude Desktop extension (MCP Bundle)

A one-click [MCP Bundle](https://github.com/modelcontextprotocol/mcpb) (`.mcpb`,
formerly `.dxt`) that connects **Claude Desktop** (and any MCPB host) to the
hosted Weft MCP server and signs the user in with OAuth — giving Claude the
`weft_search` / `weft_balance` / `weft_fetch` tools.

## How it works

The Weft MCP server is **remote** (`https://weft.network/mcp`, streamable-HTTP +
OAuth 2.1/PKCE/DCR). The `.mcpb` format only launches **local** servers, so this
bundle ships [`mcp-remote`](https://www.npmjs.com/package/mcp-remote) — a small
stdio↔HTTP bridge — and points it at the hosted endpoint:

```
Claude Desktop ──stdio──> mcp-remote (bundled, local) ──HTTPS+OAuth──> weft.network/mcp
```

`mcp-remote` runs the OAuth browser flow against Weft's existing discovery docs
(RFC 9728 → 8414 → 7591 DCR) on first launch and caches the token. **No wallet
keys or API keys are bundled or entered** — Weft settles payments server-side
within the user's spending policy. The bridge is vendored into the bundle
(`node_modules/`), so installs don't fetch anything at launch.

The only config is the server URL (`user_config.server_url`), defaulted to
production; leave it unless you run your own Weft server.

## Build

`mcp-remote` is vendored at pack time, not committed (see `.gitignore`):

```sh
cd mcpb
npm install                                   # vendor mcp-remote into node_modules/
npx @anthropic-ai/mcpb@latest validate manifest.json
npx @anthropic-ai/mcpb@latest pack . ../weft.mcpb
```

Produces `weft.mcpb` (~1.4 MB). Distribute it via a GitHub release or
`weftlabs.com/connect`.

## Install (end user)

1. Download `weft.mcpb`.
2. Claude Desktop → **Settings → Extensions** → drag in (or double-click) the file → **Install**.
3. On first tool use, a browser opens to sign in to Weft (OAuth); approve, and the tools go live.

> Prefer not to install a bundle? Claude Desktop also accepts the raw endpoint:
> **Settings → Connectors → Add** → `https://weft.network/mcp`. The bundle just
> makes it one click.

## Tools

| Tool | What it does |
|------|--------------|
| `weft_search` | Search the Weft index for paid x402/MPP resources (provider, skills, pricing). |
| `weft_balance` | Read your Weft wallet balance, promo credit, and spending policy. |
| `weft_fetch` | Fetch a URL and pay any x402/MPP challenge from your wallet, within policy. |

Requires a Node ≥18 runtime (Claude Desktop provides one).
