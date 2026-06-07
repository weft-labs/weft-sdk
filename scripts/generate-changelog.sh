#!/usr/bin/env bash
#
# generate-changelog.sh — produce a human-readable CHANGELOG entry by diffing
# the previous vs the current spec/openapi.yaml.
#
# Consumers who see a weft-sdk version bump (e.g. via `npm outdated`) otherwise
# get no explanation of what changed. This script renders the OpenAPI delta
# (added/removed paths, schema changes, breaking changes) as markdown and writes
# it to a release-notes file, so a candidate PR carries its own changelog.
#
# Pure CI tooling — it never touches generated SDK source.
#
# Usage:
#   scripts/generate-changelog.sh [BASE_REF] [OUTPUT_FILE]
#
#   BASE_REF      git ref to diff the current spec against.
#                 Default: origin/main (falls back to HEAD~1, then the merge base).
#   OUTPUT_FILE   where to write the markdown changelog.
#                 Default: .release-candidates/CHANGELOG.md
#
# Environment:
#   OASDIFF_VERSION   pin the oasdiff version installed if it is not on PATH
#                     (default: 1.18.4). In CI prefer the oasdiff GitHub Action;
#                     this self-install path is the local/fallback convenience.
#
# Output: writes OUTPUT_FILE and echoes its path. Exits non-zero only on a
# real error (missing spec, diff tooling failure) — an empty/no-change diff is
# a successful run that still writes a "no API changes" stub.

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPEC_PATH="spec/openapi.yaml"
CURRENT_SPEC="${ROOT_DIR}/${SPEC_PATH}"

BASE_REF="${1:-origin/main}"
OUTPUT_FILE="${2:-${ROOT_DIR}/.release-candidates/CHANGELOG.md}"
OASDIFF_VERSION="${OASDIFF_VERSION:-1.18.4}"

if [ ! -f "$CURRENT_SPEC" ]; then
  echo "::error::Current spec not found at ${CURRENT_SPEC}" >&2
  exit 1
fi

# Drop a leading H1 line ("# API Changelog X vs. Y") from oasdiff output — we
# own the document heading. Portable across BSD (macOS) and GNU sed/awk.
drop_leading_h1() {
  awk 'NR==1 && /^# / {next} {print}'
}

# --- Resolve oasdiff -------------------------------------------------------
# Prefer an oasdiff already on PATH (CI installs it via the oasdiff action or a
# pinned binary). Fall back to a one-shot install into a temp dir so the script
# is runnable locally without polluting the host.
OASDIFF_BIN="$(command -v oasdiff || true)"
if [ -z "$OASDIFF_BIN" ]; then
  echo "oasdiff not on PATH — installing v${OASDIFF_VERSION} into a temp dir..." >&2
  INSTALL_DIR="$(mktemp -d)"
  trap 'rm -rf "$INSTALL_DIR"' EXIT
  if ! curl -fsSL https://raw.githubusercontent.com/oasdiff/oasdiff/main/install.sh \
        | BINDIR="$INSTALL_DIR" sh >&2; then
    echo "::error::Failed to install oasdiff. Install it manually or run the oasdiff GitHub Action." >&2
    exit 1
  fi
  OASDIFF_BIN="${INSTALL_DIR}/oasdiff"
fi
echo "Using oasdiff: $("$OASDIFF_BIN" --version 2>&1)" >&2

# --- Resolve the base spec -------------------------------------------------
# Extract the previous spec/openapi.yaml from the chosen base ref. Try the
# requested ref, then HEAD~1, then the merge-base with origin/main, so the
# script works on a candidate PR branch, on a shallow CI checkout, or locally.
PREV_SPEC="$(mktemp)"
trap 'rm -f "$PREV_SPEC"' EXIT

resolve_base() {
  for ref in "$BASE_REF" "HEAD~1" "$(git -C "$ROOT_DIR" merge-base HEAD origin/main 2>/dev/null || true)"; do
    [ -z "$ref" ] && continue
    if git -C "$ROOT_DIR" show "${ref}:${SPEC_PATH}" > "$PREV_SPEC" 2>/dev/null; then
      echo "$ref"
      return 0
    fi
  done
  return 1
}

if RESOLVED_REF="$(resolve_base)"; then
  echo "Diffing ${SPEC_PATH}: ${RESOLVED_REF} -> working tree" >&2
else
  echo "No previous ${SPEC_PATH} found in git history (${BASE_REF}, HEAD~1, merge-base)." >&2
  echo "Treating this as the first spec — emitting an initial-changelog stub." >&2
  : > "$PREV_SPEC"
fi

# --- Generate the changelog ------------------------------------------------
mkdir -p "$(dirname "$OUTPUT_FILE")"

CURRENT_VERSION="$(grep -E '^[[:space:]]*version:' "$CURRENT_SPEC" | head -1 | sed -E 's/.*version:[[:space:]]*//; s/["'\'']//g' || echo unknown)"
TODAY="$(date -u +%Y-%m-%d)"

{
  echo "# Changelog — OpenAPI ${CURRENT_VERSION} (${TODAY})"
  echo
  if [ ! -s "$PREV_SPEC" ]; then
    echo "Initial OpenAPI spec — no prior version to diff against."
  else
    # `oasdiff changelog` renders added/removed endpoints + schema changes as
    # markdown. It exits 0 even on "no changes"; capture its body verbatim.
    CHANGELOG_BODY="$("$OASDIFF_BIN" changelog "$PREV_SPEC" "$CURRENT_SPEC" --format markdown 2>/dev/null || true)"
    if [ -z "$CHANGELOG_BODY" ] || echo "$CHANGELOG_BODY" | grep -qiE "no changes|no api changes"; then
      echo "_No API surface changes detected between the previous and current spec._"
    else
      # Strip oasdiff's own H1 ("# API Changelog X vs. Y") — we own the heading.
      echo "$CHANGELOG_BODY" | drop_leading_h1
    fi
    echo
    # Breaking-changes section: oasdiff flags removals/incompatible changes.
    # "No changes detected" (identical specs) and "no breaking changes" both
    # mean nothing to surface here.
    BREAKING="$("$OASDIFF_BIN" breaking "$PREV_SPEC" "$CURRENT_SPEC" --format markdown 2>/dev/null || true)"
    if [ -n "$BREAKING" ] && ! echo "$BREAKING" | grep -qiE "no breaking changes|no changes detected"; then
      echo "## Breaking Changes"
      echo
      echo "$BREAKING" | drop_leading_h1
    fi
  fi
} > "$OUTPUT_FILE"

echo "Wrote changelog to: $OUTPUT_FILE" >&2
echo "$OUTPUT_FILE"
