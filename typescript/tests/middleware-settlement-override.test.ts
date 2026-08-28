import type {
  Network,
  PaymentFlowName,
  PaymentPayload,
  PaymentRequirements,
  Price,
  ResourceServerExtension,
  SchemeNetworkServer,
} from "@x402/core/types";
import {
  type CompletedSettlement,
  type HTTPTransportContext,
  type PaymentCancellationDispatcher,
  SETTLEMENT_OVERRIDES_HEADER,
  type SettleContext,
  x402ResourceServer,
} from "@x402/core/server";
import { safeBase64Encode } from "@x402/core/utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { weftPaymentMiddleware } from "../src/facilitator/middleware/express";
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
const EXTENSION_KEY = "acme.metering";
const EXTENSION_DECLARATION = { info: { mode: "usage" } };

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
  readonly paymentFlows;

  constructor(defaultFlow: PaymentFlowName = "authorization") {
    this.paymentFlows = {
      authorization: { supported: [defaultFlow], default: defaultFlow },
    };
  }

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

  async enrichSettlementPayload(context: SettleContext): Promise<void> {
    settlementTransportContexts.push(
      context.transportContext as HTTPTransportContext,
    );
  }
}

/** Bodies POSTed to the facilitator `/settle`, in order. */
let settleBodies: Record<string, unknown>[] = [];
let verifyCalls = 0;
let settlementTransportContexts: HTTPTransportContext[] = [];

/**
 * Stub the facilitator: `/supported` advertises exact, `/verify` approves, and
 * `/settle` records the body it was handed and reports the configured result.
 */
