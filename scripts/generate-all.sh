#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

"${ROOT_DIR}/scripts/generate-typescript.sh"
"${ROOT_DIR}/scripts/generate-python.sh"
"${ROOT_DIR}/scripts/generate-ruby.sh"
"${ROOT_DIR}/scripts/generate-go.sh"

"${ROOT_DIR}/scripts/test-sdk.sh"
