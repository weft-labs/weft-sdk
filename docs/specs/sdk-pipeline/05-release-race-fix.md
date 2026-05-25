# Spec 05 — Fix CD: Release ↔ Staging Deploy Race

**Status:** Proposed
**Owner:** unassigned
**Parent plan:** `plans/active/2026-04-sdk-pipeline-complete.md`

## Problem

Tagging `v*` on `weft-app` fires two workflows simultaneously:

- `CD: Staging Deploy` — builds the Docker image on the tagged SHA.
- `CD: Release` — tries to use that Docker image (or artifacts produced by it) and dispatches `release` to `weft-sdk`.

`CD: Release` frequently starts before `CD: Staging Deploy`'s image is in the registry, so it fails. The catch-up session had to manually re-run `24844880168` after the Docker build completed.

Every real release requires this babysitting today.

## Goals

- Tagging `v*` produces a green `CD: Release` on first try.
- No manual re-run required in the happy path.
- No regressions to staging-deploy behavior.

## Non-goals

- Separating the tag-triggered release from staging-deploy semantics.
- Moving to a release-please / semantic-release system.
- Changing SDK release dispatch payload.

## Design

Three options; pick one.

### Option A — Sequence via `workflow_run` (recommended)

`CD: Release` listens for `workflow_run` on `CD: Staging Deploy` completion (type: `completed`, conclusion: `success`) filtered to tags matching `v*`.

```yaml
on:
  workflow_run:
    workflows: ["CD: Staging Deploy"]
    types: [completed]

jobs:
  release:
    if: >
      github.event.workflow_run.conclusion == 'success' &&
      startsWith(github.event.workflow_run.head_branch, 'refs/tags/v')
    runs-on: ubuntu-latest
    steps:
      - ... (existing release steps)
```

Pros: no new infra; guaranteed ordering.
Cons: `workflow_run` events don't carry the tag ref cleanly; must derive tag from `head_branch` + `head_sha`. Slightly fiddly to plumb.

### Option B — Wait-for-image in the release job

Keep the `on: push: tags: v*` trigger. Add a first step in `CD: Release` that polls the registry for the image tag matching the git tag, with timeout.

```yaml
- name: Wait for staging image
  run: |
    for i in {1..60}; do
      if docker manifest inspect ghcr.io/weft-labs/weft-app:${GITHUB_REF_NAME} >/dev/null 2>&1; then
        exit 0
      fi
      sleep 10
    done
    echo "::error::Image not published after 10 min"
    exit 1
```

Pros: minimal change; easy to reason about.
Cons: consumes runner minutes while polling; fragile to image name changes.

### Option C — Merge release into staging deploy

Make `CD: Staging Deploy` the single tag-triggered workflow; add release dispatch as its final job.

Pros: one pipeline; naturally ordered.
Cons: couples two concerns; makes re-running just the release harder when only the dispatch fails.

### Recommendation

**Option A.** It's the idiomatic GitHub Actions pattern for "workflow B after workflow A", and keeps the two workflows conceptually separate.

## Implementation outline

1. Rewrite `weft-app/.github/workflows/cd_release.yml` trigger block to `workflow_run`.
2. Add logic to extract the tag from `github.event.workflow_run.head_sha` using the Git tags API or `git describe`.
3. Guard the release job with a check that the triggering workflow was tag-driven (not a manual dispatch or branch push).
4. Add a manual `workflow_dispatch` fallback (accepts `tag` input) for emergency re-runs.
5. Test: push a throwaway tag `v0.3.1-rc0` and confirm the full chain goes green without intervention.

## Verification

- `gh run list --repo weft-labs/weft-app --workflow="CD: Release" --limit 5` after next tag shows status `success` on first row.
- No manual re-run entries in the run history for the tag.
- The `weft-sdk` `Release` workflow still receives the `release` dispatch correctly (nothing about its trigger changes).

## Open questions

- Does the current `CD: Release` actually depend on artifacts from `CD: Staging Deploy`, or does it just happen to race for a different reason? (Audit job inputs before writing Option A.) If there's no real dependency, a simpler fix is to remove the race entirely.
- Is there a separate `CD: Production Deploy` that should also sequence off of this? (Likely not, since staging + release are the two currently wired.)
