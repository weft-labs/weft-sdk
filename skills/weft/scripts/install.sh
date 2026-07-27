#!/usr/bin/env bash
set -euo pipefail
echo "Installing Weft MCP into Claude Code…"
# The server URL is a POSITIONAL argument. `claude mcp add` has no `--remote`
# flag and no `--url` flag; both forms this script and the Weft dashboard
# previously shipped failed with `error: unknown option`. Verify against
# `claude mcp add --help` before changing this line.
claude mcp add --transport http weft https://weft.network/mcp
echo "Done. Open Claude Code; on first use the OAuth flow will open in your browser."
