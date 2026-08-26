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

# 6. After approval the CLI exchanges OAuth device tokens for the temporary
#    credential, and normal authenticated commands work again.
weft me

# 7. Ask the human to fund the wallet before any paid fetch.
weft balance
```

The `npm install -g` command also installs the `weft` Skill (`SKILL.md` plus
`rules/cli.md`, vendored from
[weft-labs/skills](https://github.com/weft-labs/skills)) for supported agent
hosts already present on the machine. It does not create configuration for
absent hosts or replace a different existing Skill. If an earlier version of
this package installed the retired `weft-cli` Skill, the installer removes
that copy after the `weft` Skill is in place; a hand-edited or user-owned
`weft-cli` copy stays untouched. Restart the agent host after the first
install. Package managers and install flags that block dependency scripts also
block Skill installation. Set `WEFT_SKIP_SKILL_INSTALL=1` before installation
to opt out. npm does not run package uninstall hooks, so
`npm rm -g @weft-labs/cli` leaves the Skill in place; remove the host's
`skills/weft` directory if you also want to remove the Skill.

`weft bootstrap` registers its OAuth client, creates the bootstrap, and writes
the temporary and device credentials to a local credential file created with
mode `0600`. After approval, the stored OAuth credential replaces the temporary
credential and refreshes before expiry. Normal output never prints a secret.

### The temporary `wbt_` credential

- **Secret.** Never print, log, paste, commit, or email it. The CLI stores it
  for you.
- **Temporary.** It expires 30 minutes after creation and has no refresh.
- **Search-only.** Its capabilities are `search`, `status`, and `cancel`.
  Balance, paid fetch, wallet, transfer, withdrawal, seller, and organization
  mutation surfaces all refuse it. A refusal there is the contract, not a bug.

The human's password is never part of this flow. The agent does not choose,
receive, or store it. An existing user completes fresh authentication on the
claim page; possession of the email link alone cannot attach an agent to an
existing account.

### Bootstrap states

| Status | Meaning | Agent action |
| --- | --- | --- |
| `pending` | Waiting for the human. Search works. | Keep polling at the returned interval. |
| `claimed` | The human approved. Search continues until OAuth delivery succeeds. | Complete the OAuth device exchange. |
| `rejected` | The human declined. Terminal. | Stop; do not re-create the same bootstrap. |
| `expired` | The 30-minute window closed unclaimed. Terminal. | Offer to start a new bootstrap. |
| `consumed` | OAuth tokens were delivered. Terminal. | Use the OAuth credential. |

These are server lifecycle states. `weft auth status` handles `claimed` by
performing the OAuth exchange and emits `consumed` after successful delivery;
it does not emit an intermediate `claimed` result.

`rejected`, `expired`, and `consumed` are terminal. A `pending` or `claimed`
bootstrap can search; `claimed` also keeps status and OAuth token exchange.

See [`examples/agent-bootstrap.sh`](examples/agent-bootstrap.sh) for the same
sequence as a script, and
[`docs/operation-inventory.md`](../docs/operation-inventory.md) for commands,
output envelopes, and stable exit codes.
