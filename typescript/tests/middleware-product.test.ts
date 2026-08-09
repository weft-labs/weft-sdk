import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { RouteConfig } from "@x402/core/server";
import {
  applyProductIdentity,
  productTypeTag,
  WEFT_TYPE_TAG_PREFIX,
  type WeftProductIdentity,
  type WeftProductType,
  type WeftRouteConfig,
  type WeftRoutesConfig,
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
function routesWith(
  overrides: Partial<WeftRouteConfig> = {},
): WeftRoutesConfig {
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
function route(routes: WeftRoutesConfig, pattern: string): WeftRouteConfig {
  return (routes as Record<string, WeftRouteConfig>)[pattern];
}

/**
 * Build an identity from values TypeScript would reject, as JSON config can.
 *
 * The public interface is typed, but sellers configure this middleware from
 * JSON, env and `.mjs`, where none of those types exist at runtime.
 *
 * @param identity - Arbitrary runtime values for the identity fields
 * @returns The same object, typed as an identity
 */
function untyped(identity: Record<string, unknown>): WeftProductIdentity {
  return identity as WeftProductIdentity;
}

let warn: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
});

afterEach(() => {
  warn.mockRestore();
});

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

  it("applies identity to a single RouteConfig with no path map", () => {
    const single: WeftRoutesConfig = { accepts };

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
    const routes = routesWith({ type: "mcp", tags: ["search"] });
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

/**
 * The pass-through contract every config written before product identity
 * existed relies on. A middleware that declares no Weft identity anywhere must
 * hand `@x402/core` exactly the object the seller wrote, by reference.
 */
describe("applyProductIdentity leaves an identity-free config alone", () => {
  it("returns the routes untouched when no identity is declared", () => {
    const routes = routesWith();

    expect(applyProductIdentity(routes, {})).toBe(routes);
  });

  it("returns the routes untouched when every identity field is null", () => {
    const routes = routesWith();

    const merged = applyProductIdentity(
      routes,
      untyped({ name: null, type: null, tags: null, iconUrl: null }),
    );

    expect(merged).toBe(routes);
    expect(warn).not.toHaveBeenCalled();
  });

  it("returns the routes untouched when only upstream route fields are set", () => {
    const routes = routesWith({
      serviceName: "Acme Search",
      tags: ["search"],
      iconUrl: "https://acme.test/icon.png",
    });

    expect(applyProductIdentity(routes, {})).toBe(routes);
  });

  it("does still process a route that declares its own type", () => {
    const routes = routesWith({ type: "mcp" });

    const merged = applyProductIdentity(routes, {});

    expect(merged).not.toBe(routes);
    expect(route(merged, "GET /v1/search").tags).toEqual(["weft:type:mcp"]);
  });
});

describe("applyProductIdentity keeps serviceName inside the x402 schema", () => {
  it("truncates an over-long product name to what the protocol carries", () => {
    const name = "Acme Real Estate Property Records API";
    expect(name).toHaveLength(37);

    const merged = applyProductIdentity(routesWith(), { name });

    expect(route(merged, "GET /v1/search").serviceName).toBe(
      "Acme Real Estate Property Record",
    );
    expect(route(merged, "GET /v1/search").serviceName).toHaveLength(32);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(name));
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Acme Real Estate Property Record"),
    );
  });

  it("accepts a product name of exactly the maximum length", () => {
    const name = "x".repeat(32);

    const merged = applyProductIdentity(routesWith(), { name });

    expect(route(merged, "GET /v1/search").serviceName).toBe(name);
    expect(warn).not.toHaveBeenCalled();
  });

  it("drops a product name that is not printable ASCII", () => {
    const merged = applyProductIdentity(routesWith(), { name: "Acme Café" });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("serviceName");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("printable-ASCII"),
    );
  });

  it("drops an empty product name", () => {
    const merged = applyProductIdentity(routesWith(), { name: "" });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("serviceName");
    expect(warn).toHaveBeenCalled();
  });

  it("truncates an over-long per-route serviceName too", () => {
    const merged = applyProductIdentity(
      routesWith({ serviceName: "Acme Real Estate Property Records API" }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search").serviceName).toBe(
      "Acme Real Estate Property Record",
    );
  });

  it("falls back to the product name when the route's is not a string", () => {
    const routes = {
      "GET /v1/search": { accepts, serviceName: 42 },
    } as unknown as WeftRoutesConfig;

    const merged = applyProductIdentity(routes, { name: "Acme" });

    expect(route(merged, "GET /v1/search").serviceName).toBe("Acme");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("route serviceName"),
    );
  });
});

