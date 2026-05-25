# Spec 02 — weft-sdk Spec-Sync Authenticated Fetch

**Status:** Proposed
**Owner:** unassigned
**Parent plan:** `plans/active/2026-04-sdk-pipeline-complete.md`

## Problem

`weft-sdk/.github/workflows/sync-spec.yml` receives a `weft-app-openapi-updated` repository_dispatch and fetches the spec via `curl https://raw.githubusercontent.com/weft-labs/weft-app/main/docs/openapi.yaml`. Because `weft-app` is private, the raw URL returns `404: Not Found`. The only historical run (`22710049246`, 2026-03-05) failed on exactly this.

Net result: the spec-sync pipeline has **never worked**. All regenerated SDK output has come from whatever `weft-sdk/spec/openapi.yaml` was committed manually.

## Goals

- `sync-spec.yml` successfully fetches the current `docs/openapi.yaml` from private `weft-app`.
- Fetch uses least-privilege credential; no long-lived user PAT.
- Workflow opens a sync PR with regenerated clients whenever the spec changes in `weft-app`.

## Non-goals

- Changing dispatch semantics on `weft-app` side.
- Switching to a webhook-based model.
- Vendoring the spec into a public sibling repo.

## Design

### Credential options

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **A. GitHub App (`weft-labs-bot`)** installed on both repos, token minted per-run via `tibdex/github-app-token` or `actions/create-github-app-token` | Org-managed, rotatable, scoped | Requires creating the App if not present | **Recommended** |
| B. Fine-grained PAT in `weft-sdk` secrets | Quick to add | Tied to a human account; rotation/expiry toil | Acceptable stop-gap |
| C. Cross-repo `GITHUB_TOKEN` via `repository_dispatch` payload | No extra creds | `GITHUB_TOKEN` is scoped to source repo only; can't read private target | Not viable |

### Workflow change

Replace the raw curl with an authenticated checkout or contents API call:

```yaml
- uses: actions/create-github-app-token@v1
  id: app-token
  with:
    app-id: ${{ secrets.WEFT_BOT_APP_ID }}
    private-key: ${{ secrets.WEFT_BOT_PRIVATE_KEY }}
    owner: weft-labs
    repositories: weft-app

- name: Fetch canonical spec
  run: |
    curl -fsSL \
      -H "Authorization: Bearer ${{ steps.app-token.outputs.token }}" \
      -H "Accept: application/vnd.github.v3.raw" \
      -o spec/openapi.yaml \
      https://api.github.com/repos/weft-labs/weft-app/contents/docs/openapi.yaml?ref=main
```

Alternative: `actions/checkout@v4` with `repository: weft-labs/weft-app` and `token: ${{ steps.app-token.outputs.token }}` into a subdir, then copy `docs/openapi.yaml` out.

### Branch + PR behavior

- Branch name: `sync/openapi-<short-sha-of-source-commit>`.
- If an open sync PR already exists, push to its branch instead of opening a new one (use `peter-evans/create-pull-request` idempotency).
- PR title: `chore(sync): openapi from weft-app@<sha>`.
- PR body: link to the triggering `weft-app` commit; diff summary of paths changed.

### Failure modes to handle

- App token mint fails → fail loudly, don't open a half-synced PR.
- Generator fails on the new spec → open PR in draft with CI red; do not swallow.
- Spec unchanged after fetch → no-op, no PR.

## Implementation outline

1. Create (or reuse) `weft-labs-bot` GitHub App with `contents: read` on `weft-app` and `contents: write` + `pull-requests: write` on `weft-sdk`.
2. Add `WEFT_BOT_APP_ID` and `WEFT_BOT_PRIVATE_KEY` to `weft-sdk` repo secrets.
3. Rewrite `sync-spec.yml` fetch step as above.
4. Add an end-to-end test: commit a no-op whitespace change to `weft-app/docs/openapi.yaml`, confirm a sync PR appears in `weft-sdk`, close it.
5. Update `weft-sdk/README.md` with a short note on how the sync works + the bot identity.

## Verification

- `gh workflow run sync-spec.yml --repo weft-labs/weft-sdk` (manual trigger) succeeds.
- After a real spec change in `weft-app`, a PR appears in `weft-sdk` within 5 min.
- The sync PR's diff contains generated-client changes matching the spec diff.

## Open questions

- Do we already have a shared `weft-labs-bot` GitHub App? (Check `weft-dev/.github/` and org settings.) If yes, reuse; if no, spec 02's first step is creating it.
- Should the bot also have permission to merge its own sync PRs automatically if CI is green, or must a human review? **Default: human review.**
