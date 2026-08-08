import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { RouteConfig, RoutesConfig } from "@x402/core/server";
import {
  applyProductIdentity,
  productTypeTag,
  WEFT_TYPE_TAG_PREFIX,
  type WeftProductIdentity,
} from "../src/facilitator/middleware/product";

const accepts: RouteConfig["accepts"] = {
  scheme: "exact",
  network: "eip155:84532",
  payTo: "0x0000000000000000000000000000000000000001",
  price: "$0.01",
};

/**
 * Build a routes map with the given per-route overrides.
 *
 * @param overrides - Per-route identity fields to set on `/v1/search`
 * @returns A routes config with two protected routes
 */
function routesWith(overrides: Partial<RouteConfig> = {}): RoutesConfig {
  return {
    "GET /v1/search": { accepts, ...overrides },
    "POST /v1/quote": { accepts },
  };
}

/**
 * Narrow a RoutesConfig back to a named route for assertions.
 *
 * @param routes - The merged routes config
 * @param pattern - Route pattern to pull out
 * @returns The route config at that pattern
 */
function route(routes: RoutesConfig, pattern: string): RouteConfig {
  return (routes as Record<string, RouteConfig>)[pattern];
}

describe("productTypeTag", () => {
  it("encodes the type under the reserved prefix", () => {
    expect(productTypeTag("api")).toBe("weft:type:api");
    expect(productTypeTag("agent")).toBe("weft:type:agent");
    expect(productTypeTag("mcp")).toBe("weft:type:mcp");
    expect(productTypeTag("api").startsWith(WEFT_TYPE_TAG_PREFIX)).toBe(true);
  });
});

describe("applyProductIdentity", () => {
  it("applies product-level identity to every route", () => {
    const identity: WeftProductIdentity = {
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
      iconUrl: "https://acme.test/icon.png",
    };

    const merged = applyProductIdentity(routesWith(), identity);

    for (const pattern of ["GET /v1/search", "POST /v1/quote"]) {
      expect(route(merged, pattern)).toMatchObject({
        serviceName: "Acme Pricing API",
        tags: ["weft:type:api", "finance", "pricing"],
        iconUrl: "https://acme.test/icon.png",
      });
    }
  });

  it("keeps the route's own accepts untouched", () => {
    const merged = applyProductIdentity(routesWith(), { name: "Acme" });

    expect(route(merged, "GET /v1/search").accepts).toEqual(accepts);
  });

  it("lets a per-route serviceName win over the product name", () => {
    const merged = applyProductIdentity(
      routesWith({ serviceName: "Acme Search" }),
      { name: "Acme Pricing API" },
    );

    expect(route(merged, "GET /v1/search").serviceName).toBe("Acme Search");
    expect(route(merged, "POST /v1/quote").serviceName).toBe(
      "Acme Pricing API",
    );
  });

  it("lets a per-route iconUrl win over the product iconUrl", () => {
    const merged = applyProductIdentity(
      routesWith({ iconUrl: "https://acme.test/search.png" }),
      { iconUrl: "https://acme.test/icon.png" },
    );

    expect(route(merged, "GET /v1/search").iconUrl).toBe(
      "https://acme.test/search.png",
    );
    expect(route(merged, "POST /v1/quote").iconUrl).toBe(
      "https://acme.test/icon.png",
    );
  });

  it("lets per-route tags replace the product tags wholesale", () => {
    const merged = applyProductIdentity(routesWith({ tags: ["search"] }), {
      tags: ["finance", "pricing"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual(["search"]);
    expect(route(merged, "POST /v1/quote").tags).toEqual([
      "finance",
      "pricing",
    ]);
  });

  it("keeps the type tag when a route overrides tags", () => {
    const merged = applyProductIdentity(routesWith({ tags: ["search"] }), {
      type: "mcp",
      tags: ["finance"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "weft:type:mcp",
      "search",
    ]);
    expect(route(merged, "POST /v1/quote").tags).toEqual([
      "weft:type:mcp",
      "finance",
    ]);
  });

  it("carries the type alone when no other tags are declared", () => {
    const merged = applyProductIdentity(routesWith(), { type: "agent" });

    expect(route(merged, "GET /v1/search").tags).toEqual(["weft:type:agent"]);
  });

  it("drops caller-supplied reserved type tags in favour of type", () => {
    const merged = applyProductIdentity(routesWith(), {
      type: "api",
      tags: ["weft:type:mcp", "finance"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "weft:type:api",
      "finance",
    ]);
  });

  it("drops reserved type tags even when no type is declared", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["weft:type:mcp", "finance"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
  });

  it("leaves tags absent when stripping empties them", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["weft:type:mcp"],
    });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
  });

  it("deduplicates tags", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["finance", "finance", "pricing"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "finance",
      "pricing",
    ]);
  });

  it("leaves undeclared identity fields absent", () => {
    const merged = applyProductIdentity(routesWith(), { name: "Acme" });
    const searchRoute = route(merged, "GET /v1/search");

    expect(searchRoute.serviceName).toBe("Acme");
    expect(searchRoute).not.toHaveProperty("tags");
    expect(searchRoute).not.toHaveProperty("iconUrl");
  });

  it("returns the routes untouched when no identity is declared", () => {
    const routes = routesWith();

    expect(applyProductIdentity(routes, {})).toBe(routes);
  });

  it("applies identity to a single RouteConfig with no path map", () => {
    const single: RoutesConfig = { accepts };

    const merged = applyProductIdentity(single, {
      name: "Acme Pricing API",
      type: "api",
    });

    expect(merged).toMatchObject({
      accepts,
      serviceName: "Acme Pricing API",
      tags: ["weft:type:api"],
    });
  });

  it("does not mutate the caller's routes", () => {
    const routes = routesWith();
    const before = structuredClone(routes);

    applyProductIdentity(routes, {
      name: "Acme",
      type: "api",
      tags: ["finance"],
      iconUrl: "https://acme.test/icon.png",
    });

    expect(routes).toEqual(before);
  });

  it("does not mutate a caller's tags array", () => {
    const tags = ["finance"];

    applyProductIdentity(routesWith(), { type: "api", tags });

    expect(tags).toEqual(["finance"]);
  });
});

