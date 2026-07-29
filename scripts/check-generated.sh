#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LANGUAGE="${1:-all}"

case "$LANGUAGE" in
  typescript)
    GENERATORS=(typescript)
    TRACKED_PATHS=(typescript/src/generated typescript/docs)
    ;;
  python)
    GENERATORS=(python)
    TRACKED_PATHS=(python/src/weft_sdk/generated python/docs)
    ;;
  ruby)
    GENERATORS=(ruby)
    TRACKED_PATHS=(ruby/lib/weft/generated ruby/docs)
    ;;
  go)
    GENERATORS=(go)
    TRACKED_PATHS=(go/generated go/docs)
    ;;
  all)
    GENERATORS=(typescript python ruby go)
    TRACKED_PATHS=(
      typescript/src/generated typescript/docs
      python/src/weft_sdk/generated python/docs
      ruby/lib/weft/generated ruby/docs
      go/generated go/docs
    )
    ;;
  *)
    echo "Usage: $0 [all|typescript|python|ruby|go]" >&2
    exit 2
    ;;
esac

for generator in "${GENERATORS[@]}"; do
  "${ROOT_DIR}/scripts/generate-${generator}.sh"
done

"${ROOT_DIR}/scripts/test-sdk.sh"

status="$(git -C "$ROOT_DIR" status --porcelain --untracked-files=all -- "${TRACKED_PATHS[@]}")"
if [ -n "$status" ]; then
  echo "Generated $LANGUAGE SDK is out of date with spec/openapi.yaml:" >&2
  echo "$status" >&2
  echo "Run scripts/generate-${LANGUAGE}.sh and commit the generated output." >&2
  exit 1
fi

echo "Generated $LANGUAGE SDK matches the committed output."
