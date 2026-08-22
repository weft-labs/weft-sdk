# Weft CLI

Use Weft from a shell or an autonomous agent. Application code should use the
separate [`@weft-labs/sdk`](../typescript/README.md) package.

The CLI prints one versioned JSON object per command. It accepts credentials
through `--api-key-stdin`, `WEFT_API_KEY`, or its protected local credential
store; it rejects API keys in command arguments so they do not leak into shell
history or process listings.
`weft --help` and `weft <command> --help` return machine-readable JSON without
requiring authentication.

## With a buyer API key

```sh
export WEFT_API_KEY="your-buyer-api-key"
npx --package @weft-labs/cli weft me
npx --package @weft-labs/cli weft search "weather data API"
npx --package @weft-labs/cli weft fetch "https://merchant.example/data" \
  --max-cost-usd 0.05
npx --package @weft-labs/cli weft --help
```

## With no credential: agent bootstrap and human claim

An agent that has no Weft credential can start by itself. The flow needs the
human's email address and nothing else. There is no promotional balance, free
credit, or subsidy: paid fetch spends the human's own funded wallet, and the
wallet is funded by the human after the claim.

```sh
npm install -g @weft-labs/cli

# 1. Ask the human for an email address. Never ask for a password.
# 2. Create the temporary bootstrap and send the claim email.
weft bootstrap --email "human@example.com" \
  --agent-name "Research agent" \
  --reason "Find weather data"

# 3. Search immediately, before the human does anything.
weft search "weather data API"

# 4. Tell the human to open the claim email and approve the agent.
# 5. Poll at the interval the bootstrap response returned.
weft auth status

# 6. Auth status reports claimed. The same bearer is now durable until revoked.
weft me

# 7. Ask the human to fund the wallet before any paid fetch.
weft balance
```

The `npm install -g` command also installs the `weft-cli` Skill for supported
agent hosts already present on the machine. It does not create configuration
for absent hosts or replace a different existing Skill. Restart the agent host
after the first install. Package managers and install flags that block
dependency scripts also block Skill installation. Set
`WEFT_SKIP_SKILL_INSTALL=1` before installation to opt out. npm does not run
package uninstall hooks, so `npm rm -g @weft-labs/cli` leaves the Skill in
place; remove the host's `skills/weft-cli` directory if you also want to remove
the Skill.

`weft bootstrap` creates the bootstrap and writes the `wbt_` credential to a
local credential file created with mode `0600`. The response contains the
bootstrap capabilities and approval data. `weft auth status` updates those
fields after the server promotes the same bearer. It never requests an OAuth
exchange token, and normal output never prints secrets.

### The `wbt_` credential

- **Secret.** Never print, log, paste, commit, or email it. The CLI stores it
  for you.
- **Temporary before claim.** Its search-only claim window expires after 30
  minutes. Pre-claim capabilities are exactly `search`, `status`, and `cancel`.
- **Durable after claim.** Human approval promotes the same bearer to exactly
  `identity`, `search`, `balance`, `fetch`, `purchases`, `status`, and `revoke`.
  It has no post-claim expiry and remains valid until the human disconnects it.
- **Always refused elsewhere.** Seller, organization, API-key administration,
  dashboard-session, transfer, withdrawal, and MCP surfaces reject it before
  and after claim.

The human's password is never part of this flow. The agent does not choose,
receive, or store it. An existing user completes fresh authentication on the
claim page; possession of the email link alone cannot attach an agent to an
existing account.

### Bootstrap states

| Status | Meaning | Agent action |
| --- | --- | --- |
| `pending` | Waiting for the human. Search works. | Poll at the returned interval. |
| `claimed` | The human approved. The same bearer is durable with the fixed post-claim capabilities. | Continue with normal commands. |
| `rejected` | The human declined. Terminal. | Stop and start a new bootstrap. |
| `expired` | The 30-minute window closed unclaimed. Terminal. | Start a new bootstrap. |
| `revoked` | The human disconnected the credential. Terminal; all later authentication fails. | Start a new bootstrap only if the human requests it. |

`weft auth status` returns `claimed` after approval and keeps the same bearer.
It does not register an OAuth client or call `/oauth/token`.

`rejected`, `expired`, and `revoked` are terminal. Existing stored OAuth
credentials from older CLI releases remain supported and refresh normally;
new bootstrap flows do not create OAuth credentials.

See [`examples/agent-bootstrap.sh`](examples/agent-bootstrap.sh) for the same
sequence as a script, and
[`docs/operation-inventory.md`](../docs/operation-inventory.md) for commands,
output envelopes, and stable exit codes.
