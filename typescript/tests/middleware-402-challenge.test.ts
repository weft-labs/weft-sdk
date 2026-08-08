import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import { parsePaymentRequired } from "@x402/core/schemas";
import type { RouteConfig, RoutesConfig } from "@x402/core/server";
import type {
  Network,
  PaymentRequirements,
  SchemeNetworkServer,
} from "@x402/core/types";
import {
  weftPaymentMiddleware,
  type WeftExpressMiddlewareConfig,
} from "../src/facilitator/middleware/express";
import {
  weftPaymentMiddlewareHono,
  type WeftHonoMiddlewareConfig,
} from "../src/facilitator/middleware/hono";

/**
 * End-to-end coverage for the 402 challenge our middleware actually emits.
 *
 * These tests drive the real `@x402/core` resource server, then decode the
 * `PAYMENT-REQUIRED` response header with the same function a buyer's client
 * uses. Nothing about the resource payload is faked: only the facilitator's
 * `/supported` HTTP call and the scheme's price maths are stubbed, because
 * neither touches `ResourceInfo`.
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

const routes: RoutesConfig = {
  "GET /v1/search": {
    accepts: {
      scheme: "exact",
      network: NETWORK,
      payTo: PAY_TO,
      price: "$0.01",
    },
  },
};

/**
 * Build routes with extra fields on the single protected route.
 *
 * @param overrides - Fields to merge into the route config
 * @returns A routes config with the overrides applied
 */
function routesWith(overrides: Partial<RouteConfig>): RoutesConfig {
  return {
    "GET /v1/search": {
      ...(routes as Record<string, RouteConfig>)["GET /v1/search"],
      ...overrides,
    },
  };
}

const baseConfig = {
  facilitator: { url: FACILITATOR_URL },
  schemes: [{ network: NETWORK, server: fakeScheme }],
} satisfies WeftExpressMiddlewareConfig & WeftHonoMiddlewareConfig;

/** Records everything a framework handed back to the caller. */
interface CapturedResponse {
  status: number;
  headers: Record<string, string>;
  body: unknown;
}

/**
 * Drive the Express middleware for an unpaid GET and capture the response.
 *
 * @param routesConfig - Routes to protect
 * @param config - Middleware configuration, including product identity
 * @returns The captured HTTP response
 */
async function callExpress(
  routesConfig: RoutesConfig,
  config: WeftExpressMiddlewareConfig,
): Promise<CapturedResponse> {
  const middleware = weftPaymentMiddleware(routesConfig, config);

  const headers: Record<string, string> = { host: "api.acme.test" };
  const req = {
    method: "GET",
    path: "/v1/search",
    protocol: "https",
    headers,
    query: {},
    header: (name: string) => headers[name.toLowerCase()],
  };

  const captured: CapturedResponse = {
    status: 0,
    headers: {},
    body: undefined,
  };
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
    send(body: unknown) {
      captured.body = body;
      return res;
    },
    json(body: unknown) {
      captured.body = body;
      return res;
    },
    writeHead: () => res,
    write: () => true,
    end: () => res,
    flushHeaders: () => undefined,
  };

  const next = vi.fn();
  await middleware(req, res, next);

  expect(next).not.toHaveBeenCalled();
  return captured;
}

/**
 * Drive the Hono middleware for an unpaid GET and capture the response.
 *
 * @param routesConfig - Routes to protect
 * @param config - Middleware configuration, including product identity
 * @returns The captured HTTP response
 */
async function callHono(
  routesConfig: RoutesConfig,
  config: WeftHonoMiddlewareConfig,
): Promise<CapturedResponse> {
  const middleware = weftPaymentMiddlewareHono(routesConfig, config);

  const captured: CapturedResponse = {
    status: 0,
    headers: {},
    body: undefined,
  };
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
    header(name: string, value: string) {
      captured.headers[name] = value;
    },
    html(body: string, status?: number) {
      captured.body = body;
      captured.status = status ?? 200;
      return new Response(body, { status });
    },
    json(body: unknown, status?: number) {
      captured.body = body;
      captured.status = status ?? 200;
      return new Response(JSON.stringify(body), { status });
    },
  };

  const next = vi.fn(async () => undefined);
  await middleware(c, next);

  expect(next).not.toHaveBeenCalled();
  return captured;
}

/**
 * Decode the 402 challenge exactly as a buyer's x402 client would.
 *
 * @param response - The captured HTTP response
 * @returns The `resource` block the buyer will copy onto its payment payload
 */
function resourceFromChallenge(response: CapturedResponse) {
  expect(response.status).toBe(402);

  const header = response.headers["PAYMENT-REQUIRED"];
  expect(header).toBeDefined();

  return decodePaymentRequiredHeader(header).resource;
}

