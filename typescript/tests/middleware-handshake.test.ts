import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { version as SDK_VERSION } from "../package.json";
import {
  weftPaymentMiddleware,
  type WeftExpressMiddlewareConfig,
} from "../src/facilitator/middleware/express";
import {
  weftPaymentMiddlewareHono,
  type WeftHonoMiddlewareConfig,
} from "../src/facilitator/middleware/hono";
import { WEFT_DECLARED_HEADER } from "../src/facilitator/middleware/handshake";
import { createFacilitatorClient } from "../src/facilitator/client";
import type {
  Network,
  PaymentRequirements,
  SchemeNetworkServer,
} from "@x402/core/types";
import type { WeftRoutesConfig } from "../src/facilitator/middleware/product";

/**
 * Coverage for the construction-time facilitator handshake.
 *
 * The middleware has always called `/supported` at construction to sync
 * supported payment kinds. These tests pin what that call now carries —
 * `Authorization`, `User-Agent`, `X-Weft-Declared` — and what it must never
 * do: block, brick, or crash a seller's server, whatever the facilitator's
 * state.
 */

const NETWORK: Network = "eip155:84532";
const FACILITATOR_URL = "http://facilitator.test";
const PAY_TO = "0x0000000000000000000000000000000000000001";
const ASSET = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";

const fakeScheme: SchemeNetworkServer = {
  scheme: "exact",
  async parsePrice() {
    return { amount: "10000", asset: ASSET };
  },
  async enhancePaymentRequirements(requirements: PaymentRequirements) {
    return requirements;
  },
};

const routes: WeftRoutesConfig = {
  "GET /v1/search": {
    accepts: {
      scheme: "exact",
      network: NETWORK,
      payTo: PAY_TO,
      price: "$0.01",
    },
  },
};

const baseConfig = {
  facilitator: { url: FACILITATOR_URL },
  schemes: [{ network: NETWORK, server: fakeScheme }],
} satisfies WeftExpressMiddlewareConfig & WeftHonoMiddlewareConfig;

const SUPPORTED_BODY = JSON.stringify({
  kinds: [{ x402Version: 2, scheme: "exact", network: NETWORK }],
  extensions: [],
  signers: {},
});

/** One recorded facilitator request. */
interface RecordedFetch {
  url: string;
  headers: Record<string, string>;
}

/** Requests the stubbed facilitator received, in order. */
let recorded: RecordedFetch[];

/**
 * Stub `fetch` with a facilitator whose `/supported` behaviour is scripted.
 *
 * @param respond - Produces the response for each `/supported` call
 */
function stubFacilitator(respond: () => Promise<Response>): void {
  recorded = [];

  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string | URL, init?: RequestInit) => {
      const headers: Record<string, string> = {};
      for (const [name, value] of Object.entries(init?.headers ?? {})) {
        headers[name.toLowerCase()] = String(value);
      }
      recorded.push({ url: String(url), headers });

      if (!String(url).endsWith("/supported")) {
        throw new Error(`unexpected fetch: ${String(url)}`);
      }
      return respond();
    }),
  );
}

/** Stub a healthy facilitator. */
function stubHealthyFacilitator(): void {
  stubFacilitator(async () => new Response(SUPPORTED_BODY, { status: 200 }));
}

/**
 * Decode an `X-Weft-Declared` header value back into the declared identity.
 *
 * @param value - The base64url header value
 * @returns The declared identity payload
 */
