#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LANGUAGE="${1:-all}"

case "$LANGUAGE" in
  typescript)
    GENERATORS=(typescript)
    TRACKED_PATHS=(typescript/src/generated typescript/docs)
    PROTECTED_PATHS=(typescript/src/client.ts typescript/src/index.ts)
    ;;
  python)
    GENERATORS=(python)
    TRACKED_PATHS=(python/src/weft_sdk/generated python/docs)
    PROTECTED_PATHS=(python/src/weft_sdk/client.py python/src/weft_sdk/__init__.py)
    ;;
  ruby)
    GENERATORS=(ruby)
    TRACKED_PATHS=(ruby/lib/weft/generated ruby/docs)
    PROTECTED_PATHS=(ruby/lib/weft/sdk.rb)
    ;;
  go)
    GENERATORS=(go)
    TRACKED_PATHS=(go/generated go/docs)
    PROTECTED_PATHS=(go/weft.go)
    ;;
  all)
    GENERATORS=(typescript python ruby go)
    TRACKED_PATHS=(
      typescript/src/generated typescript/docs
      python/src/weft_sdk/generated python/docs
      ruby/lib/weft/generated ruby/docs
      go/generated go/docs
    )
    PROTECTED_PATHS=(
      typescript/src/client.ts
      typescript/src/index.ts
      python/src/weft_sdk/client.py
      python/src/weft_sdk/__init__.py
      ruby/lib/weft/sdk.rb
      go/weft.go
    )
    ;;
  *)
    echo "Usage: $0 [all|typescript|python|ruby|go]" >&2
    exit 2
    ;;
esac

protected_hashes_before=()
for path in "${PROTECTED_PATHS[@]}"; do
  [ -f "${ROOT_DIR}/${path}" ] || {
    echo "Protected hand-written SDK path is missing before generation: ${path}" >&2
    exit 1
  }
  protected_hashes_before+=("$(git -C "$ROOT_DIR" hash-object "$path")")
done

for generator in "${GENERATORS[@]}"; do
  "${ROOT_DIR}/scripts/generate-${generator}.sh"
done

for index in "${!PROTECTED_PATHS[@]}"; do
  path="${PROTECTED_PATHS[$index]}"
  [ -f "${ROOT_DIR}/${path}" ] || {
    echo "Generation removed protected hand-written SDK path: ${path}" >&2
    exit 1
  }
  hash_after="$(git -C "$ROOT_DIR" hash-object "$path")"
  if [ "$hash_after" != "${protected_hashes_before[$index]}" ]; then
    echo "Generation modified protected hand-written SDK path: ${path}" >&2
    exit 1
  fi
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