function stubFacilitator(
  settleResult: boolean | "malformed" | "unavailable" = true,
  verifyValid = true,
): void {
  settleBodies = [];
  verifyCalls = 0;
  settlementTransportContexts = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init?: RequestInit) => {
      const href = String(url);
      if (href.endsWith("/supported")) {
        return new Response(SUPPORTED_BODY, { status: 200 });
      }
      if (href.endsWith("/verify")) {
        verifyCalls += 1;
        return new Response(
          JSON.stringify({
            isValid: verifyValid,
            payer: "0xpayer",
            ...(!verifyValid && { invalidReason: "nonce_already_used" }),
          }),
          { status: 200 },
        );
      }
      if (href.endsWith("/settle")) {
        settleBodies.push(JSON.parse(String(init?.body ?? "{}")));
        if (settleResult === "unavailable") {
          return new Response(
            JSON.stringify({
              error: "temporarily_unavailable",
              message: "maintenance",
            }),
            { status: 503, headers: { "retry-after": "7" } },
          );
        }
        return new Response(
          JSON.stringify(
            settleResult === "malformed"
              ? { success: true, network: NETWORK }
              : settleResult
                ? {
                    success: true,
                    transaction: "0xtx",
                    network: NETWORK,
                  }
                : {
                    success: false,
                    errorReason: "insufficient_funds",
                    transaction: "",
                    network: NETWORK,
                  },
          ),
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

function routes(customFailure = false) {
  return {
    "GET /quote": {
      accepts: {
        scheme: "exact",
        network: NETWORK,
        payTo: PAY_TO,
        price: "$0.044001",
      },
      extensions: {
        [EXTENSION_KEY]: () => EXTENSION_DECLARATION,
      },
      ...(customFailure && {
        settlementFailedResponseBody: () => ({
          contentType: "text/html; charset=utf-8",
          body: "<h1>Try another wallet</h1>",
        }),
      }),
    },
  };
}

interface ReplayResult {
  paymentPayload: PaymentPayload;
  paymentRequirements: PaymentRequirements;
  declaredExtensions?: Record<string, unknown>;
  beforeHandlerSettlement?: CompletedSettlement;
  cancellationDispatcher?: PaymentCancellationDispatcher;
}

type ResumeVerifiedPayment = () =>
  ReplayResult | undefined | Promise<ReplayResult | undefined>;

function config(
  upfront = false,
  resumeVerifiedPayment?: ResumeVerifiedPayment,
) {
  return {
    apiKey: "ax_live_test",
    facilitator: { url: FACILITATOR_URL },
    name: "Test API",
    type: "api" as const,
    resumeVerifiedPayment,
    schemes: [
      {
        network: NETWORK,
        server: new StubScheme(upfront ? "upfront" : "authorization"),
      },
    ],
  };
}

/** A payment header the buyer would send after signing the ceiling. */
function paymentPayload(upfront = false): PaymentPayload {
  return {
    x402Version: 2,
    accepted: {
      ...requirements,
      ...(upfront && {
        extra: { ...requirements.extra, paymentFlow: "upfront" },
      }),
    },
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
  };
}

function paymentHeader(upfront = false): string {
  return safeBase64Encode(JSON.stringify(paymentPayload(upfront)));
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
  options: {
    upfront?: boolean;
    handlerStatus?: number;
    customFailure?: boolean;
    immutableResponse?: boolean;
    resumeVerifiedPayment?: ResumeVerifiedPayment;
    handlerRuns?: { count: number };
    body?: string;
    cacheControl?: string;
  } = {},
): Promise<Response | undefined> {
  const middleware = weftPaymentMiddlewareHono(
    routes(options.customFailure),
    config(options.upfront, options.resumeVerifiedPayment),
  );

  const c = {
    req: {
      method: "GET",
      path: "/quote",
      url: "https://api.acme.test/quote",
      header: (name: string) =>
        name.toLowerCase() === "payment-signature"
          ? paymentHeader(options.upfront)
          : undefined,
      query: (() => ({})) as never,
      json: async () => undefined,
    },
    res: undefined as Response | undefined,
    responseHeaders: new Headers(),
    header(name: string, value: string) {
      this.responseHeaders.set(name, value);
    },
    html(body: string, status?: number) {
      return new Response(body, { status, headers: this.responseHeaders });
    },
    json(body: unknown, status?: number) {
      return new Response(JSON.stringify(body), {
        status,
        headers: this.responseHeaders,
      });
    },
  };

  // Stands in for the protected route handler.
  await middleware(c, async () => {
    if (options.handlerRuns) options.handlerRuns.count += 1;
    const headers = new Headers({ "content-type": "application/json" });
    if (options.cacheControl)
      headers.set("cache-control", options.cacheControl);
    if (setOverride) {
      headers.set(
        SETTLEMENT_OVERRIDES_HEADER,
        JSON.stringify({ amount: METERED_USD }),
      );
    }
    if (options.immutableResponse) {
      c.res = Response.redirect("https://api.acme.test/complete");
      Object.defineProperty(c.res, "status", {
        value: options.handlerStatus ?? 200,
      });
    } else {
      c.res = new Response(options.body ?? JSON.stringify({ ok: true }), {
        status: options.handlerStatus ?? 200,
        headers,
      });
    }
  });

  return c.res;
}

async function driveExpressRequest(
  setOverride: boolean,
  options: {
    upfront?: boolean;
    handlerStatus?: number;
    customFailure?: boolean;
    errors?: unknown[];
    writeHeadStatus?: number;
    writeHeadHeaders?: Record<string, string>;
    resumeVerifiedPayment?: ResumeVerifiedPayment;
    handlerRuns?: { count: number };
    chunks?: unknown[];
    cacheControl?: string;
  } = {},
): Promise<{
  status: number;
  headers: Record<string, string>;
  body: unknown;
  emittedChunks: unknown[];
}> {
  const middleware = weftPaymentMiddleware(
    routes(options.customFailure),
    config(options.upfront, options.resumeVerifiedPayment),
  );
  const headers: Record<string, string> = {};
  let body: unknown;
  const emittedChunks: unknown[] = [];
  const req = {
    method: "GET",
    path: "/quote",
    protocol: "https",
    headers: {
      host: "api.acme.test",
      "payment-signature": paymentHeader(options.upfront),
    },
    query: {},
    header(name: string) {
      return this.headers[name.toLowerCase() as keyof typeof this.headers];
    },
  };
  const res = {
    statusCode: 200,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    setHeader(name: string, value: string) {
      headers[name.toLowerCase()] = value;
      return res;
    },
    getHeaders: () => headers,
    removeHeader(name: string) {
      delete headers[name.toLowerCase()];
    },
    send(value: unknown) {
      body = value;
      return res;
    },
    json(value: unknown) {
      body = value;
      return res;
    },
    writeHead(
      statusCode: number,
      statusMessageOrHeaders?: string | Record<string, string>,
      maybeHeaders?: Record<string, string>,
    ) {
      res.statusCode = statusCode;
      const writeHeadHeaders =
        typeof statusMessageOrHeaders === "string"
          ? maybeHeaders
          : statusMessageOrHeaders;
      for (const [name, value] of Object.entries(writeHeadHeaders ?? {})) {
        res.setHeader(name, value);
      }
      return res;
    },
    write(chunk: unknown) {
      emittedChunks.push(chunk);
      return true;
    },
    end(chunk?: unknown) {
      if (chunk !== undefined) emittedChunks.push(chunk);
      return res;
    },
    flushHeaders: () => undefined,
  };

  await middleware(req, res, (error?: unknown) => {
    if (error) {
      options.errors?.push(error);
      return;
    }
    if (options.handlerRuns) options.handlerRuns.count += 1;
    if (options.writeHeadStatus !== undefined) {
      res.writeHead(options.writeHeadStatus, options.writeHeadHeaders);
    } else {
      res.statusCode = options.handlerStatus ?? 200;
    }
    if (setOverride) {
      res.setHeader(
        SETTLEMENT_OVERRIDES_HEADER,
        JSON.stringify({ amount: METERED_USD }),
      );
    }
    if (options.cacheControl) {
      res.setHeader("cache-control", options.cacheControl);
    }
    for (const chunk of options.chunks?.slice(0, -1) ?? []) res.write(chunk);
    const finalChunk = options.chunks?.at(-1);
    res.end(finalChunk);
  });

  return { status: res.statusCode, headers, body, emittedChunks };
}

function captureSettlementDeclarations(): unknown[] {
  const declarations: unknown[] = [];
  const registerExtension = x402ResourceServer.prototype.registerExtension;
  vi.spyOn(
    x402ResourceServer.prototype,
    "registerExtension",
  ).mockImplementation(function (
    this: x402ResourceServer,
    extension: ResourceServerExtension,
  ) {
    if (extension.key === EXTENSION_KEY) {
      extension.hooks = {
        ...extension.hooks,
        onBeforeSettle: async (declaration) => {
          declarations.push(declaration);
        },
      };
    }
    return registerExtension.call(this, extension);
  });
  return declarations;
}

function captureCancellations(): unknown[] {
  const cancellations: unknown[] = [];
  const registerExtension = x402ResourceServer.prototype.registerExtension;
  vi.spyOn(
    x402ResourceServer.prototype,
    "registerExtension",
  ).mockImplementation(function (
    this: x402ResourceServer,
    extension: ResourceServerExtension,
  ) {
    if (extension.key === EXTENSION_KEY) {
      extension.hooks = {
        ...extension.hooks,
        onVerifiedPaymentCanceled: async (_declaration, context) => {
          cancellations.push(context);
        },
      };
    }
    return registerExtension.call(this, extension);
  });
  return cancellations;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
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

  it("settles the metered amount through Express", async () => {
    stubFacilitator();

    const response = await driveExpressRequest(true);

    expect(response.status).toBe(200);
    expect(settleBodies[0]?.paymentRequirements).toMatchObject({
      amount: METERED_ATOMIC,
    });
  });
});

describe("declared extensions reach settlement hooks", () => {
  it("forwards the Hono route declaration", async () => {
    stubFacilitator();
    const declarations = captureSettlementDeclarations();

    await drivePaidRequest(false);

    expect(declarations).toEqual([EXTENSION_DECLARATION]);
  });

  it("forwards the Express route declaration", async () => {
    stubFacilitator();
    const declarations = captureSettlementDeclarations();

    await driveExpressRequest(false);

    expect(declarations).toEqual([EXTENSION_DECLARATION]);
  });
});

describe("failed settlement response headers", () => {
  it("sends PAYMENT-RESPONSE through Hono", async () => {
    stubFacilitator(false);

    const response = await drivePaidRequest(false);

    expect(response?.status).toBe(402);
    expect(response?.headers.get("PAYMENT-RESPONSE")).toBeTruthy();
  });

  it("sends PAYMENT-RESPONSE through Express", async () => {
    stubFacilitator(false);

    const response = await driveExpressRequest(false);

    expect(response.status).toBe(402);
    expect(response.headers["payment-response"]).toBeTruthy();
  });
});

describe("before-handler settlement", () => {
  it("returns the completed settlement through Hono", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(false, { upfront: true });

    expect(response?.status).toBe(200);
    expect(response?.headers.get("PAYMENT-RESPONSE")).toBeTruthy();
    expect(settleBodies).toHaveLength(1);
  });

  it("returns the completed settlement through Express", async () => {
    stubFacilitator();

    const response = await driveExpressRequest(false, { upfront: true });

    expect(response.status).toBe(200);
    expect(response.headers["payment-response"]).toBeTruthy();
    expect(settleBodies).toHaveLength(1);
  });

  it("cancels after a Hono handler failure", async () => {
    stubFacilitator();
    const cancellations = captureCancellations();

    const response = await drivePaidRequest(false, {
      upfront: true,
      handlerStatus: 500,
    });

    expect(cancellations).toMatchObject([
      { reason: "handler_failed", responseStatus: 500 },
    ]);
    expect(response?.headers.get("PAYMENT-RESPONSE")).toBeTruthy();
  });

  it("cancels after an Express handler failure", async () => {
    stubFacilitator();
    const cancellations = captureCancellations();

    const response = await driveExpressRequest(false, {
      upfront: true,
      handlerStatus: 500,
    });

    expect(cancellations).toMatchObject([
      { reason: "handler_failed", responseStatus: 500 },
    ]);
    expect(response.headers["payment-response"]).toBeTruthy();
  });
});

describe("buffered Express writeHead", () => {
  it("observes a failure status before deciding whether to settle", async () => {
    stubFacilitator();
    const cancellations = captureCancellations();

    const response = await driveExpressRequest(false, {
      writeHeadStatus: 503,
    });

    expect(response.status).toBe(503);
    expect(cancellations).toMatchObject([
      { reason: "handler_failed", responseStatus: 503 },
    ]);
    expect(settleBodies).toHaveLength(0);
  });

  it("observes settlement overrides passed to writeHead", async () => {
    stubFacilitator();

    await driveExpressRequest(false, {
      writeHeadStatus: 200,
      writeHeadHeaders: {
        [SETTLEMENT_OVERRIDES_HEADER]: JSON.stringify({ amount: METERED_USD }),
      },
    });

    expect(settleBodies[0]?.paymentRequirements).toMatchObject({
      amount: METERED_ATOMIC,
    });
  });
});

describe("immutable Hono responses", () => {
  it("rebuilds a successful response before adding settlement headers", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(false, { immutableResponse: true });

    expect(response?.status).toBe(200);
    expect(response?.headers.get("PAYMENT-RESPONSE")).toBeTruthy();
  });

  it("rebuilds a failed handler response before adding cancellation headers", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(false, {
      upfront: true,
      handlerStatus: 503,
      immutableResponse: true,
    });

    expect(response?.status).toBe(503);
    expect(response?.headers.get("PAYMENT-RESPONSE")).toBeTruthy();
  });
});