describe("applyProductIdentity stays inside the x402 tag bounds", () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it("clamps to five tags", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["one", "two", "three", "four", "five", "six", "seven"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "one",
      "two",
      "three",
      "four",
      "five",
    ]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("six, seven"));
  });

  it("keeps the type tag when clamping", () => {
    const merged = applyProductIdentity(routesWith(), {
      type: "api",
      tags: ["one", "two", "three", "four", "five"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "weft:type:api",
      "one",
      "two",
      "three",
      "four",
    ]);
  });

  it("drops an over-long tag rather than the whole array", () => {
    const merged = applyProductIdentity(routesWith(), {
      type: "api",
      tags: ["finance", "x".repeat(33)],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "weft:type:api",
      "finance",
    ]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("printable-ASCII"),
    );
  });

  it("drops a non-ASCII tag rather than the whole array", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["finance", "prezzî"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
  });

  it("accepts a tag of exactly the maximum length", () => {
    const exact = "x".repeat(32);

    const merged = applyProductIdentity(routesWith(), { tags: [exact] });

    expect(route(merged, "GET /v1/search").tags).toEqual([exact]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("warns about an over-long product name but still sends it", () => {
    const name = "Acme Real Estate Property Records API";

    const merged = applyProductIdentity(routesWith(), { name });

    expect(route(merged, "GET /v1/search").serviceName).toBe(name);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(name));
  });

  it("warns once, not once per route", () => {
    applyProductIdentity(routesWith(), {
      name: "Acme Real Estate Property Records API",
      tags: ["one", "two", "three", "four", "five", "six"],
    });

    // Two distinct problems across two routes: four lines if undeduplicated.
    expect(warn).toHaveBeenCalledTimes(2);
  });

  it("stays quiet for identity that fits", () => {
    applyProductIdentity(routesWith(), {
      name: "Acme Pricing API",
      type: "api",
      tags: ["finance", "pricing"],
    });

    expect(warn).not.toHaveBeenCalled();
  });
});
