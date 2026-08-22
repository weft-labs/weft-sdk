#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/ruby"
TMP_DIR="${OUT_DIR}/.generated"

# Read version from OpenAPI spec (already bumped by bump-version.sh in release flow)
SPEC_VERSION=$(grep '  version:' "${ROOT_DIR}/spec/openapi.yaml" | head -1 | awk '{print $2}')
if [ -z "$SPEC_VERSION" ]; then
  echo "Error: Could not extract version from spec/openapi.yaml" >&2
  exit 1
fi

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

"${ROOT_DIR}/scripts/run-openapi-generator.sh" \
  ruby \
  "${TMP_DIR}" \
  --additional-properties=moduleName=Weft,gemName=weft-sdk,gemVersion="${SPEC_VERSION}"

rm -rf "${OUT_DIR}/lib/weft/generated" "${OUT_DIR}/docs"
mkdir -p "${OUT_DIR}/lib/weft/generated"

cp -R "${TMP_DIR}/lib/weft-sdk/"* "${OUT_DIR}/lib/weft/generated/"

git -C "${ROOT_DIR}" apply --unidiff-zero "scripts/patches/ruby-safe-debug-logging.patch"

# OpenAPI Generator 7.19 emits oneOf discriminator builders that only read
# symbol keys, but JSON.parse supplies string keys. Normalize every generated
# discriminator lookup so real API responses deserialize correctly.
find "${OUT_DIR}/lib/weft/generated/models" -type f -name '*.rb' \
  -exec sed -i.bak \
  's/data\[openapi_discriminator_name\]/data[openapi_discriminator_name] || data[openapi_discriminator_name.to_s]/g' {} +
find "${OUT_DIR}/lib/weft/generated/models" -type f -name '*.bak' -delete

# Copy generated docs
if [ -d "${TMP_DIR}/docs" ]; then
  cp -R "${TMP_DIR}/docs" "${OUT_DIR}/docs"
fi

"${ROOT_DIR}/scripts/strip-generated-whitespace.sh" \
  "${OUT_DIR}/lib/weft/generated" "${OUT_DIR}/docs"
