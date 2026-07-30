#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ "$#" -lt 3 ]; then
  echo "Usage: $0 <generator> <output-directory> [additional generator arguments...]" >&2
  exit 2
fi

GENERATOR="$1"
OUTPUT_DIR="$2"
shift 2

if [ -n "${OPENAPI_GENERATOR_JAR:-}" ]; then
  java -jar "${OPENAPI_GENERATOR_JAR}" generate \
    -i "${ROOT_DIR}/spec/openapi.yaml" \
    -g "${GENERATOR}" \
    -o "${OUTPUT_DIR}" \
    "$@"
elif [ -n "${OPENAPI_GENERATOR_CLI:-}" ]; then
  "${OPENAPI_GENERATOR_CLI}" generate \
    -i "${ROOT_DIR}/spec/openapi.yaml" \
    -g "${GENERATOR}" \
    -o "${OUTPUT_DIR}" \
    "$@"
else
  relative_output="${OUTPUT_DIR#"${ROOT_DIR}/"}"
  docker run --rm \
    -v "${ROOT_DIR}:/local" \
    openapitools/openapi-generator-cli:v7.19.0 generate \
    -i /local/spec/openapi.yaml \
    -g "${GENERATOR}" \
    -o "/local/${relative_output}" \
    "$@"
fi
