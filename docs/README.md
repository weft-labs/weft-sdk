# weft-sdk Docs

Repo-internal documentation for the Weft SDK monorepo. Cross-repo content such as plans, workspace strategy, and multi-repo contracts lives in `../cto-os/` when this repo is checked out as part of the `weft-dev` workspace.

## Folder Map

| Folder | What's here | When to read |
|---|---|---|
| `architecture/` | Current-state architecture of SDK internals and release automation | Before changing generation, sync, or release flows |
| `specs/` | Repo-internal units of work, one spec per agent / per PR | Before implementing SDK pipeline hardening or similar scoped work |
| `decisions/` | Repo-internal ADRs | When revisiting a settled SDK trade-off |
| `runbooks/` | Deploy, debug, release, and recovery procedures | When operating the SDK pipeline or package publishing |
| `eval/` | Eval and QA fixtures or outputs | When changing code paths covered by an eval |
| `research/` | Repo-scoped exploratory analysis, audits, and incident reviews | For context on prior SDK pipeline investigations |

Folders are created on first use; not every folder is present yet.

## Current Docs

- `architecture/sdk-pipeline.md` — event-driven SDK release pipeline architecture.
- `specs/sdk-pipeline/` — SDK pipeline specs, including historical and superseded work.
- `research/2026-04-sdk-pipeline-post-pivot-audit.md` — post-pivot sync/release audit.
- `research/2026-05-19-sdk-release-pipeline-review.md` — v0.5.0 release-pipeline hardening review.

## Ontology Rules

This repo follows `../cto-os/directives/per-repo-doc-ontology.md` when the workspace is available. Routing summary:

- Repo-internal architecture / ADR / spec / runbook / eval / research -> here.
- Cross-repo architecture / ADR / spec / research -> `../cto-os/`.
- Plans, any lifecycle and any scope -> `../cto-os/plans/`.

## Naming

- Date-prefix dated artifacts as `YYYY-MM-DD-<topic>.md` or `YYYY-MM-<topic>.md` to match neighbors.
- Use kebab-case for topics.
- Specs use `<plan-id>-<descriptive-name>.md`.
- Do not use `final`, `v2`, or `latest` suffixes.

## Related

- `../AGENTS.md` — repo bootstrap: purpose, stack, commands, constraints.
- `../../cto-os/directives/per-repo-doc-ontology.md` — full routing rules when checked out in `weft-dev`.
- `../../cto-os/reference/architecture/doc-federation.md` — federation architecture and rationale.
