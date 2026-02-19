#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/go"
TMP_DIR="${OUT_DIR}/.generated"

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

docker run --rm \
  -v "${ROOT_DIR}:/local" \
  openapitools/openapi-generator-cli:v7.19.0 generate \
  -i /local/spec/openapi.yaml \
  -g go \
  -o /local/go/.generated \
  --additional-properties=packageName=generated,moduleName=github.com/weft-labs/weft-sdk/go/generated

rm -rf "${OUT_DIR}/generated"
mkdir -p "${OUT_DIR}/generated"

cp -R "${TMP_DIR}/"* "${OUT_DIR}/generated/"

# Fix placeholder import path in generated docs and source
find "${OUT_DIR}/generated" -type f \( -name '*.go' -o -name '*.md' \) \
  -exec sed -i '' 's|github.com/GIT_USER_ID/GIT_REPO_ID|github.com/weft-labs/weft-sdk/go/generated|g' {} +
