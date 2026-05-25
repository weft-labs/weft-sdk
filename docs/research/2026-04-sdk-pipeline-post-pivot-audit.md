# SDK Pipeline Post-Pivot Audit

**Date:** 2026-04-22
**Status:** Findings written
**Source plan:** `plans/active/2026-04-sdk-pipeline-post-pivot-audit.md`

## Executive Summary

- **Published SDKs are stale.** npm, PyPI, RubyGems, and Go are all still on `0.2.1`, which predates the provider/resource pivot.
- **No post-pivot SDK release happened.** `weft-app` has no post-pivot `CD: Release` runs and no release tag beyond `v0.0.1`; `weft-sdk` has no `Release` runs at all.
- **No post-pivot spec-sync dispatch was expected to fire** from the current trigger path, because PR1 / PR3 / PR4 / PR-A / PR-B did **not** modify `weft-app/docs/openapi.yaml`, which is the only file watched by `CD: OpenAPI Dispatch`.
- **The sync path is independently broken.** The lone historical `Sync OpenAPI Spec` run in `weft-sdk` (`22710049246`, 2026-03-05) failed because it tried to `curl` a raw GitHub URL from the private `weft-app` repo without auth. Repro now returns `404: Not Found`.
- **The canonical spec is drifting from the runtime API.** `weft-app` main now exposes new pivoted/runtime surfaces, but the static `docs/openapi.yaml` and `weft-sdk/spec/openapi.yaml` still describe the older contract and do not include `/api/v1/resources/enroll` or `/apis/:slug`.
- **The TypeScript `category` concern is real and worse than originally framed.** The TS SDK requires a non-null string enum, while current app code can emit an integer or `nil` for `category`.

## Stage Summary

| Stage | Expected | Observed | Verdict |
|---|---|---|---|
| 1. Spec-change dispatch (`weft-app`) | Spec-touching pivot merges fire `CD: OpenAPI Dispatch` | Pivot PRs did not touch `docs/openapi.yaml`; current workflow record shows 0 runs | **Did not fire post-pivot** |
| 2. Sync PR creation (`weft-sdk`) | Dispatch creates sync run + PR | Exactly 1 historical run, 0 sync PRs; run failed fetching private raw URL | **Broken** |
| 3. Release dispatch (`weft-app` -> `weft-sdk`) | Post-pivot `v*` tag dispatches `Release` | No post-pivot `weft-app` release runs, no new tags, no `weft-sdk` release runs | **Never attempted** |
| 4. Published artifacts | New packages after pivot | npm/PyPI/RubyGems/Go all still `0.2.1` | **Stale** |

## Findings

### 1. The current sync trigger watches the wrong file for the pivot work

`weft-app/.github/workflows/cd_openapi-dispatch.yml` triggers only on pushes to `main` that touch:

```yaml
paths:
  - "docs/openapi.yaml"
```

Evidence:

- `weft-app/docs/openapi.yaml` last changed in commit `53a1004e` (`feat: Phase 3 API — analytics, agent CRUD, webhook endpoints, pagination (#136)`).
- `git log --since=2026-04-15 -- docs/openapi.yaml` returned no commits.
- PR file lists for the pivot sequence (`#266`, `#267`, `#269`, `#270`, `#271`) do not include `docs/openapi.yaml`.

Conclusion:

- The provider/resource pivot did not touch the only watched file, so the current dispatch path had no reason to fire.
- This is not just a transient workflow failure. The trigger is pointed at a static spec file that was not kept current with the pivot work.

### 2. The spec-sync path is broken even when dispatch happens

`weft-sdk` has exactly one recorded `Sync OpenAPI Spec` run:

- Run `22710049246`
- Created `2026-03-05T08:55:04Z`
- Event `repository_dispatch`
- Display title `weft-app-openapi-updated`
- Conclusion `failure`

The failing step in `weft-sdk/.github/workflows/sync-spec.yml` is:

```sh
curl -sSL "$OPENAPI_URL" -o spec/openapi.yaml
```

The dispatch payload pointed at:

```text
https://raw.githubusercontent.com/weft-labs/weft-app/53a1004e94f86673bff48e1340cae9f8c8484827/docs/openapi.yaml
```

The workflow log then showed OpenAPI Generator trying to parse a 404 body instead of YAML. Local repro now returns:

```text
404: Not Found
```

Conclusion:

- `weft-sdk` cannot pull a raw file from private `weft-app` anonymously.
- Even if `docs/openapi.yaml` changed tomorrow, the current sync workflow would still fail until the cross-repo fetch is authenticated or replaced.

### 3. No post-pivot release dispatch or SDK publish happened

Evidence:

- `weft-app` current `CD: Release` workflow record returns `0` runs.
- Remote `weft-app` tags show only `v0.0.1`.
- `weft-app` GitHub releases list is empty.
- `weft-sdk` current `Release` workflow record returns `0` runs.
- `weft-sdk` remote tags show only `v0.2.1` and `go/v0.2.1`.
- `weft-sdk` GitHub releases list is empty.

