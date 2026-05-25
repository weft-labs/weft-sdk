# weft-sdk

## Purpose

Polyglot client SDK monorepo for Weft Labs, consumed by external developers and by Weft's own docs/release automation.

## Stack

- **Contract source:** OpenAPI 3.x at `spec/openapi.yaml`, synced from `weft-app/docs/openapi.yaml`.
- **Code generation:** OpenAPI Generator through Docker via `scripts/generate-*.sh`; generated clients are committed.
- **TypeScript:** Node >=18, TypeScript 5, tsup dual CJS/ESM output, Vitest, ESLint, Prettier.
- **Python:** Python >=3.10, Hatchling, httpx, pytest, Ruff, strict mypy.
- **Ruby:** Ruby 3.2 in CI, Bundler, Minitest, RubyGems packaging.
- **Go:** Go 1.23 module at `github.com/weft-labs/weft-sdk/go`.

## Fresh Agent Bootstrap

From the `weft-dev` workspace root, create isolated work with OpenCode:

```sh
worktree_create(repo="weft-sdk", branch="docs/harness-self-sufficient", baseBranch="main")
```

Shell fallback when the OpenCode tool is unavailable:

```sh
bin/worktree-create --repo weft-sdk docs/harness-self-sufficient
```

Prerequisites for full local parity:

- Docker running, so OpenAPI Generator image `openapitools/openapi-generator-cli:v7.19.0` can run.
- Node/npm; package requires Node >=18, CI currently uses Node 20 for PR checks.
- Python/pip; package requires Python >=3.10, CI currently uses Python 3.11.
- Ruby/Bundler; gem requires Ruby >=3.2.0, CI currently uses Ruby 3.2.
- Go 1.23.

## Commands

```sh
scripts/generate-all.sh                         # Regenerate all language SDKs from spec/openapi.yaml
scripts/generate-typescript.sh                  # Regenerate TypeScript only
scripts/generate-python.sh                      # Regenerate Python only
scripts/generate-ruby.sh                        # Regenerate Ruby only
scripts/generate-go.sh                          # Regenerate Go only
scripts/test-sdk.sh                             # Smoke check: generated output directories exist
cd typescript && npm install && npm run build   # TypeScript build
cd typescript && npm test                       # TypeScript tests
cd typescript && npm run lint:check             # TypeScript lint
cd typescript && npm run format:check           # TypeScript formatting check
cd python && pip install -e . pytest pytest-asyncio ruff mypy && pytest
cd python && ruff check . && mypy src           # Python lint + typecheck
cd ruby && bundle install && bundle exec rake test
cd go && go test ./...                          # Go tests
```

CI-parity checklist for PRs that touch SDK code, spec, or generation scripts:

| Area | Local check matching CI |
|---|---|
| Generated outputs | `scripts/generate-all.sh` then inspect `git diff` |
| TypeScript | `cd typescript && npm install && npm run lint:check && npm test && npm run build` |
| Python | `cd python && pip install -e . pytest pytest-asyncio ruff mypy && ruff check . && mypy src && pytest` |
| Ruby | `cd ruby && bundle install && bundle exec rake test` |
| Go | `cd go && go test ./...` |

`scripts/test-sdk.sh` is not a full test suite. It only verifies that generated output directories exist and is used as a generation smoke check.

If pre-commit / pre-push hooks exist, they run automatically; agents should not skip them with `--no-verify`.

## Repo-Specific Constraints

- All four SDKs share one version tied to the OpenAPI spec version; use `scripts/bump-version.sh` instead of editing package versions by hand.
- Never hand-edit generated clients under `typescript/src/generated/`, `python/src/weft_sdk/generated/`, `ruby/lib/weft/generated/`, or `go/generated/`; update `spec/openapi.yaml` and rerun generation.
- Generated clients and generated docs are committed. Treat generator output as disposable/reproducible; review diffs, but make source changes in the spec, wrappers, scripts, or config.
- `spec/openapi.yaml` is copied from `weft-app`; repo-local API contract changes should be treated as drift unless paired with the app-side canonical spec.
- Go currently has a nested generated module at `go/generated/go.mod`. `go test ./...` from `go/` does not recurse into that nested module; if the generator layout changes, revisit this caveat and the Go CI expectations.
- The release pipeline is candidate-led: `.release-candidates/weft-app-<sha>.json` markers must go green before release dispatch can publish packages.
- Workflow pushes that must trigger follow-on CI need bot-token auth, not the default `GITHUB_TOKEN` recursion guard.

## PR Rules

- Branch from `main`. Open PRs against `main`.
- Required checks must pass before merge.
- Patrick is the sole reviewer; do not self-merge.

## Where to Look Next

- **Repo-internal context:** `docs/` (architecture, specs, decisions, runbooks, eval, research)
- **Cross-repo context (when checked out as part of `weft-dev`):** `../cto-os/` (workspace state, plans, cross-repo directives, contracts)
- **Single-repo checkout:** this file plus `docs/` is the full picture; cross-repo context is unavailable, so scope work to what this repo owns.

## Related

- `docs/README.md` — map of this repo's docs folder
- `README.md` — package layout, versioning, spec sync, and release-candidate overview
- `../cto-os/repos/weft-sdk.md` — cross-repo brief when the full workspace is checked out
