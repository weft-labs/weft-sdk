#!/usr/bin/env bash
set -euo pipefail

APP_SHA="${1:-}"
EXPECTED_OPENAPI_SHA256="${2:-}"
EXPECTED_OPENAPI_VERSION="${3:-}"
REQUIRED_STATUS="${4:-green}"

if [ -z "$APP_SHA" ]; then
  echo "Usage: $0 <app-sha> [expected-openapi-sha256] [expected-openapi-version] [required-status]" >&2
  exit 1
fi

sha256_file() {
  local file="$1"

  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum "$file" | cut -d ' ' -f 1
  elif command -v shasum >/dev/null 2>&1; then
    shasum -a 256 "$file" | cut -d ' ' -f 1
  elif command -v openssl >/dev/null 2>&1; then
    openssl dgst -sha256 "$file" | awk '{print $NF}'
  else
    echo "::error::No supported SHA-256 tool found; install sha256sum, shasum, or openssl" >&2
    exit 1
  fi
}

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CANDIDATE_FILE="$ROOT_DIR/.release-candidates/weft-app-$APP_SHA.json"

if [ ! -f "$CANDIDATE_FILE" ]; then
  echo "::error::Missing release candidate marker: $CANDIDATE_FILE" >&2
  exit 1
fi

STATUS="$(jq -r '.status // empty' "$CANDIDATE_FILE")"
if [ "$STATUS" != "$REQUIRED_STATUS" ]; then
  echo "::error::Release candidate for weft-app@$APP_SHA is '$STATUS', expected '$REQUIRED_STATUS'" >&2
  exit 1
fi

MARKER_APP_SHA="$(jq -r '.app_sha // empty' "$CANDIDATE_FILE")"
if [ "$MARKER_APP_SHA" != "$APP_SHA" ]; then
  echo "::error::Candidate marker app_sha mismatch: $MARKER_APP_SHA != $APP_SHA" >&2
  exit 1
fi

MARKER_OPENAPI_SHA256="$(jq -r '.openapi_sha256 // empty' "$CANDIDATE_FILE")"
if [ -n "$EXPECTED_OPENAPI_SHA256" ] && [ "$MARKER_OPENAPI_SHA256" != "$EXPECTED_OPENAPI_SHA256" ]; then
  echo "::error::Candidate OpenAPI SHA-256 mismatch: $MARKER_OPENAPI_SHA256 != $EXPECTED_OPENAPI_SHA256" >&2
  exit 1
fi

MARKER_OPENAPI_VERSION="$(jq -r '.openapi_version // empty' "$CANDIDATE_FILE")"
if [ -n "$EXPECTED_OPENAPI_VERSION" ] && [ "$MARKER_OPENAPI_VERSION" != "$EXPECTED_OPENAPI_VERSION" ]; then
  echo "::error::Candidate OpenAPI version mismatch: $MARKER_OPENAPI_VERSION != $EXPECTED_OPENAPI_VERSION" >&2
  exit 1
fi

SDK_REF="$(jq -r '.sdk_ref // empty' "$CANDIDATE_FILE")"
if [ -z "$SDK_REF" ]; then
  echo "::error::Candidate marker missing sdk_ref" >&2
  exit 1
fi

ACTUAL_OPENAPI_SHA256="$(sha256_file "$ROOT_DIR/spec/openapi.yaml")"
if [ "$ACTUAL_OPENAPI_SHA256" != "$MARKER_OPENAPI_SHA256" ]; then
  echo "::error::Checked-out spec SHA-256 mismatch: $ACTUAL_OPENAPI_SHA256 != $MARKER_OPENAPI_SHA256" >&2
  exit 1
fi

echo "Verified green release candidate for weft-app@$APP_SHA on $SDK_REF"
if [ -n "${GITHUB_ENV:-}" ]; then
  echo "SDK_REF=$SDK_REF" >> "$GITHUB_ENV"
fi
