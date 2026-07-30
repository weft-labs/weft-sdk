#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/python"
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
  python \
  "${TMP_DIR}" \
  --additional-properties=packageName=weft_sdk.generated,projectName=weft-sdk,packageVersion="${SPEC_VERSION}"

rm -rf "${OUT_DIR}/src/weft_sdk/generated" "${OUT_DIR}/docs"
mkdir -p "${OUT_DIR}/src/weft_sdk"

cp -R "${TMP_DIR}/weft_sdk/generated" "${OUT_DIR}/src/weft_sdk/"

# Copy generated docs
if [ -d "${TMP_DIR}/docs" ]; then
  cp -R "${TMP_DIR}/docs" "${OUT_DIR}/docs"
fi

"${ROOT_DIR}/scripts/strip-generated-whitespace.sh" \
  "${OUT_DIR}/src/weft_sdk/generated" "${OUT_DIR}/docs"
