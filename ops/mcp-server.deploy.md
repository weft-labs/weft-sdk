# `@weft-labs/mcp-server` — deployment notes

Target host: `mcp.weft.network`.

The MCP server is stateless. Any Node-friendly host works. Two we've sized:

## Option A — Vercel (recommended if SSE works at scale)

Pros:
- Already used for `weft-website`; one console to operate.
- Trivial preview deploys per PR.
- Built-in TLS, custom domain, env vars.

Cons:
- SSE streams hold a connection open. Vercel's default Node serverless
  function has a runtime cap (≈10–15 min on Pro, 30 s on Hobby) that **will**
  kill long SSE sessions. Use Vercel **Fluid Compute** / "long-running"
  function mode, or switch to the Streamable HTTP transport only.
- Cold starts add ~200–500 ms to the first tool call after idle.

Setup sketch:
1. Add the package to `vercel.json` with a custom build that emits a single
   handler entry: `dist/cli.js` wrapped in an HTTP function adapter.
2. Set env vars: `WEFT_APP_URL`, `MCP_PUBLIC_URL=https://mcp.weft.network`,
   `MCP_ALLOWED_HOSTS=mcp.weft.network` (DNS-rebinding allowlist; required in
   production), optionally `MCP_AUTH_SERVER_URL`.
3. Point `mcp.weft.network` (DNS via Cloudflare → Vercel) at the project.

## Option B — Fly.io (recommended if we want long-lived SSE)

Pros:
- Real long-lived TCP. SSE sessions are stable until process restart.
- Cheap (~$2/mo for the smallest VM). Multi-region routing built in.

Cons:
- Separate deploy surface from the rest of weft-app.
- Requires a `fly.toml` and Dockerfile.

Setup sketch:
1. `Dockerfile` (~10 lines): `node:22-alpine` → `pnpm install --frozen-lockfile
   --filter @weft-labs/mcp-server` → `node dist/cli.js`.
2. `fly.toml`: `internal_port = 9876`, `[[services.http_checks]] path = "/healthz"`,
   `auto_stop_machines = false` (we want SSE to stay up).
3. Set secrets via `fly secrets set WEFT_APP_URL=… MCP_PUBLIC_URL=https://mcp.weft.network MCP_ALLOWED_HOSTS=mcp.weft.network`.
   In production all three must be set or the server refuses to start.

## Open question for Patrick

Pick A or B. Suggestion: start on **Fly** to avoid SSE timeout footguns, move
to Vercel later if Streamable HTTP wins out and SSE is no longer needed.

## CI

`weft-sdk/.github/workflows/typescript-ci.yml` (or a new
`mcp-server-deploy.yml`) should:

1. On push to `main` touching `typescript/packages/mcp-server/**`, run
   `pnpm -F @weft-labs/mcp-server build test typecheck`.
2. On tagged release, publish to npm (`npm publish` with the package's
   existing `publishConfig.access = public`).
3. On `main` deploy step: either `vercel --prod` or `flyctl deploy`, gated
   on the build + tests passing.

## CORS

**v1 has no CORS middleware. This is deliberate.**

Callers in v1:

- **Claude Code** — native MCP host (Node process), not a browser. No CORS
  involved.
- **Claude.ai remote MCP** — Anthropic-side server-to-server fetch against
  `mcp.weft.network`. No browser origin, no preflight.

Neither caller produces a cross-origin browser request, so an `Access-Control-Allow-Origin`
header is unnecessary. Adding `*` would be actively wrong: it would expose the
MCP server to drive-by browser JS exfiltrating tokens, and would also defeat
the DNS-rebinding `Host` allowlist we configure via `MCP_ALLOWED_HOSTS`.

**v1.5 plan.** When Claude.ai (or a future Weft browser surface) starts
calling the MCP server directly from the browser, we will add an
`MCP_ALLOWED_ORIGINS` env var, a small CORS middleware that echoes the
allowed origin and only emits `Access-Control-Allow-Credentials: false` on
the preflight, and a test that a disallowed origin is rejected. Until that
day arrives, the absence of CORS is the correct configuration.

## Smoke after deploy

```sh
curl -s https://mcp.weft.network/healthz | jq
curl -s https://mcp.weft.network/.well-known/oauth-protected-resource | jq

# From any MCP-capable host (Claude Code):
claude mcp add weft --remote https://mcp.weft.network
claude
> Use weft.balance to check my Weft balance.
```

## Rollback

The MCP server is stateless. Roll back to the previous tag (Vercel "promote
a previous deployment" or `flyctl releases rollback`). No data migration; no
client-side cleanup.
