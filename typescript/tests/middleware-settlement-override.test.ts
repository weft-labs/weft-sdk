import type {
  Network,
  PaymentRequirements,
  Price,
  SchemeNetworkServer,
} from "@x402/core/types";
import { SETTLEMENT_OVERRIDES_HEADER } from "@x402/core/server";
import { safeBase64Encode } from "@x402/core/utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { weftPaymentMiddlewareHono } from "../src/facilitator/middleware/hono";

/**
 * A route handler can settle less than the buyer authorised by writing a
 * `Settlement-Overrides` response header. `@x402/core` only ever reads that
 * header off the `transportContext` argument of `processSettlement`, so an
 * adapter that omits the argument silently charges the full signed amount —
 * which turns `upto` into `exact` and is invisible from the outside: the 402
 * challenge, the verify call and the response body all still look correct.
 *
 * These tests pin the forwarding, not the shape of the challenge.
 */

const FACILITATOR_URL = "http://facilitator.test";
const NETWORK = "eip155:84532";
const PAY_TO = "0x000000000000000000000000000000000000dEaD";
const ASSET = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

/** The buyer authorises this. */
const CEILING_ATOMIC = "44001";
/** The handler meters this much actually used. */
const METERED_USD = "$0.008800";
const METERED_ATOMIC = "8800";

const SUPPORTED_BODY = JSON.stringify({
  kinds: [{ x402Version: 2, scheme: "exact", network: NETWORK }],
});

/**
 * A minimal scheme server. Signature verification belongs to the facilitator,
 * which is stubbed here, so the scheme only has to price and pass through —
 * keeping the test independent of `@x402/evm` and of EVM specifics.
 *
 * `getAssetDecimals` is not optional in practice: core throws on a `$…`
 * settlement override when a scheme cannot supply decimals.
 */
class StubScheme implements SchemeNetworkServer {
  readonly scheme = "exact";
  readonly defaultAssetTransferMethod = "authorization";
  readonly paymentFlows = {
    authorization: {
      supported: ["authorization"] as const,
      default: "authorization" as const,
    },
  };

  /**
   * @param asset - Asset address, ignored; the stub only serves USDC
   * @returns USDC's decimal places
   */
  getAssetDecimals(): number {
    return 6;
  }

  /**
   * @param price - A `$…` price string
   * @returns The price converted to atomic units of the stub asset
   */
  async parsePrice(price: Price): Promise<{ amount: string; asset: string }> {
    const dollars = Number(String(price).replace("$", ""));
    return { amount: String(Math.round(dollars * 1e6)), asset: ASSET };
  }

  /**
   * @param paymentRequirements - Requirements with amount and asset resolved
   * @returns The requirements unchanged
   */
  async enhancePaymentRequirements(
    paymentRequirements: PaymentRequirements,
  ): Promise<PaymentRequirements> {
    return paymentRequirements;
  }
}

/** Bodies POSTed to the facilitator `/settle`, in order. */
let settleBodies: Record<string, unknown>[] = [];

/**
 * Stub the facilitator: `/supported` advertises exact, `/verify` approves, and
 * `/settle` records the body it was handed and reports success.
 */
function stubFacilitator(): void {
  settleBodies = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init?: RequestInit) => {
      const href = String(url);
      if (href.endsWith("/supported")) {
        return new Response(SUPPORTED_BODY, { status: 200 });
      }
      if (href.endsWith("/verify")) {
        return new Response(
          JSON.stringify({ isValid: true, payer: "0xpayer" }),
          { status: 200 },
        );
      }
      if (href.endsWith("/settle")) {
        settleBodies.push(JSON.parse(String(init?.body ?? "{}")));
        return new Response(
          JSON.stringify({
            success: true,
            transaction: "0xtx",
            network: NETWORK,
          }),
          { status: 200 },
        );
      }
      throw new Error(`unexpected fetch: ${href}`);
    }),
  );
}

const requirements = {
  scheme: "exact",
  network: NETWORK,
  amount: CEILING_ATOMIC,
  asset: ASSET,
  payTo: PAY_TO,
  maxTimeoutSeconds: 300,
  extra: { name: "USDC", version: "2" },
};

/** A payment header the buyer would send after signing the ceiling. */
function paymentHeader(): string {
  return safeBase64Encode(
    JSON.stringify({
      x402Version: 2,
      accepted: requirements,
      payload: {
        signature: `0x${"ab".repeat(65)}`,
        authorization: {
          from: "0x1111111111111111111111111111111111111111",
          to: PAY_TO,
          value: CEILING_ATOMIC,
          validAfter: "0",
          validBefore: String(Math.floor(Date.now() / 1000) + 3600),
          nonce: `0x${"cd".repeat(32)}`,
        },
      },
    }),
  );
}

/**
 * Drive one paid request through the Hono middleware, with a route handler
 * that optionally meters the charge down.
 *
 * The Hono context is hand-rolled rather than imported, matching the other
 * middleware tests and keeping `hono` out of the SDK's dev dependencies.
 *
 * @param setOverride - Whether the handler writes a settlement override
 * @returns The response the middleware left on the context
 */
async function drivePaidRequest(
  setOverride: boolean,
): Promise<Response | undefined> {
  const middleware = weftPaymentMiddlewareHono(
    {
      "GET /quote": {
        accepts: {
          scheme: "exact",
          network: NETWORK,
          payTo: PAY_TO,
          price: "$0.044001",
        },
      },
    },
    {
      apiKey: "ax_live_test",
      facilitator: { url: FACILITATOR_URL },
      name: "Test API",
      type: "api",
      schemes: [{ network: NETWORK, server: new StubScheme() }],
    },
  );

  const c = {
    req: {
      method: "GET",
      path: "/quote",
      url: "https://api.acme.test/quote",
      header: (name: string) =>
        name.toLowerCase() === "payment-signature"
          ? paymentHeader()
          : undefined,
      query: (() => ({})) as never,
      json: async () => undefined,
    },
    res: undefined as Response | undefined,
    header() {},
    html(body: string, status?: number) {
      return new Response(body, { status });
    },
    json(body: unknown, status?: number) {
      return new Response(JSON.stringify(body), { status });
    },
  };

  // Stands in for the protected route handler.
  await middleware(c, async () => {
    const headers = new Headers({ "content-type": "application/json" });
    if (setOverride) {
      headers.set(
        SETTLEMENT_OVERRIDES_HEADER,
        JSON.stringify({ amount: METERED_USD }),
      );
    }
    c.res = new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers,
    });
  });

  return c.res;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("settlement overrides reach the facilitator", () => {
  it("settles the metered amount when the handler sets the header", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(true);

    expect(response?.status).toBe(200);
    expect(settleBodies).toHaveLength(1);

    const settled = settleBodies[0] as {
      paymentRequirements?: { amount?: string };
    };
    // The buyer signed 44001; only what was used may be drawn.
    expect(settled.paymentRequirements?.amount).toBe(METERED_ATOMIC);
  });

  it("settles the full authorised amount when the handler sets no header", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(false);

    expect(response?.status).toBe(200);
    expect(settleBodies).toHaveLength(1);

    const settled = settleBodies[0] as {
      paymentRequirements?: { amount?: string };
    };
    expect(settled.paymentRequirements?.amount).toBe(CEILING_ATOMIC);
  });
});
