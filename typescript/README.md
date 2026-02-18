# @weft/sdk (TypeScript)

Unified Weft SDK for the Weft API and x402 Facilitator.

## Install

```bash
npm install @weft/sdk @x402/core
```

## Weft API (generated)

```typescript
import { Configuration, PaymentsApi } from "@weft/sdk";

const config = new Configuration({
  basePath: "https://staging.weft.network",
  headers: { Authorization: "Bearer ax_live_..." },
});

const payments = new PaymentsApi(config);
const list = await payments.listPayments();
```

## Facilitator (hand-crafted)

```typescript
import { createFacilitatorClient, getFeeInfo } from "@weft/sdk/facilitator";

const facilitator = createFacilitatorClient();
const fee = await getFeeInfo();
```

Default facilitator URL: `https://x402.weft.network` (override with config or
`X402_FACILITATOR_URL`).
