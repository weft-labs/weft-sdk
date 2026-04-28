#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-}"
EXPECTED_APP_SHA="${2:-}"

if [ -z "$BASE_URL" ] || [ -z "$EXPECTED_APP_SHA" ]; then
  echo "Usage: $0 <base-url> <expected-app-sha>" >&2
  exit 1
fi

BASE_URL="${BASE_URL%/}"
VERSION_URL="$BASE_URL/up/version"
RESPONSE_FILE="$(mktemp)"

cleanup() {
  rm -f "$RESPONSE_FILE"
}
trap cleanup EXIT

curl -fsSL \
  --connect-timeout 5 \
  --max-time 20 \
  --retry 2 \
  --retry-delay 1 \
  --retry-connrefused \
  "$VERSION_URL" \
  -o "$RESPONSE_FILE"

ACTUAL_APP="$(jq -r '.app // empty' "$RESPONSE_FILE")"
ACTUAL_SHA="$(jq -r '.sha // empty' "$RESPONSE_FILE")"

if [ "$ACTUAL_APP" != "weft-app" ]; then
  echo "::error::Unexpected app at $VERSION_URL: $ACTUAL_APP" >&2
  cat "$RESPONSE_FILE" >&2
  exit 1
fi

if [ "$ACTUAL_SHA" != "$EXPECTED_APP_SHA" ]; then
  echo "::error::Staging SHA mismatch at $VERSION_URL: $ACTUAL_SHA != $EXPECTED_APP_SHA" >&2
  cat "$RESPONSE_FILE" >&2
  exit 1
fi

echo "Staging is serving weft-app@$EXPECTED_APP_SHA"