describe("custom settlement failure responses", () => {
  it("honors Core's Hono response instructions", async () => {
    stubFacilitator(false);

    const response = await drivePaidRequest(false, { customFailure: true });

    expect(response?.status).toBe(402);
    expect(response?.headers.get("content-type")).toBe(
      "text/html; charset=utf-8",
    );
    expect(await response?.text()).toBe("<h1>Try another wallet</h1>");
  });

  it("honors Core's Express response instructions", async () => {
    stubFacilitator(false);

    const response = await driveExpressRequest(false, { customFailure: true });

    expect(response.status).toBe(402);
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(response.body).toBe("<h1>Try another wallet</h1>");
  });
});

describe("facilitator boundary errors", () => {
  it("lets Hono handle a typed Core error", async () => {
    stubFacilitator("malformed");

    await expect(drivePaidRequest(false)).rejects.toMatchObject({
      name: "FacilitatorResponseError",
    });
  });

  it("passes a typed Core error to Express", async () => {
    stubFacilitator("malformed");
    const errors: unknown[] = [];

    const response = await driveExpressRequest(false, { errors });

    expect(response.status).toBe(200);
    expect(errors).toMatchObject([{ name: "FacilitatorResponseError" }]);
  });
});

describe("verified payment replay", () => {
  function storedReplay(): ReplayResult {
    return {
      paymentPayload: paymentPayload(),
      paymentRequirements: requirements,
      declaredExtensions: { [EXTENSION_KEY]: EXTENSION_DECLARATION },
    };
  }

  it("retries Hono settlement without verifying a consumed nonce", async () => {
    stubFacilitator(true, false);
    const stored = storedReplay();
    const handlerRuns = { count: 0 };

    const response = await drivePaidRequest(true, {
      resumeVerifiedPayment: () => stored,
      handlerRuns,
    });

    expect(response?.status).toBe(200);
    expect(verifyCalls).toBe(0);
    expect(handlerRuns.count).toBe(1);
    expect(settleBodies[0]?.paymentPayload).toEqual(stored.paymentPayload);
    expect(settleBodies[0]?.paymentRequirements).toMatchObject({
      amount: METERED_ATOMIC,
    });
  });

  it("retries Express settlement without verifying a consumed nonce", async () => {
    stubFacilitator(true, false);
    const stored = storedReplay();
    const handlerRuns = { count: 0 };

    const response = await driveExpressRequest(true, {
      resumeVerifiedPayment: () => stored,
      handlerRuns,
    });

    expect(response.status).toBe(200);
    expect(verifyCalls).toBe(0);
    expect(handlerRuns.count).toBe(1);
    expect(settleBodies[0]?.paymentPayload).toEqual(stored.paymentPayload);
    expect(settleBodies[0]?.paymentRequirements).toMatchObject({
      amount: METERED_ATOMIC,
    });
  });

  it("propagates Hono replay lookup errors", async () => {
    stubFacilitator();

    await expect(
      drivePaidRequest(false, {
        resumeVerifiedPayment: () => {
          throw new Error("replay store unavailable");
        },
      }),
    ).rejects.toThrow("replay store unavailable");
    expect(verifyCalls).toBe(0);
  });

  it("passes Express replay lookup errors to error middleware", async () => {
    stubFacilitator();
    const errors: unknown[] = [];

    await driveExpressRequest(false, {
      resumeVerifiedPayment: () => {
        throw new Error("replay store unavailable");
      },
      errors,
    });

    expect(errors).toMatchObject([{ message: "replay store unavailable" }]);
    expect(verifyCalls).toBe(0);
  });

  it.each(["Hono", "Express"])(
    "restores an upfront receipt through %s without settling again",
    async (adapter) => {
      stubFacilitator();
      const replay = {
        ...storedReplay(),
        beforeHandlerSettlement: {
          phase: "before-handler" as const,
          flow: "upfront" as const,
          requirements,
          result: {
            success: true as const,
            transaction: "0xstored",
            network: NETWORK,
          },
        },
      };

      const response =
        adapter === "Hono"
          ? await drivePaidRequest(false, {
              upfront: true,
              resumeVerifiedPayment: () => replay,
            })
          : await driveExpressRequest(false, {
              upfront: true,
              resumeVerifiedPayment: () => replay,
            });
      const headers =
        response instanceof Response ? response.headers : response.headers;

      expect(
        headers instanceof Headers
          ? headers.get("payment-response")
          : headers["payment-response"],
      ).toBeTruthy();
      expect(settleBodies).toHaveLength(0);
    },
  );

  it.each(["Hono", "Express"])(
    "restores an upfront receipt and cancellation dispatcher through %s",
    async (adapter) => {
      stubFacilitator();
      const calls: unknown[] = [];
      const beforeHandlerSettlement: CompletedSettlement = {
        phase: "before-handler",
        flow: "upfront",
        requirements,
        result: {
          success: true,
          transaction: "0xstored",
          network: NETWORK,
        },
      };
      const cancellationDispatcher: PaymentCancellationDispatcher = {
        async cancel(options) {
          calls.push(options);
          return beforeHandlerSettlement.result;
        },
      };
      const replay = {
        ...storedReplay(),
        beforeHandlerSettlement,
        cancellationDispatcher,
      };

      const response =
        adapter === "Hono"
          ? await drivePaidRequest(false, {
              upfront: true,
              handlerStatus: 500,
              resumeVerifiedPayment: () => replay,
            })
          : await driveExpressRequest(false, {
              upfront: true,
              handlerStatus: 500,
              resumeVerifiedPayment: () => replay,
            });

      expect(calls).toMatchObject([
        { reason: "handler_failed", responseStatus: 500 },
      ]);
      const headers =
        response instanceof Response ? response.headers : response.headers;
      expect(
        headers instanceof Headers
          ? headers.get("payment-response")
          : headers["payment-response"],
      ).toBeTruthy();
      expect(settleBodies).toHaveLength(0);
    },
  );
});

