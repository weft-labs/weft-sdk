import { Hono } from "hono";
import { ExactEvmScheme } from "@x402/evm/exact/server";
import { weftPaymentMiddlewareHono } from "@weftlabs/sdk/facilitator/middleware";

const apiKey = process.env.WEFT_SELLER_API_KEY;
if (!apiKey) {
  throw new Error("Set WEFT_SELLER_API_KEY to a seller ax_live_* API key");
}

const payTo = process.env.WEFT_PAY_TO;
if (!payTo) {
  throw new Error("Set WEFT_PAY_TO to the wallet address that gets paid");
}

const network = process.env.WEFT_NETWORK ?? "eip155:8453";

const app = new Hono();

app.use(
  weftPaymentMiddlewareHono(
    {
      "GET /v1/quote": {
        accepts: { scheme: "exact", network, payTo, price: "$0.01" },
      },
    },
    {
      apiKey,
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
      schemes: [{ network, server: new ExactEvmScheme() }],
    },
  ),
);

app.get("/v1/quote", (c) =>
  c.json({ symbol: "ACME", price: "12.34", currency: "USD" }),
);

export default app;
