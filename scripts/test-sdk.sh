#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -d "${ROOT_DIR}/typescript/src/generated" ]; then
  echo "TypeScript generated SDK missing. Run ./scripts/generate-typescript.sh"
  exit 1
fi

if [ ! -d "${ROOT_DIR}/python/src/weft_sdk/generated" ]; then
  echo "Python generated SDK missing. Run ./scripts/generate-python.sh"
  exit 1
fi

if [ ! -d "${ROOT_DIR}/ruby/lib/weft/generated" ]; then
  echo "Ruby generated SDK missing. Run ./scripts/generate-ruby.sh"
  exit 1
fi

if [ ! -d "${ROOT_DIR}/go/generated" ]; then
  echo "Go generated SDK missing. Run ./scripts/generate-go.sh"
  exit 1
fi

echo "Generated SDK outputs present."
