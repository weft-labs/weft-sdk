---
id: 06-committee-response-validation
status: proposed
depends-on: []
---

# Spec 06 — Wire `Committee::Middleware::ResponseValidation` in test env

**Parent plan:** `plans/active/2026-04-sdk-pipeline-production-readiness.md`
**Supersedes:** `specs/sdk-pipeline/04-contract-drift-test.md` (Check 1 only; Check 2 dropped, Check 3 replaced by `weft-sdk/scripts/generate-all.sh` assert)
**Source:** `meetings/2026-05-03-sdk-pipeline-spec-03-04-conclusion.md`

## Goal

Make runtime ↔ canonical-spec drift fail in CI on the next push that introduces it, instead of being caught downstream when a candidate PR's generated SDK silently mismatches what staging actually returns.

The post-pivot audit (PRs #266/#267/#269/#270/#271) shipped five contract changes that were invisible to CI for months. The candidate-led pipeline catches the SDK side of that drift now; this spec catches the server side.

## Non-goals

- Validating *requests* against the spec (we control client and server; request validation is noise).
- Testing every payload field-for-field against fixtures (too brittle).
- Consumer-driven contract tests (Pact) — overkill for our 4-client SDK and one in-house consumer.
- Production runtime validation (test-time only).

## Files to touch

- `weft-app/Gemfile` — `committee` is already present (`Gemfile:76`); no change unless we add `committee-rails` for ergonomic Rails integration.
- `weft-app/test/test_helper.rb` — wire `Committee::Middleware::ResponseValidation` into the test stack with `schema_path: Rails.root.join("docs/openapi.yaml")`.
- `weft-app/test/api/openapi/committee_test.rb` — extend or split: today it only checks the spec parses (`committee_test.rb:7-14`); we want a request-spec smoke that hits each `/api/v1/*` endpoint and lets the middleware enforce.

## Contracts in / out

**In:** working `docs/openapi.yaml` that already passes `Committee::Drivers::OpenAPI3::Driver.new.parse`.

**Out:** every `/api/v1/*` request in the test suite asserts against the spec. Failing path + JSON pointer printed in CI.

## Acceptance command

```bash
cd weft-app
bin/rails test test/api/openapi/committee_test.rb
bin/rails test test/controllers/api/v1/   # full request-spec suite, with middleware active
```

## Verification query

- A deliberate drift on a branch (rename a serializer field on one `/api/v1/*` endpoint without updating `docs/openapi.yaml`) makes the test suite go red, with the failing path and pointer surfaced in stdout.
- Re-running on `main` after fixing the drift makes the suite green again.

## Implementation order

1. **Audit endpoint coverage.** List `/api/v1/*` routes (`bin/rails routes -E api/v1`) and cross-reference against existing request specs in `test/controllers/api/v1/`. Output a coverage table showing which endpoints are exercised and which are not. Endpoints with zero request specs are middleware-invisible — file them as a sub-task to add specs before turning the middleware on.
2. **Wire middleware** in `test_helper.rb` (test env only) configured against `docs/openapi.yaml`.
3. **Run full suite.** Expect drift to surface — most likely in serializers added during the org pivot. Fix each one in the same PR (small, mechanical).
4. **Document** the loop in `reference/architecture/sdk-pipeline-architecture.md` under the "Why This Pattern" responsibilities table.

## Open questions

- Use `committee-rails` (gem) or wire `Committee::Middleware::ResponseValidation` directly into Rack stack? `committee-rails` is the lighter touch; check Rails 8 / Ruby 3.3 compatibility before committing.
- Where does the middleware go in the stack? In test env it should run *after* the response is generated but *before* the test reads `response.body`. Verify with a deliberately broken endpoint.
- Do we want `:strict` mode (fail on unknown response codes) or `:warn` mode initially? Recommend `:warn` for the first PR so we surface scope without blocking, then flip to `:strict` once drift is closed.
