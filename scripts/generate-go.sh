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

rm -rf "${OUT_DIR}/generated" "${OUT_DIR}/docs"
mkdir -p "${OUT_DIR}/generated"

cp -R "${TMP_DIR}/"* "${OUT_DIR}/generated/"

# Extract docs to go/docs/ (consistent with TypeScript, Python, Ruby)
if [ -d "${OUT_DIR}/generated/docs" ]; then
  cp -R "${OUT_DIR}/generated/docs" "${OUT_DIR}/docs"
fi

# Fix placeholder import path in generated docs and source
find "${OUT_DIR}/generated" "${OUT_DIR}/docs" -type f \( -name '*.go' -o -name '*.md' \) \
  -exec sed -i.bak 's|github.com/GIT_USER_ID/GIT_REPO_ID|github.com/weft-labs/weft-sdk/go/generated|g' {} +
find "${OUT_DIR}/generated" "${OUT_DIR}/docs" -name '*.bak' -delete