describe("settlement transport response body", () => {
  it("passes a cloned Hono response body to settlement hooks", async () => {
    stubFacilitator();

    const response = await drivePaidRequest(false, { body: "hono body" });

    expect(settlementTransportContexts[0]?.responseBody?.toString("utf8")).toBe(
      "hono body",
    );
    expect(await response?.text()).toBe("hono body");
  });

  it("reconstructs Express write/end chunks without changing output", async () => {
    stubFacilitator();
    const chunks = [
      "express ",
      Buffer.from("buffer "),
      new Uint8Array([111, 107]),
    ];

    const response = await driveExpressRequest(false, { chunks });

    expect(settlementTransportContexts[0]?.responseBody?.toString("utf8")).toBe(
      "express buffer ok",
    );
    expect(response.emittedChunks).toEqual(chunks);
  });

  it("omits an unsafe Express body without changing emitted output", async () => {
    stubFacilitator();
    const chunk = { streamed: true };

    const response = await driveExpressRequest(false, { chunks: [chunk] });

    expect(settlementTransportContexts[0]?.responseBody).toBeUndefined();
    expect(response.emittedChunks).toEqual([chunk]);
  });
});

describe("successful response privacy", () => {
  it.each(["Hono", "Express"])(
    "makes %s responses private and removes settlement overrides",
    async (adapter) => {
      stubFacilitator();

      const response =
        adapter === "Hono"
          ? await drivePaidRequest(true, { cacheControl: "max-age=60" })
          : await driveExpressRequest(true, { cacheControl: "max-age=60" });
      const headers =
        response instanceof Response ? response.headers : response.headers;
      const get = (name: string) =>
        headers instanceof Headers
          ? headers.get(name)
          : headers[name.toLowerCase()];

      expect(get("cache-control")).toContain("private");
      expect(get("cache-control")).toContain("max-age=60");
      expect(get(SETTLEMENT_OVERRIDES_HEADER)).toBeFalsy();
    },
  );
});

describe("facilitator unavailable settlement", () => {
  it.each(["Hono", "Express"])(
    "returns a retryable 503 through %s without a terminal receipt",
    async (adapter) => {
      stubFacilitator("unavailable");

      const response =
        adapter === "Hono"
          ? await drivePaidRequest(false)
          : await driveExpressRequest(false);
      const status =
        response instanceof Response ? response.status : response.status;
      const headers =
        response instanceof Response ? response.headers : response.headers;
      const get = (name: string) =>
        headers instanceof Headers
          ? headers.get(name)
          : headers[name.toLowerCase()];

      expect(status).toBe(503);
      expect(get("retry-after")).toBeTruthy();
      expect(get("payment-response")).toBeFalsy();
    },
  );
});
