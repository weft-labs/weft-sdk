---
name: weft
description: Search the agent web and pay x402-protected endpoints with a Weft Account, and start from zero when the user has no Weft credential yet. Trigger when the user asks to find paid APIs, agents, or data resources, asks to retrieve or buy from a URL that may require payment, or asks to set up Weft. Drives the `@weft-labs/cli` command line: bootstrap a temporary search-only identity, hand the account to the human by email, resume through OAuth, then read balance and buy within the user's spending policy.
---

# Weft

Weft Account is a self-custodial wallet that pays x402-protected endpoints from
inside an agent host. The `weft` CLI is the agent surface: it prints one
versioned JSON object per command, so parse the output instead of reading prose.

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

Zero-install equivalent, usable in any of the commands below:

```sh
npx --package @weft-labs/cli weft --help
```

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
the current user can read. The response reports the bootstrap `id`, `status`
(`pending`), the granted `capabilities`, the expiry, and the approval details
the human needs.

The temporary credential is a `wbt_` bearer token. Treat it as a secret:

- It is **secret** — never print it, log it, paste it into chat, put it in a
  commit, or send it to the human. The CLI keeps it in its credential file for
  you.
- It is **temporary** — it expires 30 minutes after creation and cannot be
  refreshed.
- It is **search-only** — its capabilities are `search`, `status`, and `cancel`.
  It cannot read balance, run a paid fetch, touch a wallet, transfer or withdraw
  funds, or change a seller or organization. Those calls refuse, and retrying
  will not change the answer.

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
agent name, host, reason, requested scopes, and the searches already run, and
then approves or rejects. An existing user must sign in freshly — holding the
email link is not enough to attach the agent to their account.

Show the verification URI and the user code from the bootstrap response so the
human can confirm they are approving this session and not another one.

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
| `claimed` | The human approved. Temporary search access ends here. | Finish the OAuth handoff in step 6. |
| `rejected` | The human declined. Terminal. | Stop. Do not create a second bootstrap for the same request; ask the user what they want instead. |
| `expired` | The 30-minute window passed without a claim. Terminal. | Tell the user the link timed out and offer to start a new bootstrap. |
| `consumed` | The OAuth tokens were delivered. The temporary credential is dead. Terminal. | Use the OAuth credential; the `wbt_` token is finished. |

If the user abandons the setup, do nothing: an unclaimed bootstrap expires by
itself after 30 minutes. Cancelling early is also a bootstrap capability; check
`weft --help` for its exact spelling before using it.

`rejected`, `expired`, and `consumed` are terminal — nothing you run brings the
bootstrap back. Only a `pending` bootstrap can search. A `claimed` bootstrap can
still report status and complete the OAuth exchange, but its `wbt_` token can no
longer search.

### 6. Resume through OAuth

After `claimed`, the CLI completes OAuth device authorization and replaces the
temporary credential with the scoped tokens the human approved. The status moves
to `consumed` once the tokens are delivered. From here the same session
continues with ordinary authenticated commands — no new key is pasted, and no
permanent `wk_` key travels through the agent.

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

Once an authenticated credential exists — from the OAuth handoff above or from
an existing `WEFT_API_KEY`:

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

The CLI accepts credentials only through `WEFT_API_KEY` or `--api-key-stdin`. It
rejects an API key passed as a command argument so keys never reach shell
history or a process listing. Never echo any credential — `wbt_`, `wk_`, or an
OAuth token — into your output.

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

```sh
claude mcp add --transport http weft https://weft.network/mcp
```

The server URL is a **positional** argument. `claude mcp add` has no `--url`
flag and no `--remote` flag — check `claude mcp add --help` before rewriting
this command.
