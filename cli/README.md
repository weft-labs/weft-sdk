# Weft CLI

Use Weft from a shell or an autonomous agent. Application code should use the
separate [`@weft-labs/sdk`](../typescript/README.md) package.

```sh
export WEFT_API_KEY="your-buyer-api-key"
npx --package @weft-labs/cli weft me
npx --package @weft-labs/cli weft search "weather data API"
npx --package @weft-labs/cli weft fetch "https://merchant.example/data" \
  --max-cost-usd 0.05
npx --package @weft-labs/cli weft --help
```

The CLI prints one versioned JSON object per command. It accepts credentials
only through `WEFT_API_KEY` or `--api-key-stdin`; it rejects API keys in command
arguments so they do not leak into shell history or process listings.
`weft --help` and `weft <command> --help` return machine-readable JSON without
requiring authentication.

See [`docs/operation-inventory.md`](../docs/operation-inventory.md) for commands,
output envelopes, and stable exit codes.
