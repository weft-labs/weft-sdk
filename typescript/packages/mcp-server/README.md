# @weft-labs/mcp-server

Hosted (or self-hostable) Model Context Protocol server that exposes the
Weft Account tools — `weft.balance`, `weft.search`, `weft.fetch` — to any
MCP-capable host (Claude Code, Claude.ai, Cursor, ...).

The default deployment lives at **`https://mcp.weft.network`**. You can also
run it yourself; it's a stateless Node service.

## Status

v0.1 — Weft Account v1, spec 12. The MCP server is a stateless relay:

```
MCP host ─► mcp-server ─► weft-app /api/v1/{balance,search,fetch}
```

`mcp-server` never holds keys, never persists state, never sees response
bodies after relaying them. All authentication is forwarded to weft-app.

## Connect (Claude Code)

```sh
claude mcp add weft --remote https://mcp.weft.network
```

Claude Code performs the MCP OAuth flow: it discovers the auth server via
`/.well-known/oauth-protected-resource`, opens a browser tab on weftlabs.com,
the user approves, and the resulting access token is bound to the MCP
session.

For a local dev loop:

```sh
WEFT_APP_URL=http://localhost:3000 pnpm -F @weft-labs/mcp-server start
claude mcp add weft --remote http://localhost:9876
```

## Tools

| Tool          | Description                                                                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `weft.balance` | Get the current Weft Account balance, promo credit, spending policy, and spent-today/week totals.                                                                          |
| `weft.search`  | Search the Weft index for paid x402 resources. Free for authenticated buyers in v1; billing is added in a later release.                                                   |
| `weft.fetch`   | Fetch a URL, paying any x402 challenge it returns from the user's Weft wallet (within their spending policy). Returns the response body, payment receipt, and merchant reputation. |

## Transports

Both transports defined by the current MCP spec are served on the same port:

| Transport       | Endpoint(s)                          | Notes                                  |
| --------------- | ------------------------------------ | -------------------------------------- |
| Streamable HTTP | `POST /mcp`, `GET /mcp`              | Preferred. Stateless, scales serverless. |
| SSE (legacy)    | `GET /sse`, `POST /messages?sessionId=…` | For older Claude.ai / Cursor builds.   |

Plus:

| Endpoint                                  | Purpose                                              |
| ----------------------------------------- | ---------------------------------------------------- |
| `GET /.well-known/oauth-protected-resource` | RFC 9728 — points hosts at weft-app's auth server.   |
| `GET /healthz`                            | Liveness probe; returns version + live SSE session count. |

## Authentication

Two formats are accepted, both passed in the `Authorization` header on the
MCP client side:

- **OAuth bearer token** issued by weft-app's auth server (spec 09). The MCP
  host obtains this via the standard OAuth code flow it discovers at
  `/.well-known/oauth-protected-resource`.
- **API key** (`wk_live_…` / `wk_test_…`, spec 08). Use the `Bearer` scheme:
  `Authorization: Bearer wk_live_…`. The bare key (no scheme) and `ApiKey
  …` are also accepted and normalized.

The MCP server forwards whatever it receives to weft-app verbatim. weft-app
is the single authority for resolving tokens to users.

## Environment

| Variable               | Required | Default                          | Meaning                              |
| ---------------------- | -------- | -------------------------------- | ------------------------------------ |
| `WEFT_APP_URL`         | yes      | —                                | Origin of weft-app                   |
| `MCP_PUBLIC_URL`       | no       | `http://localhost:<PORT>`        | Public origin of this MCP server     |
| `MCP_AUTH_SERVER_URL`  | no       | `WEFT_APP_URL`                   | OAuth authorization server origin    |
| `PORT`                 | no       | `9876`                           | Bind port                            |

## Programmatic use

```ts
import { createServer, createHttpHandler } from "@weft-labs/mcp-server";
import { createServer as createNodeHttpServer } from "node:http";

// Embed in your own HTTP server:
const handler = createHttpHandler({
  weftAppUrl: "https://app.weftlabs.com",
  publicUrl: "https://mcp.your-domain.example",
});
createNodeHttpServer(handler).listen(9876);

// Or build a configured MCP server and attach your own transport (stdio,
// in-memory, custom):
const server = createServer({
  weftAppUrl: "https://app.weftlabs.com",
  publicUrl: "https://mcp.your-domain.example",
});
```

## Development

```sh
pnpm install
pnpm -F @weft-labs/mcp-server typecheck
pnpm -F @weft-labs/mcp-server test
pnpm -F @weft-labs/mcp-server build
```

## Logging & privacy

`mcp-server` logs one JSON object per line to stdout. We **never** log:

- request bodies (search queries, fetched artifact bodies)
- URL query strings
- full bearer tokens

We log:

- tool name, latency, HTTP status returned by weft-app
- a stable 8-hex-char SHA-256 prefix of the token (`sha256:abcdef12`) so
  operators can correlate sessions without holding credentials

## Deployment

See [`ops/mcp-server.deploy.md`](../../../ops/mcp-server.deploy.md) for Vercel
and Fly.io notes.

## License

Apache-2.0