Conclusion:

- No SDK release was attempted after the pivot merges.
- Even a healthy sync pipeline would not have published new artifacts without a new `weft-app` release tag.

### 4. Published artifacts are all still pre-pivot

Registry state:

- npm `@weft-labs/sdk`: latest `0.2.1` (available versions `0.2.0`, `0.2.1`)
- PyPI `weft-sdk`: latest `0.2.1`
- RubyGems `weft-sdk`: latest `0.2.1`
- Go: latest remote tags `v0.2.1` and `go/v0.2.1`

Repository state matches the registries:

- `weft-sdk/spec/openapi.yaml` is still `info.version: 0.2.1`
- Searches in `weft-sdk/spec/openapi.yaml` found **no** `/api/v1/resources/enroll` and **no** `/apis/...` routes
- Generated clients still expose only the older `AgentsApi` surface (`/api/v1/agents`, `/api/v1/agents/{id}`)

Conclusion:

- External SDK consumers have no newer package to upgrade to yet.
- The answer to "what should consumers upgrade to?" is currently: **nothing new exists yet**.

### 5. The static app spec is stale relative to the runtime API

Remote `weft-app` main shows:

- `VERSION` = `0.2.2`
- `docs/openapi.yaml` = `info.version: 0.3.0`

Meanwhile the runtime app on `origin/main` includes new surfaces absent from the static spec:

- `POST /api/v1/resources/enroll`
- `GET /apis/:slug`
- `GET /apis/:slug/openapi.json`

The new per-resource OpenAPI document is generated dynamically by:

- `app/serializers/serializers/open_api.rb`
- `app/controllers/apis_controller.rb`

But the SDK sync pipeline still consumes only `docs/openapi.yaml`.

Conclusion:

- There is now a source-of-truth problem, not just a workflow problem.
- The static SDK input spec is no longer a reliable mirror of the shipped runtime API.

### 6. `weft-app` still pins the stale SDK, and the current integration is docs-only

`weft-app/package.json` pins:

```json
"@weft-labs/sdk": "^0.2.1"
```

`package-lock.json` resolves that to `@weft-labs/sdk@0.2.1`.

Current uses in `weft-app` are limited to docs/examples:

- `scripts/generate-docs.mjs` reads TS docs from `node_modules/@weft-labs/sdk/docs`
- generated API reference markdown imports `@weft-labs/sdk` examples

I did **not** find application runtime code using the SDK for live API calls.

Conclusion:

- The stale SDK is currently a docs/package concern inside `weft-app`, not a runtime app dependency risk.
- The docs surface is still stale, though, because it is built from stale SDK artifacts.

### 7. The TypeScript `category` concern is unresolved and is really a contract bug

Current static spec (`weft-app/docs/openapi.yaml`) says:

- `Agent.category` is a required string enum

Current generated TS SDK (`weft-sdk/typescript/src/generated/models/Agent.ts`) says:

- `category: AgentCategoryEnum;`
- required in `instanceOfAgent`

Current app/runtime behavior disagrees in multiple ways:

- `ResourceBlueprint#category` returns `resource.metadata["category"]` for agent resources
- `MigrateAgentsToResources` copied legacy integer `agent.category` values into `metadata["category"]`
- `Api::V1::AgentsController#create` only writes `metadata["category"]` when the request includes a present `category`, so newly created agents can emit `nil`

That means the real response can be:

- integer for migrated agents
- request-shaped value for newly created agents that do send `category`
- `nil` for newly created agents that do not send `category`

Conclusion:

- This is not merely an SDK nullability audit item.
- The underlying app contract, static spec, and generated TS SDK are inconsistent today.

## Answer To The Original Question

### Did the SDK auto-update pipeline fire after the provider/resource pivot?

**No, not in the way the current pipeline expects.**

- The post-pivot merges did not modify `docs/openapi.yaml`, so the current spec-dispatch trigger path did not fire.
- No post-pivot release tag was cut in `weft-app`, so the SDK release path did not fire.
- The one historical spec-sync dispatch path is broken anyway because `weft-sdk` cannot anonymously fetch a raw file from private `weft-app`.

### Are published SDKs current?

**No.** All published SDKs are still `0.2.1` and reflect the pre-pivot contract.

### What should SDK consumers upgrade to?

**Nothing yet.** There is no post-pivot SDK version available today.

## Recommended Next Action

Execute `plans/scoped/2026-04-sdk-pipeline-catch-up.md`.

That follow-up should do four things in order:

1. Align the canonical spec and version story (`VERSION` vs `docs/openapi.yaml` vs runtime API)
2. Repair the cross-repo spec sync transport for the private `weft-app` repo
3. Generate and merge the missing `weft-sdk` sync PR
4. Cut and verify the catch-up SDK release across all registries
