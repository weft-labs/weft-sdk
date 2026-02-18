#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPEC_PATH="${ROOT_DIR}/spec/openapi.yaml"
OUT_DIR="${ROOT_DIR}/typescript"
TMP_DIR="${OUT_DIR}/.generated"

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

docker run --rm \
  -v "${ROOT_DIR}:/local" \
  openapitools/openapi-generator-cli:v7.19.0 generate \
  -i /local/spec/openapi.yaml \
  -g typescript-fetch \
  -o /local/typescript/.generated \
  --additional-properties=supportsES6=true,npmName=@weft/sdk,typescriptThreePlus=true

rm -rf "${OUT_DIR}/src/generated" "${OUT_DIR}/docs" "${OUT_DIR}/.openapi-generator" "${OUT_DIR}/.openapi-generator-ignore"
mkdir -p "${OUT_DIR}/src/generated"

cp -R "${TMP_DIR}/src/apis" "${OUT_DIR}/src/generated/"
cp -R "${TMP_DIR}/src/models" "${OUT_DIR}/src/generated/"
cp "${TMP_DIR}/src/runtime.ts" "${OUT_DIR}/src/generated/runtime.ts"
cp "${TMP_DIR}/src/index.ts" "${OUT_DIR}/src/generated/index.ts"

cp -R "${TMP_DIR}/docs" "${OUT_DIR}/docs"
cp -R "${TMP_DIR}/.openapi-generator" "${OUT_DIR}/.openapi-generator"
cp "${TMP_DIR}/.openapi-generator-ignore" "${OUT_DIR}/.openapi-generator-ignore"
