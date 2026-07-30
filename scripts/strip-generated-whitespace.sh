#!/usr/bin/env bash

set -euo pipefail
export LC_ALL=C

for target in "$@"; do
  [ -e "$target" ] || continue
  find "$target" -type f -exec sed -i.bak -E 's/[[:space:]]+$//' {} +
  find "$target" -type f -name '*.bak' -delete
  find "$target" -type f -exec perl -0pi -e 's/\n+\z/\n/' {} +
done
