# Weft SDK

Unified SDK monorepo for Weft Labs. This repo ships four language SDKs that
combine the Weft API client (generated from OpenAPI) and the x402 Facilitator
client (hand-crafted wrappers).

## Layout

- `spec/openapi.yaml` — synced from `weft-app/docs/openapi.yaml`
- `typescript/` — npm package `@weft-labs/sdk`
- `python/` — PyPI package `weft-sdk`
- `ruby/` — RubyGems package `weft-sdk`
- `go/` — Go module `github.com/weft-labs/weft-sdk/go`
- `skills/weft/` — Weft Skill (`SKILL.md` + install script) for Claude Code; installs the hosted Weft MCP server at `https://weft.network/mcp`. See `skills/weft/SKILL.md`.
- `.github/workflows/` — per-language CI + spec sync workflow

## Versioning

All language SDKs share a version tied to the OpenAPI spec version.
Format: `{spec_major}.{spec_minor}.{patch}`.

## Spec Sync

The `sync-spec.yml` workflow listens for `repository_dispatch` events from
`weft-app`, updates `spec/openapi.yaml`, regenerates clients, and opens a PR if
changes are detected. Candidate branches are pushed with the shared GitHub App
token, not the default `GITHUB_TOKEN`, so normal PR CI can run on bot-authored
branches.

## Release Candidates

Each `weft-app-openapi-updated` dispatch opens an auto-PR on a deterministic
`sdk-candidate/weft-app-<short_sha>` branch. The PR's required checks are the
release gate:

- Per-language build/test jobs (`typescript.yml` / `python.yml` / `ruby.yml` / `go.yml`).
- The staging e2e job (`e2e.yml`), which builds the regenerated TypeScript SDK
  from the PR head and exercises it against `https://staging.weft.network`:
  fetches `/up/openapi` and asserts the SHA-256 matches the PR's spec, then
  hits an authenticated endpoint and asserts a 401.

The auto-PR is opened with `gh pr merge --auto --squash`, so it lands on `main`
the moment all required checks pass. No `.release-candidates/` JSON marker is
written or read anywhere in the pipeline — the PR's check status IS the gate.
