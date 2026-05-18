#!/usr/bin/env bash
set -euo pipefail
echo "Installing Weft MCP into Claude Code…"
claude mcp add weft --remote https://weft.network/mcp
echo "Done. Open Claude Code; on first use the OAuth flow will open in your browser."
