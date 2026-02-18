#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/python"
TMP_DIR="${OUT_DIR}/.generated"

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

docker run --rm \
  -v "${ROOT_DIR}:/local" \
  openapitools/openapi-generator-cli:v7.19.0 generate \
  -i /local/spec/openapi.yaml \
  -g python \
  -o /local/python/.generated \
  --additional-properties=packageName=weft_sdk.generated,projectName=weft-sdk,packageVersion=0.2.0

rm -rf "${OUT_DIR}/src/weft_sdk/generated"
mkdir -p "${OUT_DIR}/src/weft_sdk"

cp -R "${TMP_DIR}/weft_sdk/generated" "${OUT_DIR}/src/weft_sdk/"
