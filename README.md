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
- `.github/workflows/` — per-language CI + spec sync workflow

## Versioning

All language SDKs share a version tied to the OpenAPI spec version.
Format: `{spec_major}.{spec_minor}.{patch}`.

## Spec Sync

The `sync-spec.yml` workflow listens for `repository_dispatch` events from
`weft-app`, updates `spec/openapi.yaml`, regenerates clients, and opens a PR if
changes are detected.