describe("402 challenge carries declared product identity", () => {
  beforeEach(() => {
    const supported = JSON.stringify({
      kinds: [{ x402Version: 2, scheme: "exact", network: NETWORK }],
      extensions: [],
      signers: {},
    });

    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL) => {
        if (!String(url).endsWith("/supported")) {
          throw new Error(`unexpected fetch: ${String(url)}`);
        }
        return new Response(supported, { status: 200 });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("puts serviceName, tags and iconUrl on the Express challenge", async () => {
    const resource = resourceFromChallenge(
      await callExpress(routes, {
        ...baseConfig,
        name: "Acme Pricing API",
        type: "api",
        tags: ["finance", "pricing"],
        iconUrl: "https://acme.test/icon.png",
      }),
    );

    expect(resource).toMatchObject({
      url: "https://api.acme.test/v1/search",
      serviceName: "Acme Pricing API",
      tags: ["weft:type:api", "finance", "pricing"],
      iconUrl: "https://acme.test/icon.png",
    });
  });

  it("puts serviceName, tags and iconUrl on the Hono challenge", async () => {
    const resource = resourceFromChallenge(
      await callHono(routes, {
        ...baseConfig,
        name: "Acme Pricing API",
        type: "mcp",
        tags: ["finance"],
        iconUrl: "https://acme.test/icon.png",
      }),
    );

    expect(resource).toMatchObject({
      url: "https://api.acme.test/v1/search",
      serviceName: "Acme Pricing API",
      tags: ["weft:type:mcp", "finance"],
      iconUrl: "https://acme.test/icon.png",
    });
  });

  it("carries the product type when nothing else is declared", async () => {
    const resource = resourceFromChallenge(
      await callExpress(routes, { ...baseConfig, type: "agent" }),
    );

    expect(resource.tags).toEqual(["weft:type:agent"]);
    expect(resource).not.toHaveProperty("serviceName");
    expect(resource).not.toHaveProperty("iconUrl");
  });

  it("lets a per-route serviceName win on the challenge", async () => {
    const resource = resourceFromChallenge(
      await callExpress(routesWith({ serviceName: "Acme Search" }), {
        ...baseConfig,
        name: "Acme Pricing API",
        type: "api",
      }),
    );

    expect(resource.serviceName).toBe("Acme Search");
    expect(resource.tags).toEqual(["weft:type:api"]);
  });

  it("omits identity fields entirely when the seller declares none", async () => {
    const resource = resourceFromChallenge(
      await callExpress(routes, baseConfig),
    );

    expect(resource.url).toBe("https://api.acme.test/v1/search");
    expect(resource).not.toHaveProperty("serviceName");
    expect(resource).not.toHaveProperty("tags");
    expect(resource).not.toHaveProperty("iconUrl");
  });

  it("still emits a payable challenge alongside the identity", async () => {
    const response = await callExpress(routes, {
      ...baseConfig,
      name: "Acme Pricing API",
      type: "api",
    });
    const challenge = decodePaymentRequiredHeader(
      response.headers["PAYMENT-REQUIRED"],
    );

    expect(challenge.accepts).toHaveLength(1);
    expect(challenge.accepts[0]).toMatchObject({
      scheme: "exact",
      network: NETWORK,
      payTo: PAY_TO,
      amount: "10000",
      asset: ASSET,
    });
  });

  /**
   * `parsePaymentRequired` is the x402 protocol's own validator, written
   * upstream and applied by no code path our middleware runs. It is therefore
   * a ground truth we did not generate: if the identity we add pushes the
   * challenge out of spec, this fails even though every assertion above still
   * passes.
   */
  it("emits a challenge the x402 schema accepts", async () => {
    const response = await callExpress(routes, {
      ...baseConfig,
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
      iconUrl: "https://acme.test/icon.png",
    });

    const parsed = parsePaymentRequired(
      decodePaymentRequiredHeader(response.headers["PAYMENT-REQUIRED"]),
    );

    expect(parsed.error).toBeUndefined();
    expect(parsed.success).toBe(true);
  });

  it("emits a challenge the x402 schema accepts when tags overflow", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await callExpress(routes, {
      ...baseConfig,
      name: "Acme Pricing API",
      type: "api",
      tags: ["one", "two", "three", "four", "five", "six"],
    });

    const challenge = decodePaymentRequiredHeader(
      response.headers["PAYMENT-REQUIRED"],
    );

    expect(challenge.resource.tags).toEqual([
      "weft:type:api",
      "one",
      "two",
      "three",
      "four",
    ]);
    expect(parsePaymentRequired(challenge).success).toBe(true);
  });
});
