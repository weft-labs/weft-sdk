# Spec 03 — Consumer Loop-back (weft-sdk → weft-app bump + docs regen)

**Status:** Proposed
**Owner:** unassigned
**Parent plan:** `plans/active/2026-04-sdk-pipeline-complete.md`

## Problem

When `weft-sdk` publishes a new version, nothing updates `weft-app/package.json` or regenerates `weft-app/docs/api-reference.md`. The catch-up session did this by hand (commit `478be156`). Every future SDK release requires the same manual step, meaning `weft-app` will silently drift from the SDK it's supposed to be eating its own dogfood on.

## Goals

- SDK publish → `weft-app` PR that bumps `@weft-labs/sdk` to the new version and regenerates docs.
- Zero manual intervention in the happy path.
- PR is reviewable: clear title, clean diff, CI green before merge.

## Non-goals

- Auto-merging the bump PR (human review stays).
- Bumping Python/Ruby/Go clients anywhere (weft-app consumes TS only).
- Version-pinning policy changes (stay on caret ranges).

## Design

Two viable patterns; pick one.

### Option A — Dependabot (recommended)

Pros: zero custom code; native GitHub UX; handles grouping; security-patch compatible.
Cons: no built-in post-update hook, so `docs:generate` needs a separate CI step.

`weft-app/.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: daily
    allow:
      - dependency-name: "@weft-labs/sdk"
    labels: ["sdk-bump"]
    commit-message:
      prefix: "chore"
      include: "scope"
```

Then add a CI workflow `weft-app/.github/workflows/sdk-bump-regen.yml` triggered on PRs with the `sdk-bump` label (or on any PR touching `package.json` where `@weft-labs/sdk` changed):

```yaml
on:
  pull_request:
    paths: ["package.json", "package-lock.json"]

jobs:
  regen-docs:
    if: contains(github.event.pull_request.labels.*.name, 'sdk-bump')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/create-github-app-token@v2
        id: app-token
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
          owner: weft-labs
          repositories: weft-app
          permission-contents: write
      - uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.ref }}
          token: ${{ steps.app-token.outputs.token }}
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run docs:generate
      - name: Commit regen if changed
        run: |
          if ! git diff --quiet docs/api-reference.md; then
            git config user.name "weft-labs-bot"
            git config user.email "bot@weftlabs.com"
            git add docs/api-reference.md
            git commit -m "chore(docs): regenerate for SDK bump"
            git push
          fi
```

### Option B — weft-sdk → weft-app repository_dispatch

Pros: symmetric with existing spec dispatch; instant (no Dependabot poll lag); single PR opens with bump + regen already applied.
Cons: more code to maintain; duplicates Dependabot's job.

`weft-sdk/.github/workflows/typescript.yml` adds a final step after successful publish:

```yaml
- name: Notify weft-app
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ steps.app-token.outputs.token }}
    repository: weft-labs/weft-app
    event-type: weft-sdk-published
    client-payload: '{"version": "${{ steps.version.outputs.version }}"}'
```

`weft-app/.github/workflows/sdk-published.yml`:

```yaml
on:
  repository_dispatch:
    types: [weft-sdk-published]

jobs:
  bump:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install --save-exact @weft-labs/sdk@${{ github.event.client_payload.version }}
      - run: npm run docs:generate
      - uses: peter-evans/create-pull-request@v6
        with:
          title: "chore: bump @weft-labs/sdk to ${{ github.event.client_payload.version }}"
          commit-message: "chore: bump @weft-labs/sdk and regenerate docs"
          branch: "sdk-bump/${{ github.event.client_payload.version }}"
```

### Recommendation

**Option A (Dependabot + regen workflow).** Reasoning:
- Dependabot is already proven infra; we get security updates for free.
- Solo founder; fewer moving parts wins.
- Minor lag (hours, not seconds) is fine — these aren't customer-facing releases.

## Implementation outline

1. Land `weft-app/.github/dependabot.yml` scoped to `@weft-labs/sdk`.
2. Land `weft-app/.github/workflows/sdk-bump-regen.yml`.
3. Verify: publish a patch SDK (via `weft-sdk/release.yml` against a v0.4.1 tag on weft-app, or a test dispatch). Confirm Dependabot PR opens within 24h and CI auto-commits regenerated docs.
4. Document the loop in `reference/sdk-pipeline.md`.

## Verification

- `gh pr list --repo weft-labs/weft-app --label sdk-bump` shows the bot PR after a release.
- PR contains both the `package.json` diff and the `docs/api-reference.md` diff.
- Merging the PR doesn't break staging deploy.

## Open questions

- Do we want to gate the bump on the `contract-drift` test (spec 04) passing? **Recommended: yes.**
- Should the regen workflow also update `weft-app/docs/openapi.yaml` if the SDK came from a newer spec version? **No — openapi.yaml is the source, not a downstream artifact. If they differ, that's a drift bug, not an update target.**