describe("applyProductIdentity validates the reserved type tag", () => {
  it("ignores a type outside the legal set and keeps the seller's tags", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({
        type: "Real Time Financial Market Data Feed",
        tags: ["finance", "pricing"],
      }),
    );

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "finance",
      "pricing",
    ]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("api, agent, mcp"),
    );
  });

  it("ignores a non-ASCII type", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ type: "café", tags: ["finance"] }),
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("café"));
  });

  it("never emits a tag for a null type", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ type: null, tags: ["finance"] }),
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("ignores a type that is not a string", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ type: 42, tags: ["finance"] }),
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("42"));
  });

  it("rejects a type that differs only in case", () => {
    const merged = applyProductIdentity(routesWith(), untyped({ type: "API" }));

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
  });

  it("emits no tags at all when the type is the only thing declared and junk", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ type: "not a kind" }),
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
  });
});

describe("applyProductIdentity supports a per-route type", () => {
  it("lets a route declare its own type", () => {
    const merged = applyProductIdentity(routesWith({ type: "mcp" }), {
      type: "api",
    });

    expect(route(merged, "GET /v1/search").tags).toEqual(["weft:type:mcp"]);
    expect(route(merged, "POST /v1/quote").tags).toEqual(["weft:type:api"]);
  });

  it("never forwards the route's own type field", () => {
    const merged = applyProductIdentity(routesWith({ type: "mcp" }), {
      name: "Acme",
    });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("type");
  });

  it("falls back to the product type when the route's is junk", () => {
    const routes = routesWith({
      type: "not a kind" as unknown as WeftProductType,
    });

    const merged = applyProductIdentity(routes, { type: "api" });

    expect(route(merged, "GET /v1/search").tags).toEqual(["weft:type:api"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("route type"));
  });

  it("keeps a route type alongside the route's own tags", () => {
    const merged = applyProductIdentity(
      routesWith({ type: "mcp", tags: ["search"] }),
      { type: "api", tags: ["finance"] },
    );

    expect(route(merged, "GET /v1/search").tags).toEqual([
      "weft:type:mcp",
      "search",
    ]);
  });
});

describe("applyProductIdentity handles reserved tags a caller supplies", () => {
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

  it("warns when a route's reserved tag is dropped, naming type", () => {
    const merged = applyProductIdentity(
      routesWith({ tags: ["weft:type:mcp", "search"] }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["search"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("`type`"));
  });

  it("drops reserved tags whatever their case or spacing", () => {
    const merged = applyProductIdentity(routesWith(), {
      tags: ["WEFT:TYPE:mcp", " weft:type:mcp", "finance"],
    });

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
  });
});

describe("applyProductIdentity survives a malformed config", () => {
  it("treats a null name as absent rather than throwing", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ name: null, type: "api" }),
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("serviceName");
    expect(route(merged, "GET /v1/search").tags).toEqual(["weft:type:api"]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("reports a name that is not a string", () => {
    const merged = applyProductIdentity(routesWith(), untyped({ name: 42 }));

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("serviceName");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("expected a string"),
    );
  });

  it("drops a tag entry that is not a string", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ tags: ["finance", 42] }),
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["finance"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("42"));
  });

  it("reports tags that are not an array", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ tags: "finance,pricing" }),
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("an array of strings"),
    );
  });

  it("never puts a null iconUrl on the wire", () => {
    const merged = applyProductIdentity(
      routesWith(),
      untyped({ iconUrl: null, name: "Acme" }),
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
    expect(warn).not.toHaveBeenCalled();
  });

  it("reports an iconUrl that is not a string", () => {
    const merged = applyProductIdentity(routesWith(), untyped({ iconUrl: 42 }));

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("expected a string"),
    );
  });

  it("reports a route that is not an object rather than throwing", () => {
    const routes = {
      "GET /v1/search": null,
    } as unknown as WeftRoutesConfig;

    expect(() => applyProductIdentity(routes, { name: "Acme" })).not.toThrow();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("route config"));
  });
});