function decodeDeclared(value: string): Record<string, unknown> {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

/**
 * Drive the Express middleware once and capture what happened.
 *
 * @param middleware - The middleware under test
 * @param path - Request path to drive
 * @returns The captured status, response headers, and `next` mock
 */
async function driveExpress(
  middleware: ReturnType<typeof weftPaymentMiddleware>,
  path = "/v1/search",
) {
  const headers: Record<string, string> = { host: "api.acme.test" };
  const req = {
    method: "GET",
    path,
    protocol: "https",
    headers,
    query: {},
    header: (name: string) => headers[name.toLowerCase()],
  };

  const captured = { status: 0, headers: {} as Record<string, string> };
  const res = {
    statusCode: 0,
    status(code: number) {
      captured.status = code;
      res.statusCode = code;
      return res;
    },
    setHeader(name: string, value: string) {
      captured.headers[name] = value;
      return res;
    },
    send: () => res,
    json: () => res,
    writeHead: () => res,
    write: () => true,
    end: () => res,
    flushHeaders: () => undefined,
  };

  const next = vi.fn();
  await middleware(req, res, next);
  return { ...captured, next };
}

/**
 * Construct an Express middleware and drive one unpaid protected request,
 * flushing the construction-time handshake on the way.
 *
 * @param config - Middleware configuration
 * @returns The `/supported` request the facilitator saw
 */
async function handshakeSeenBy(
  config: WeftExpressMiddlewareConfig,
): Promise<RecordedFetch> {
  const middleware = weftPaymentMiddleware(routes, config);
  await driveExpress(middleware);

  const supported = recorded.find((request) =>
    request.url.endsWith("/supported"),
  );
  expect(supported).toBeDefined();
  return supported as RecordedFetch;
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("handshake headers on the /supported call", () => {
  beforeEach(() => {
    stubHealthyFacilitator();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("carries Authorization, User-Agent and the declared identity", async () => {
    const supported = await handshakeSeenBy({
      ...baseConfig,
      apiKey: "wk_live_abc123",
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
      iconUrl: "https://acme.test/icon.png",
    });

    expect(supported.headers.authorization).toBe("Bearer wk_live_abc123");
    expect(supported.headers["user-agent"]).toBe(
      `weft-sdk-express/${SDK_VERSION}`,
    );
    expect(decodeDeclared(supported.headers["x-weft-declared"])).toEqual({
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
      icon_url: "https://acme.test/icon.png",
    });
  });

  it("names the Hono adapter in User-Agent", async () => {
    const middleware = weftPaymentMiddlewareHono(routes, {
      ...baseConfig,
      apiKey: "wk_live_abc123",
    });

    const c = {
      req: {
        method: "GET",
        path: "/v1/search",
        url: "https://api.acme.test/v1/search",
        header: () => undefined,
        query: (() => ({})) as never,
        json: async () => undefined,
      },
      res: undefined as Response | undefined,
      header: () => undefined,
      html: (body: string, status?: number) =>
        new Response(body, { status: status ?? 200 }),
      json: (body: unknown, status?: number) =>
        new Response(JSON.stringify(body), { status: status ?? 200 }),
    };
    await middleware(c, async () => undefined);

    const supported = recorded.find((request) =>
      request.url.endsWith("/supported"),
    );
    expect(supported?.headers["user-agent"]).toBe(
      `weft-sdk-hono/${SDK_VERSION}`,
    );
  });

  it("sends no Authorization and no X-Weft-Declared when nothing was configured", async () => {
    const supported = await handshakeSeenBy(baseConfig);

    expect(supported.headers.authorization).toBeUndefined();
    expect(supported.headers["x-weft-declared"]).toBeUndefined();
    expect(supported.headers["user-agent"]).toBe(
      `weft-sdk-express/${SDK_VERSION}`,
    );
  });

  it("declares the same clamped identity the challenge will carry", async () => {
    const supported = await handshakeSeenBy({
      ...baseConfig,
      name: "Acme Real Estate Property Records API",
      type: "Real Time Data Feed" as never,
      tags: ["weft:type:mcp", "finance", "x".repeat(33)],
    });

    expect(decodeDeclared(supported.headers["x-weft-declared"])).toEqual({
      name: "Acme Real Estate Property Record",
      tags: ["finance"],
    });
  });

  it("omits X-Weft-Declared entirely when nothing declared survives sanitization", async () => {
    const supported = await handshakeSeenBy({
      ...baseConfig,
      name: "Acme Café",
    });

    expect(supported.headers["x-weft-declared"]).toBeUndefined();
  });

  it("ignores a malformed apiKey without ever logging its value", async () => {
    const warnings: string[] = [];
    vi.spyOn(console, "warn").mockImplementation((message: unknown) => {
      warnings.push(String(message));
    });

    const supported = await handshakeSeenBy({
      ...baseConfig,
      apiKey: "   ",
    });

    expect(supported.headers.authorization).toBeUndefined();
    expect(warnings.some((line) => line.includes("apiKey"))).toBe(true);
  });
});

describe("handshake merges with a seller's own createAuthHeaders", () => {
  beforeEach(() => {
    stubHealthyFacilitator();
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("lets the seller's supported headers win over the derived ones", async () => {
    const supported = await handshakeSeenBy({
      ...baseConfig,
      apiKey: "wk_live_abc123",
      facilitator: {
        url: FACILITATOR_URL,
        createAuthHeaders: async () => ({
          supported: { Authorization: "Bearer seller-token" },
        }),
      },
    });

    expect(supported.headers.authorization).toBe("Bearer seller-token");
    expect(supported.headers["user-agent"]).toBe(
      `weft-sdk-express/${SDK_VERSION}`,
    );
  });

  it("passes verify and settle headers through untouched", async () => {
    const client = createFacilitatorClient(
      {
        url: FACILITATOR_URL,
        createAuthHeaders: async () => ({
          verify: { Authorization: "Bearer verify-token" },
          settle: { Authorization: "Bearer settle-token" },
        }),
      },
      { "User-Agent": "weft-sdk-express/test" },
    );

    expect((await client.createAuthHeaders("verify")).headers).toEqual({
      Authorization: "Bearer verify-token",
    });
    expect((await client.createAuthHeaders("settle")).headers).toEqual({
      Authorization: "Bearer settle-token",
    });
    expect((await client.createAuthHeaders("supported")).headers).toEqual({
      "User-Agent": "weft-sdk-express/test",
    });
  });

  it("still rejects a flat createAuthHeaders object loudly", async () => {
    const client = createFacilitatorClient(
      {
        url: FACILITATOR_URL,
        createAuthHeaders: (async () => ({
          Authorization: "Bearer flat",
        })) as never,
      },
      { "User-Agent": "weft-sdk-express/test" },
    );

    await expect(client.createAuthHeaders("supported")).rejects.toThrow(
      /keyed by facilitator path/,
    );
  });
});

describe("the handshake never takes a seller's server down with it", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  it("constructs and passes unprotected traffic while the facilitator is down", async () => {
    stubFacilitator(async () => {
      throw new Error("connect ECONNREFUSED");
    });

    const middleware = weftPaymentMiddleware(routes, {
      ...baseConfig,
      name: "Acme Pricing API",
      type: "api",
    });
    // Let the failed handshake settle; a rejection with no handler attached
    // here would fail this test file as an unhandled error.
    await new Promise((resolve) => setImmediate(resolve));

    const { next } = await driveExpress(middleware, "/healthz");
    expect(next).toHaveBeenCalledWith();
  });

  it("warns once about the failed sync instead of throwing", async () => {
    const warnings: string[] = [];
    vi.spyOn(console, "warn").mockImplementation((message: unknown) => {
      warnings.push(String(message));
    });
    stubFacilitator(async () => {
      throw new Error("connect ECONNREFUSED");
    });

    weftPaymentMiddleware(routes, baseConfig);
    await new Promise((resolve) => setImmediate(resolve));

    expect(
      warnings.filter((line) => line.includes("facilitator sync failed")),
    ).toHaveLength(1);
  });

  it("hands a protected request to next(error) instead of crashing when the facilitator is down", async () => {
    stubFacilitator(async () => {
      throw new Error("connect ECONNREFUSED");
    });

    const middleware = weftPaymentMiddleware(routes, baseConfig);
    await new Promise((resolve) => setImmediate(resolve));

    const { next } = await driveExpress(middleware);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
  });

  it("serves 402s again once the facilitator recovers, without a restart", async () => {
    let facilitatorUp = false;
    stubFacilitator(async () => {
      if (!facilitatorUp) {
        throw new Error("connect ECONNREFUSED");
      }
      return new Response(SUPPORTED_BODY, { status: 200 });
    });

    const middleware = weftPaymentMiddleware(routes, baseConfig);
    await new Promise((resolve) => setImmediate(resolve));

    // Down: the protected route degrades to next(error).
    const degraded = await driveExpress(middleware);
    expect(degraded.next).toHaveBeenCalledTimes(1);

    facilitatorUp = true;
    // The degraded request kicked a background re-sync; another request may
    // arrive before that retry has succeeded, so poll until healed.
    await vi.waitFor(async () => {
      const healed = await driveExpress(middleware);
      expect(healed.status).toBe(402);
    });
  });

  it("constructs immediately while the facilitator hangs, and unprotected traffic flows", async () => {
    stubFacilitator(() => new Promise<Response>(() => undefined));

    const middleware = weftPaymentMiddleware(routes, baseConfig);

    const { next } = await driveExpress(middleware, "/healthz");
    expect(next).toHaveBeenCalledWith();
  });

  it("constructs the Hono middleware while the facilitator is down", async () => {
    stubFacilitator(async () => {
      throw new Error("connect ECONNREFUSED");
    });

    const middleware = weftPaymentMiddlewareHono(routes, baseConfig);
    await new Promise((resolve) => setImmediate(resolve));

    const c = {
      req: {
        method: "GET",
        path: "/healthz",
        url: "https://api.acme.test/healthz",
        header: () => undefined,
        query: (() => ({})) as never,
        json: async () => undefined,
      },
      res: undefined as Response | undefined,
      header: () => undefined,
      html: (body: string) => new Response(body),
      json: (body: unknown) => new Response(JSON.stringify(body)),
    };
    const next = vi.fn(async () => undefined);
    await middleware(c, next);
    expect(next).toHaveBeenCalled();
  });

  it("never calls the facilitator at all when syncFacilitatorOnStart is false", async () => {
    stubHealthyFacilitator();

    const middleware = weftPaymentMiddleware(routes, {
      ...baseConfig,
      apiKey: "wk_live_abc123",
      name: "Acme Pricing API",
      syncFacilitatorOnStart: false,
    });
    await new Promise((resolve) => setImmediate(resolve));
    await driveExpress(middleware);

    expect(recorded).toHaveLength(0);
  });
});

describe("exported handshake constants", () => {
  it("names the declared-identity header", () => {
    expect(WEFT_DECLARED_HEADER).toBe("X-Weft-Declared");
  });
});
