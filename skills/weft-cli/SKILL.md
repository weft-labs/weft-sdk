---
name: weft-cli
description: Use the Weft CLI to search the agent web, pay x402-protected endpoints, or bootstrap Weft when no credential exists. Drives `@weft-labs/cli`: create a temporary search-only identity, hand the account to the human by email, promote the same bearer after approval, then read balance and buy within the user's spending policy. This is the shell-based CLI surface, not the Claude plugin's `weft` MCP Skill or the hosted `weft-mcp` usage Skill.
---

# Weft CLI

Weft gives agents a wallet that pays x402-protected endpoints from inside an
agent host. The `weft` CLI is the agent surface: it prints one versioned JSON
object per command, so parse the output instead of reading prose.

Two starting points:

- **The user already has a buyer API key** (`wk_...`). Set `WEFT_API_KEY` and go
  to [Paid usage](#paid-usage).
- **No credential exists.** Run the bootstrap lifecycle below. It costs nothing,
  needs no card, and needs only the human's email address.

There is no promotional balance, free credit, or subsidy at any point. Every
paid action spends the human's own funded wallet.

## Install the CLI

```sh
npm install -g @weft-labs/cli
```

The `npm install -g` command installs this `weft-cli` Skill only for agent hosts
already present on the machine. It never creates a new host configuration or
replaces a different existing Skill. Restart the agent host after the first
install. Package managers and install flags that block dependency scripts also
block Skill installation. Set `WEFT_SKIP_SKILL_INSTALL=1` before installation
when the Skill must not be installed on that machine.

Zero-install equivalent, usable in any of the commands below:

```sh
npx --package @weft-labs/cli weft --help
```

The zero-install form runs the CLI but does not guarantee persistent Skill
installation.

`weft --help` and `weft <command> --help` return machine-readable JSON and need
no credential. Read them before guessing a flag.

## Bootstrap lifecycle (no credential yet)

Follow these seven steps in order. Do not skip ahead; each step depends on the
previous one.

### 1. Ask the human for an email address

Ask for **the email address only**. Never ask for, accept, generate, or store
the human's password. Weft never sends the password through the agent, and the
agent never chooses one. If the user offers a password, refuse it and continue
with the email address.

### 2. Create the bootstrap

```sh
weft bootstrap --email "human@example.com" \
  --agent-name "Research agent" \
  --reason "Find weather data"
```

This creates a temporary bootstrap identity, emails a claim link to that address
only, and stores the temporary credential in a local credential file that only
the current user can read. The response reports the bootstrap `id`, `status`,
`capabilities`, expiry, and `approval` details. Use that approval interval for
status polling.

The credential is a `wbt_` bearer token. Treat it as a secret:

- It is **secret** — never print it, log it, paste it into chat, put it in a
  commit, or send it to the human. The CLI keeps it in its credential file for
  you.
- It is **temporary before claim**. Its search-only claim window expires after
  30 minutes. Pre-claim capabilities are exactly `search`, `status`, and
  `cancel`.
- After approval, the same bearer is durable until revoked. Its capabilities
  become exactly `identity`, `search`, `balance`, `fetch`, `purchases`,
  `status`, and `revoke`.
- Seller, organization, API-key administration, dashboard-session, transfer,
  withdrawal, and MCP surfaces refuse it before and after claim.

### 3. Search while the bootstrap is pending

```sh
weft search "weather data API"
```

Search is free and works immediately on the temporary credential, before the
human does anything. Use it to show the user real results while they claim the
account.

### 4. Tell the human to open the claim email

Tell them, in your own words: an email from Weft is on the way to the address
they gave; opening its link is the only way to finish setup. On that page the
human creates a Weft account or signs in to the one they already have, sees the
agent name, host, reason, and the searches already run, and then approves or
rejects. An existing user must sign in freshly — holding the email link is not
enough to attach the agent to their account.

Show the user code from the bootstrap response so the human can confirm they
are approving this session and not another one. The tokenized claim link exists
only in the email; the CLI does not print it.

### 5. Poll the status at the server's interval

```sh
weft auth status
```

Poll at the interval the bootstrap response returned. Do not poll faster: a
tighter loop is rate-limited and does not make the human read email sooner. If
the server tells you to slow down, obey it.

Act on the status:

| Status | What it means | What to do |
|---|---|---|
| `pending` | Waiting for the human. Search still works. | Keep searching if useful, keep polling at the given interval. |
| `claimed` | The human approved. The same bearer is durable with the fixed post-claim capabilities. | Continue with ordinary commands. |
| `rejected` | The human declined. Terminal. | Stop. Do not create a second bootstrap for the same request; ask the user what they want instead. |
| `expired` | The 30-minute window passed without a claim. Terminal. | Tell the user the link timed out and offer to start a new bootstrap. |
| `revoked` | The human disconnected the credential. Terminal; all later authentication fails. | Start a new bootstrap only if the human requests it. |

These are server lifecycle states. `weft auth status` returns server-side status
directly; after `claimed`, the CLI keeps using the same bearer and does not call
an OAuth token endpoint.

If the user abandons the setup, do nothing: an unclaimed bootstrap expires by
itself after 30 minutes. Cancelling early is also a bootstrap capability; check
`weft --help` for its exact spelling before using it.

`rejected`, `expired`, and `revoked` are terminal. A `pending` bootstrap can
search; a `claimed` credential can use only its fixed durable capabilities.

### 6. Verify normal auth and ask for wallet funding

After `weft auth status` reports `claimed`, continue with normal authenticated
commands. The same bearer now resolves to the human's account:

Verify with:

```sh
weft me
```

### 7. Ask the human to fund the wallet before any paid fetch

Claiming the account starts normal buyer wallet provisioning; it does not put
money in it. A new wallet holds nothing, so a paid fetch will refuse until the
human funds it. Say so plainly and let them fund it from the Weft dashboard,
then continue.

## Paid usage

Once an authenticated credential exists, from the claimed bootstrap flow above
or an existing `WEFT_API_KEY`:

```sh
weft balance
weft search "weather data API" --max-results 5
weft fetch "https://merchant.example/data" --max-cost-usd 0.05
weft purchases
```

- Run `weft balance` before proposing any paid action; abort if the wallet
  balance is below the expected cost.
- `weft search` is free.
- `weft fetch` always requires `--max-cost-usd`. Set a tight ceiling; never omit
  it. If the returned cost looks wrong for a very new merchant with no
  settlement history, stop and flag it to the user before spending again.

## Credentials

The CLI first uses an explicit `--api-key-stdin` credential, then
`WEFT_API_KEY`, then its stored bootstrap or OAuth credential. It refreshes an
expiring OAuth credential without printing it. It rejects an API key passed as
a command argument so keys never reach shell history or a process listing.
Never echo any credential — `wbt_`, `wk_`, or an OAuth token — into your output.
Existing stored OAuth credentials remain compatible, but a new bootstrap never
registers an OAuth client or exchanges a device code.

## Errors

Every failure is one JSON object on stderr with a stable `error.code` and a
stable exit code: `2` invalid usage, `3` missing authentication or HTTP
401/403, `4` other 4xx API or policy rejection, `5` 5xx, network, or internal
failure.

- A refusal on `balance`, `fetch`, or any wallet, seller, or organization
  surface while the bootstrap is still `pending` is the contract working, not a
  bug. Do not retry it; finish the claim first.
- `POLICY_VIOLATION_*` means the user exceeded their spending policy. Surface
  the `dashboard_url` so they can adjust it, and do not retry silently.
- `SETTLEMENT_FAILED` means the transaction is in `locked` status — surface it
  and stop.

## Hosts without a shell

The hosted Weft MCP server (`https://weft.network/mcp`) exposes `weft_balance`,
`weft_search`, and `weft_fetch` for hosts that cannot run a command line, such
as ChatGPT. It requires an account the human has already created and signed in
to; it cannot bootstrap a new one. Where a shell exists, use the CLI.

In Claude Code, prefer the official Weft plugin. If that plugin is installed,
do not add a second manual MCP connection. Without the plugin, add the hosted
server directly:

```sh
claude mcp add --transport http weft https://weft.network/mcp
```

The server URL is a **positional** argument. `claude mcp add` has no `--url`
flag and no `--remote` flag — check `claude mcp add --help` before rewriting
this command.
