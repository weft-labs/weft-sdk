# Spec 01 — Canonical OpenAPI Spec Alignment

**Status:** Proposed
**Owner:** unassigned
**Parent plan:** `plans/active/2026-04-sdk-pipeline-complete.md`

## Problem

`weft-app/docs/openapi.yaml` is the canonical spec for every SDK. It is currently stale:

- Missing `POST /api/v1/resources/enroll` (landed in PR-A #270).
- Missing / incomplete `/apis/:slug` public endpoints (PR-B #271).
- `Agent.category` declared as required non-null string enum; runtime emits integer or `nil`. Copilot flagged this in the PR-B review and it remains unresolved.
- Version still `0.3.0`, but the published SDK of the same version was generated from this stale doc.

Until the spec is truthful, fixing the sync, loop-back, and drift test downstream just propagates the lie.

## Goals

- Single canonical `docs/openapi.yaml` that matches runtime for every currently-shipping endpoint.
- `Agent.category` contract resolved and stable (pick one representation end-to-end).
- Version bumped to `0.4.0` to signal a breaking contract shift.
- Schema-lock fixture regenerated and in CI.

## Non-goals

- Adding endpoints that aren't yet implemented in `weft-app`.
- Redesigning the serializer layer.
- Publishing SDK 0.4.0 (that's downstream of this spec landing).

## Design

### Endpoints to add

Source of truth: `weft-app/app/controllers/api/v1/` + `weft-app/app/controllers/apis/` + current route table (`bin/rails routes`).

New paths to document:

- `POST /api/v1/resources/enroll` — request/response shapes per `Api::V1::ResourcesController#enroll` and `ResourceBlueprint`. Include 401/403/422 error envelope.
- `GET /apis/:slug` — public endpoint; response shape via `Serializers::OpenApi.call(resource)`. Document the OAS response it returns (meta-y).
- Audit every `Api::V1::*` controller action against `openapi.yaml` paths and add anything missing.

### Agent.category fix

Decision required (pick one; document rationale in an ADR under `decisions/`):

- **Option A:** string enum (e.g. `"web_service" | "data_source" | ...`), nullable: false. Update runtime serializer to emit string, add a `before_save` normalizer if needed.
- **Option B:** string enum, nullable: true. Same as A but allow null during migration.
- **Option C:** integer enum. Update spec, keep runtime, update SDK models.

**Recommendation:** Option B short-term (unblock SDKs immediately), A long-term (drop null after backfill migration). Add an ADR `decisions/2026-04-agent-category-contract.md` explaining the choice.

### Version + schema-lock

- Bump `info.version` in `openapi.yaml` to `0.4.0`.
- Regenerate `test/fixtures/openapi_schema_lock.yaml` (or whatever the lock artifact is called in PR-B) and commit.
- The schema-lock test must pass against current runtime serializers.

### Contract test for category

Add a request spec in `weft-app` that asserts `GET /api/v1/agents/:id` response `category` field matches the spec representation for a representative fixture in each enum state.

## Implementation outline

1. Diff canonical spec vs. `bin/rails routes | grep api` + the controllers → list of missing paths.
2. For each missing path, copy the schema from its `Blueprint` / serializer; add request/response/4xx.
3. Decide category representation; open ADR PR first, get Patrick's sign-off, then land the fix.
4. Update spec version + schema-lock fixture.
5. Run `bin/rails test` + OpenAPI schema validator (`redocly lint` or `spectral`) in CI.

## Verification

- `bin/rails test test/fixtures/openapi_schema_lock_test.rb` green.
- `npx @redocly/cli lint docs/openapi.yaml` zero errors.
- Manual: `curl` each new endpoint on staging; response matches the schema.
- PR includes the ADR link for the category decision.

## Open questions

- Is there any consumer currently relying on integer category? (Check `weft-app/app/javascript/` + `weft-sdk/*/examples/`.)
- Do we publish `/apis/:slug` in the canonical spec, or is it meta-OAS (not appropriate to describe in the parent OAS)?