/**
 * A dropped field has to leave the route, not survive on the original object.
 *
 * Product-level values only ever reach the wire through the resolvers, so a
 * drop there is obvious. Route-level values are already on the object being
 * merged, and a `{ ...route }` merge silently reinstates every one of them —
 * so these are the cases where a drop can look like it worked and not have.
 */
describe("applyProductIdentity drops route-level values it cannot carry", () => {
  it("removes route tags when every one of them is malformed", () => {
    const merged = applyProductIdentity(
      routesWith({ tags: ["x".repeat(99)] }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
  });

  it("removes a route tag the protocol cannot carry, keeping the rest", () => {
    const merged = applyProductIdentity(
      routesWith({ tags: ["search", "x".repeat(99)] }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search").tags).toEqual(["search"]);
  });

  it("removes route tags left empty by stripping a reserved tag", () => {
    const merged = applyProductIdentity(
      routesWith({ tags: ["weft:type:mcp"] }),
      {
        name: "Acme",
      },
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("tags");
  });

  it("removes a route iconUrl with a scheme it will not relay", () => {
    const merged = applyProductIdentity(
      routesWith({ iconUrl: "javascript:alert(1)" }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
  });

  it("does not fall back to the product iconUrl when the route's is unsafe", () => {
    const merged = applyProductIdentity(
      routesWith({ iconUrl: "javascript:alert(1)" }),
      { iconUrl: "https://acme.test/icon.png" },
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
  });

  it("removes a route serviceName that is not printable ASCII", () => {
    const merged = applyProductIdentity(
      routesWith({ serviceName: "Acme Café" }),
      { type: "api" },
    );

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("serviceName");
  });

  it("keeps every non-identity route field untouched", () => {
    const merged = applyProductIdentity(
      routesWith({
        description: "Search the index",
        mimeType: "application/json",
      }),
      { name: "Acme" },
    );

    expect(route(merged, "GET /v1/search")).toMatchObject({
      accepts,
      description: "Search the index",
      mimeType: "application/json",
    });
  });
});

describe("applyProductIdentity guards the iconUrl it emits", () => {
  it("keeps an https iconUrl", () => {
    const merged = applyProductIdentity(routesWith(), {
      iconUrl: "https://acme.test/icon.png",
    });

    expect(route(merged, "GET /v1/search").iconUrl).toBe(
      "https://acme.test/icon.png",
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it("drops a javascript: iconUrl", () => {
    const merged = applyProductIdentity(routesWith(), {
      iconUrl: "javascript:alert(1)",
    });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("only http and https"),
    );
  });

  it("drops a data: iconUrl", () => {
    const merged = applyProductIdentity(routesWith(), {
      iconUrl: "data:text/html;base64,PHNjcmlwdD4=",
    });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
  });

  it("drops a relative iconUrl", () => {
    const merged = applyProductIdentity(routesWith(), {
      iconUrl: "/icon.png",
    });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("absolute http or https URL"),
    );
  });

  it("drops an iconUrl longer than the protocol carries", () => {
    const iconUrl = `https://acme.test/${"x".repeat(2048)}.png`;

    const merged = applyProductIdentity(routesWith(), { iconUrl });

    expect(route(merged, "GET /v1/search")).not.toHaveProperty("iconUrl");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("2048"));
  });
});

describe("applyProductIdentity stays inside the x402 tag bounds", () => {
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

  it("does not blame a declared type when none was declared", () => {
    applyProductIdentity(routesWith(), {
      tags: ["one", "two", "three", "four", "five", "six"],
    });

    expect(warn).not.toHaveBeenCalledWith(
      expect.stringContaining("declared type"),
    );
  });

  it("blames the declared type only when there is one", () => {
    applyProductIdentity(routesWith(), {
      type: "api",
      tags: ["one", "two", "three", "four", "five"],
    });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("declared type uses one of them"),
    );
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
