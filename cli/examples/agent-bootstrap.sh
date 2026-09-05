#!/usr/bin/env sh
# Agent bootstrap and human claim, end to end, with no Weft credential.
#
# The agent needs the human's email address and nothing else.
# It never asks for, receives, or stores the human's password.
# No promotional balance, free credit, or subsidy exists at any point here:
# a paid fetch spends the human's own funded wallet.
#
# Every command prints one JSON envelope. Parse it; never echo a credential.
set -eu

: "${WEFT_CLAIM_EMAIL:?Set WEFT_CLAIM_EMAIL to the email address of the human}"
AGENT_NAME="${WEFT_AGENT_NAME:-Example agent}"
REASON="${WEFT_BOOTSTRAP_REASON:-Find weather data}"

# `weft --help` needs no credential and lists every implemented command.
if ! weft --help | grep -q '"name":"bootstrap"'; then
  echo "This @weftlabs/cli build has no bootstrap command yet; run 'weft --help'." >&2
  exit 0
fi

# 1. The email address is the only thing the agent asks the human for.
# 2. Create the temporary bootstrap. This emails the claim link to that address
#    and stores the wbt_ credential in a mode-0600 local credential file.
bootstrap="$(weft bootstrap \
  --email "$WEFT_CLAIM_EMAIL" \
  --agent-name "$AGENT_NAME" \
  --reason "$REASON")"
printf '%s\n' "$bootstrap"
POLL_INTERVAL="$(printf '%s' "$bootstrap" | node -e \
   'let s=""; process.stdin.on("data", d => s += d).on("end", () => process.stdout.write(String(JSON.parse(s).data.approval.interval)))')"

# 3. Search immediately. The temporary credential is search-only and expires
#    30 minutes after creation.
weft search "weather data API"

# 4. Tell the human to open the claim email and approve this agent. Show them
#    the user code from the bootstrap envelope above; the claim link is only in
#    the email.
# 5. Poll at the interval the bootstrap response returned. A claimed response
#    means the same bearer is durable with its fixed post-claim capabilities.
while :; do
  sleep "$POLL_INTERVAL"
  auth="$(weft auth status)"
  printf '%s\n' "$auth"
  status="$(printf '%s' "$auth" | node -e \
    'let s=""; process.stdin.on("data", d => s += d).on("end", () => process.stdout.write(JSON.parse(s).data.status))')"
  case "$status" in
    pending) ;;
    claimed) break ;;
    rejected|expired|revoked)
      echo "Bootstrap ended with status: $status" >&2
      exit 1
      ;;
    *)
      echo "Unexpected bootstrap status: $status" >&2
      exit 1
      ;;
  esac
done

# 6. After approval the CLI keeps the same bearer. It does not register an OAuth
#    client or exchange a device code. Ordinary commands now use its durable
#    identity, search, balance, fetch, purchases, status, and revoke capabilities.
weft me

# 7. Claiming provisions an empty wallet. Ask the human to fund it before any
#    paid fetch.
weft balance
