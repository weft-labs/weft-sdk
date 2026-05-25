# weft-sdk

## Purpose

Polyglot client SDK monorepo for Weft Labs, consumed by external developers and by Weft's own docs/release automation.

## Stack

- **Contract source:** OpenAPI 3.x at `spec/openapi.yaml`, synced from `weft-app/docs/openapi.yaml`.
- **Code generation:** OpenAPI Generator through `scripts/generate-*.sh`; generated clients are committed.
- **TypeScript:** Node >=18, TypeScript 5, tsup dual CJS/ESM output, Vitest, ESLint, Prettier.
- **Python:** Python >=3.10, Hatchling, httpx, pytest, Ruff, strict mypy.
- **Ruby:** Ruby 3.2 in CI, Bundler, Minitest, RubyGems packaging.
- **Go:** Go 1.23 module at `github.com/weft-labs/weft-sdk/go`.

## Commands

```sh
scripts/generate-all.sh                         # Regenerate all language SDKs from spec/openapi.yaml
scripts/test-sdk.sh                             # Verify generated SDK outputs exist
cd typescript && npm install && npm test        # TypeScript tests
cd typescript && npm run lint:check             # TypeScript lint
cd typescript && npm run format:check           # TypeScript formatting check
cd python && pip install -e . pytest pytest-asyncio ruff mypy && pytest
cd python && ruff check . && mypy src           # Python lint + typecheck
cd ruby && bundle install && bundle exec rake test
cd go && go test ./...                          # Go tests
```

If pre-commit / pre-push hooks exist, they run automatically; agents should not skip them with `--no-verify`.

## Repo-Specific Constraints

- All four SDKs share one version tied to the OpenAPI spec version; use `scripts/bump-version.sh` instead of editing package versions by hand.
- Never hand-edit generated clients under `typescript/src/generated/`, `python/src/weft_sdk/generated/`, `ruby/lib/weft/generated/`, or `go/generated/`; update `spec/openapi.yaml` and rerun generation.
- `spec/openapi.yaml` is copied from `weft-app`; repo-local API contract changes should be treated as drift unless paired with the app-side canonical spec.
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
