#!/usr/bin/env bash
set -euo pipefail

APP_SHA="${1:-}"
OPENAPI_SHA256="${2:-}"
OPENAPI_VERSION="${3:-}"
SDK_REF="${4:-}"
STATUS="${5:-pending}"
E2E_RUN_URL="${6:-}"

if [ -z "$APP_SHA" ] || [ -z "$OPENAPI_SHA256" ] || [ -z "$OPENAPI_VERSION" ] || [ -z "$SDK_REF" ]; then
  echo "Usage: $0 <app-sha> <openapi-sha256> <openapi-version> <sdk-ref> [status] [e2e-run-url]" >&2
  exit 1
fi

if ! echo "$APP_SHA" | grep -qE '^[0-9a-f]{40}$'; then
  echo "Error: app SHA must be a 40-character git SHA" >&2
  exit 1
fi

if ! echo "$OPENAPI_SHA256" | grep -qE '^[0-9a-f]{64}$'; then
  echo "Error: OpenAPI SHA-256 must be 64 lowercase hex characters" >&2
  exit 1
fi

case "$STATUS" in
  pending|green|red) ;;
  *)
    echo "Error: status must be pending, green, or red" >&2
    exit 1
    ;;
esac

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CANDIDATE_DIR="$ROOT_DIR/.release-candidates"
CANDIDATE_FILE="$CANDIDATE_DIR/weft-app-$APP_SHA.json"
SHORT_APP_SHA="${APP_SHA:0:12}"

mkdir -p "$CANDIDATE_DIR"

jq -n \
  --arg app_sha "$APP_SHA" \
  --arg app_short_sha "$SHORT_APP_SHA" \
  --arg openapi_sha256 "$OPENAPI_SHA256" \
  --arg openapi_version "$OPENAPI_VERSION" \
  --arg sdk_ref "$SDK_REF" \
  --arg status "$STATUS" \
  --arg e2e_run_url "$E2E_RUN_URL" \
  --arg generated_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  '{
    app: "weft-app",
    app_sha: $app_sha,
    app_short_sha: $app_short_sha,
    openapi_sha256: $openapi_sha256,
    openapi_version: $openapi_version,
    sdk_ref: $sdk_ref,
    status: $status,
    e2e_run_url: $e2e_run_url,
    generated_at: $generated_at
  }' > "$CANDIDATE_FILE"

echo "Wrote $CANDIDATE_FILE"
