# Spec 04 — Contract Drift Test

**Status:** Superseded 2026-05-03 by `meetings/2026-05-03-sdk-pipeline-spec-03-04-conclusion.md`. The original three-check scope was trimmed:
- **Check 1** (Runtime ↔ Spec via committee) → moved to `specs/sdk-pipeline/06-committee-response-validation.md`.
- **Check 2** (weft-app spec ↔ weft-sdk spec) → dropped. The event-driven pipeline regenerates the spec on every weft-app push; drift cannot accumulate.
- **Check 3** (Spec ↔ Generated SDK) → replaced by a one-line post-condition assert in `weft-sdk/scripts/generate-all.sh` (fail if input spec dirty but no downstream files dirty after generation).

**Owner:** unassigned
**Parent plan (historical):** `plans/done/2026-04-sdk-pipeline-complete.md`

## Problem

The post-pivot audit found that `weft-app` shipped five PRs (#266, #267, #269, #270, #271) that reshaped the API contract **without the canonical spec changing**. No CI check caught it. The schema-lock fixture added in PR-B only protects serializer output against the fixture itself; it does not compare runtime against `docs/openapi.yaml`, and it does not compare either against the SDK's generated models.

Three layers can drift independently:

1. **Runtime serializers** in `weft-app`
2. **Canonical spec** `weft-app/docs/openapi.yaml`
3. **Generated SDK models** `weft-sdk/{ts,python,ruby,go}/`

We need a test that fails when any two disagree.

## Goals

- CI fails when runtime response shape diverges from `docs/openapi.yaml`.
- CI fails when `weft-sdk/spec/openapi.yaml` (what the published SDK was generated from) diverges from `weft-app/docs/openapi.yaml`.
- Failure is actionable: the diff is printed in the CI log; no "investigate why it broke" spelunking.

## Non-goals

- Contract testing every response payload against fixtures (too brittle).
- Consumer-driven contract testing (Pact / similar) — overkill for a 4-client SDK.
- Runtime validation in production (keep it a test-time concern).

## Design

Three separate, cheap checks.

### Check 1 — Runtime ↔ Spec (lives in weft-app)

Tool: `committee-rails` or a lightweight custom Rack middleware in test-only mode.

For every request spec that hits an `/api/v1/*` endpoint, assert the response body matches the OAS schema for that path. Failing path name + JSON pointer is printed.

Setup:

- Add `committee-rails` to `test` group in `Gemfile`.
- Configure `Committee::Middleware::ResponseValidation` with `schema_path: "docs/openapi.yaml"` in `test_helper.rb`.
- Run in existing request spec suite; no new specs required.

### Check 2 — weft-app spec ↔ weft-sdk spec (lives in weft-sdk CI)

Add a scheduled workflow `.github/workflows/spec-drift.yml` (daily + on-push):

```yaml
- uses: actions/create-github-app-token@v1
  id: app-token
  with:
    app-id: ${{ secrets.APP_ID }}
    private-key: ${{ secrets.APP_PRIVATE_KEY }}
    owner: weft-labs
    repositories: weft-app
- name: Fetch canonical
  run: |
    curl -fsSL -H "Authorization: Bearer ${{ steps.app-token.outputs.token }}" \
      -H "Accept: application/vnd.github.v3.raw" \
      -o /tmp/canonical.yaml \
      https://api.github.com/repos/weft-labs/weft-app/contents/docs/openapi.yaml?ref=main
- name: Diff
  run: |
    npx @redocly/cli diff spec/openapi.yaml /tmp/canonical.yaml --format markdown > diff.md
    if [ -s diff.md ]; then
      echo "::error::Spec drift detected"
      cat diff.md
      exit 1
    fi
```

On failure, the drift workflow opens an issue tagged `spec-drift` pointing at the diff and linking to the spec-sync workflow.

### Check 3 — Spec ↔ Generated SDK (lives in weft-sdk CI)

After regeneration in any workflow, `git status` must be clean. If generation produced a diff but the PR body doesn't include it, fail.

```yaml
- run: ./scripts/generate-all.sh
- run: |
    if ! git diff --exit-code typescript/src/generated python/src/weft_sdk/generated ruby/lib/weft_sdk/generated go/; then
      echo "::error::Generated clients are out of sync with spec. Commit the regeneration."
      exit 1
    fi
```

This already implicitly exists in any good `generate-and-commit` workflow; if it doesn't, add it.

## Implementation outline

1. Add `committee-rails` to weft-app; wire response validation in test env only.
2. Run full test suite; fix any drift it finds (this is spec 01's job — expect overlap).
3. Add `spec-drift.yml` to weft-sdk.
4. Add the `git diff --exit-code` guard to `weft-sdk/.github/workflows/release.yml` and `sync-spec.yml` (if not present).
5. Intentionally introduce a tiny drift (rename a property in a branch) and confirm all three checks fail.

## Verification

- Seeded drift on a branch → weft-app CI red on request specs.
- Seeded drift on `weft-sdk/spec/openapi.yaml` vs. `weft-app/docs/openapi.yaml` → `spec-drift.yml` red, issue opened.
- Seeded un-regenerated models → release workflow red.

## Open questions

- Does `committee-rails` support the Rails 8 / Ruby 3.3 combo we're on? (Check gem metadata; fall back to `rspec-openapi` or custom if not.)
- Where does the `spec-drift` issue get opened — `weft-sdk` or `weft-app`? **Recommend `weft-app` since that's where the fix usually lives (bump `docs/openapi.yaml`).**
