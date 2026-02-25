#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/ruby"
TMP_DIR="${OUT_DIR}/.generated"

# Read version from OpenAPI spec (already bumped by bump-version.sh in release flow)
SPEC_VERSION=$(grep '  version:' "${ROOT_DIR}/spec/openapi.yaml" | head -1 | awk '{print $2}')

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

docker run --rm \
  -v "${ROOT_DIR}:/local" \
  openapitools/openapi-generator-cli:v7.19.0 generate \
  -i /local/spec/openapi.yaml \
  -g ruby \
  -o /local/ruby/.generated \
  --additional-properties=moduleName=Weft,gemName=weft-sdk,gemVersion="${SPEC_VERSION}"

rm -rf "${OUT_DIR}/lib/weft/generated" "${OUT_DIR}/docs"
mkdir -p "${OUT_DIR}/lib/weft/generated"

cp -R "${TMP_DIR}/lib/weft-sdk/"* "${OUT_DIR}/lib/weft/generated/"

# Copy generated docs
if [ -d "${TMP_DIR}/docs" ]; then
  cp -R "${TMP_DIR}/docs" "${OUT_DIR}/docs"
fi
