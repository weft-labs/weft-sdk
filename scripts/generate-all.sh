#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Snapshot the dirty-file set before generation. The candidate-led pipeline
# already has spec/openapi.yaml (and per-language version files from
# bump-version.sh) dirty when this script runs. After the generators run,
# the dirty set must strictly grow — at least one generator has to produce
# output. Equality means every generator silently no-oped on the input,
# which is exactly the failure mode that ships a "successful" candidate PR
# carrying stale SDK code.
# See cto-os/meetings/2026-05-03-sdk-pipeline-spec-03-04-conclusion.md.
dirty_before="$(git -C "$ROOT_DIR" status --porcelain 2>/dev/null | sort || true)"

"${ROOT_DIR}/scripts/generate-typescript.sh"
"${ROOT_DIR}/scripts/generate-python.sh"
"${ROOT_DIR}/scripts/generate-ruby.sh"
"${ROOT_DIR}/scripts/generate-go.sh"

dirty_after="$(git -C "$ROOT_DIR" status --porcelain 2>/dev/null | sort || true)"

if [ -n "$dirty_before" ] && [ "$dirty_before" = "$dirty_after" ]; then
  echo "::error::All four SDK generators ran but the dirty file set did not grow." >&2
  echo "::error::Input was non-empty (something was dirty going in) yet generation produced no new output." >&2
  echo "::error::Likely cause: a generator silently no-oped (config regression, input parse skip, container failure surfaced as success)." >&2
  echo "::error::Investigate scripts/generate-{typescript,python,ruby,go}.sh against the current spec/openapi.yaml." >&2
  exit 1
fi

"${ROOT_DIR}/scripts/test-sdk.sh"
