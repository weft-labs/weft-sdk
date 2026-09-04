#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/go"
TMP_DIR="${OUT_DIR}/.generated"

rm -rf "${TMP_DIR}"
mkdir -p "${TMP_DIR}"

"${ROOT_DIR}/scripts/run-openapi-generator.sh" \
  go \
  "${TMP_DIR}" \
  --additional-properties=packageName=generated,moduleName=github.com/weftlabs/weft-sdk/go/generated

rm -rf "${OUT_DIR}/generated" "${OUT_DIR}/docs"
mkdir -p "${OUT_DIR}/generated"

cp -R "${TMP_DIR}/"* "${OUT_DIR}/generated/"

# The generated client is a package in the public root Go module, not a
# separately versioned module. Keeping the generator's nested go.mod here
# causes `go test ./...` at go/ to silently skip the generated package.
rm -f \
  "${OUT_DIR}/generated/go.mod" \
  "${OUT_DIR}/generated/go.sum" \
  "${OUT_DIR}/generated/git_push.sh"
rm -rf "${OUT_DIR}/generated/test"

# Extract docs to go/docs/ (consistent with TypeScript, Python, Ruby)
if [ -d "${OUT_DIR}/generated/docs" ]; then
  cp -R "${OUT_DIR}/generated/docs" "${OUT_DIR}/docs"
fi

# Fix placeholder import path in generated docs and source
find "${OUT_DIR}/generated" "${OUT_DIR}/docs" -type f \( -name '*.go' -o -name '*.md' \) \
  -exec sed -i.bak 's|github.com/GIT_USER_ID/GIT_REPO_ID|github.com/weftlabs/weft-sdk/go/generated|g' {} +
find "${OUT_DIR}/generated" "${OUT_DIR}/docs" -name '*.bak' -delete

"${ROOT_DIR}/scripts/strip-generated-whitespace.sh" \
  "${OUT_DIR}/generated" "${OUT_DIR}/docs"

# Old generated snapshots predate gofmt. Format only tracked, staged, or new
# files whose generated content changed. This keeps new contract work
# reproducible without a repository-wide formatting rewrite.
while IFS= read -r -d '' path; do
  gofmt -w "${ROOT_DIR}/${path}"
done < <(
  git -C "${ROOT_DIR}" diff --name-only --diff-filter=AM -z -- 'go/generated/*.go'
  git -C "${ROOT_DIR}" diff --cached --name-only --diff-filter=AM -z -- 'go/generated/*.go'
  git -C "${ROOT_DIR}" ls-files --others --exclude-standard -z -- 'go/generated/*.go'
)
