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

## Local Harness

When working inside the `weft-dev` workspace, create an isolated worktree from
the workspace root:

```sh
worktree_create(repo="weft-sdk", branch="docs/harness-self-sufficient", baseBranch="main")
```

If the OpenCode worktree tool is unavailable, use the shell fallback from the
workspace root:

```sh
bin/worktree-create --repo weft-sdk docs/harness-self-sufficient
```

Prerequisites for regeneration and CI-parity checks are Docker, Node/npm,
Python/pip, Ruby/Bundler, and Go. Version constraints live in repo files:
Node >=18, Python >=3.10, Ruby >=3.2.0, and Go 1.23. CI currently runs Node 20,
Python 3.11, Ruby 3.2, and Go 1.23.

Regenerate clients from `spec/openapi.yaml` with `scripts/generate-all.sh`, or
use `scripts/generate-{typescript,python,ruby,go}.sh` for one language. The
generator runs via Docker image `openapitools/openapi-generator-cli:v7.19.0`.
Generated code and generated docs are committed; do not hand-edit generated
paths. Change the OpenAPI spec, wrappers, scripts, or config, regenerate, then
review the diff.

`scripts/test-sdk.sh` is only a generated-output smoke check. It verifies that
generated output directories exist; it does not run language test suites.

CI-parity checks:

| Area | Local command |
|---|---|
| TypeScript | `cd typescript && npm install && npm run lint:check && npm test && npm run build` |
| Python | `cd python && pip install -e . pytest pytest-asyncio ruff mypy && ruff check . && mypy src && pytest` |
| Ruby | `cd ruby && bundle install && bundle exec rake test` |
| Go | `cd go && go test ./...` |

Go caveat: `go/generated/` currently contains its own `go.mod`, so it is a
nested generated module. `go test ./...` from `go/` matches current CI behavior
and does not recurse into the nested module.

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

SDK releases are gated by `.release-candidates/weft-app-<sha>.json` markers. A
candidate is generated from one immutable `weft-app` SHA and OpenAPI SHA-256,
then marked `green` only after staging reports the same app SHA, the generated
TypeScript client can fetch the matching OpenAPI document from staging, and an
authenticated generated endpoint reaches staging with the expected 401 response.
The release workflow refuses to publish unless the `weft-app` release dispatch
points at a matching green candidate.
