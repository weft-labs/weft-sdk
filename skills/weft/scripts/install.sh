#!/usr/bin/env bash
# Bootstrap the `weft` CLI — the default agent-facing surface (Skill -> CLI).
# See directives/agent-developer-experience.md. MCP is the narrow path only
# (no-shell hosts like ChatGPT); see the bottom of this script.
set -euo pipefail

if command -v weft >/dev/null 2>&1; then
  echo "weft CLI already installed: $(weft --version 2>/dev/null || echo present)"
  exit 0
fi

echo "Installing the Weft CLI (@weft-labs/cli)…"

if command -v npm >/dev/null 2>&1; then
  npm i -g @weft-labs/cli
  echo "Done. Run 'weft login' (browser OAuth) or set WEFT_API_KEY for scripting."
else
  cat <<'EOF'
npm not found. The Weft CLI needs Node.js (>=18).

Zero-install (pinned) alternative — works wherever npx is available:

  npx -y @weft-labs/cli@latest balance

Or install Node, then re-run this script.
EOF
  exit 1
fi

cat <<'EOF'

Next:
  weft login            # interactive browser OAuth (or: weft login --api-key wk_…)
  weft balance
  weft search "…" --limit 5
  weft fetch <url> --max-cost-usd 0.01

Need the hosted remote MCP instead? Only for hosts without a shell:
  - Claude Code:  claude mcp add weft --remote https://weft.network/mcp
  - ChatGPT:      Settings -> Connectors -> Add custom connector ->
                  https://weft.network/mcp (Developer Mode required)
EOF
