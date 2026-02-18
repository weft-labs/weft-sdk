#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/ruby"
TMP_DIR="${OUT_DIR}/.generated"

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

docker run --rm \
  -v "${ROOT_DIR}:/local" \
  openapitools/openapi-generator-cli:v7.19.0 generate \
  -i /local/spec/openapi.yaml \
  -g ruby \
  -o /local/ruby/.generated \
  --additional-properties=moduleName=Weft,gemName=weft-sdk,gemVersion=0.2.0

rm -rf "${OUT_DIR}/lib/weft/generated"
mkdir -p "${OUT_DIR}/lib/weft/generated"

cp -R "${TMP_DIR}/lib/weft-sdk/"* "${OUT_DIR}/lib/weft/generated/"
