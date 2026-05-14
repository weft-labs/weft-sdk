import { describe, it, expect, beforeEach, vi } from "vitest";
import { WeftAppClient } from "../src/clients/weft-app.js";
import { buildBalanceHandler } from "../src/tools/balance.js";
import { buildSearchHandler } from "../src/tools/search.js";
import { buildFetchHandler } from "../src/tools/fetch.js";

type FetchArgs = Parameters<typeof fetch>;
type FetchImpl = (...args: FetchArgs) => Promise<Response>;

function mockFetch(
  responder: (url: string, init: RequestInit) => Response | Promise<Response>,
): { fetch: FetchImpl; calls: Array<{ url: string; init: RequestInit }> } {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fn: FetchImpl = async (input, init) => {
    const url = typeof input === "string" ? input : (input as URL).toString();
    const safeInit = (init ?? {}) as RequestInit;
    calls.push({ url, init: safeInit });
    return responder(url, safeInit);
  };
  return { fetch: fn, calls };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

const AUTH_HEADERS = { authorization: "Bearer test-token" };

describe("weft.balance handler", () => {
  let client: WeftAppClient;
  let mock: ReturnType<typeof mockFetch>;

  beforeEach(() => {
    mock = mockFetch(() =>
      jsonResponse(200, {
        balance_usd: "9.50",
        promo_credit_usd: "0.10",
        spent_today_usd: "0.00",
        spent_week_usd: "0.00",
        policy: {
          max_tx_usd: "0.50",
          daily_cap_usd: "2.00",
          weekly_cap_usd: "10.00",
        },
      }),
    );
    client = new WeftAppClient({
      baseUrl: "http://weft-app",
      fetchImpl: mock.fetch as unknown as typeof fetch,
    });
  });

  it("forwards Authorization to /api/v1/balance", async () => {
    const handler = buildBalanceHandler(client);
    const res = await handler({}, { requestInfo: { headers: AUTH_HEADERS } });
    expect(res).not.toHaveProperty("isError");
    const call = mock.calls[0];
    expect(call!.url).toBe("http://weft-app/api/v1/balance");
    const headers = (call!.init.headers ?? {}) as Record<string, string>;
    expect(headers.authorization).toBe("Bearer test-token");
    expect(call!.init.method).toBe("POST");
  });

  it("returns an MCP error result when Authorization is missing", async () => {
    const handler = buildBalanceHandler(client);
    const res = await handler({}, { requestInfo: { headers: {} } });
    expect(res).toMatchObject({ isError: true });
    expect(JSON.stringify(res)).toMatch(/Missing Authorization/);
    expect(mock.calls).toHaveLength(0);
  });
});

describe("weft.search handler", () => {
  it("forwards query + limit to /api/v1/search", async () => {
    const mock = mockFetch(() =>
      jsonResponse(200, {
        query: "weather",
        hits: [{ url: "https://w.example", title: "Weather" }],
      }),
    );
    const client = new WeftAppClient({
      baseUrl: "http://weft-app",
      fetchImpl: mock.fetch as unknown as typeof fetch,
    });
    const handler = buildSearchHandler(client);
    const res = await handler(
      { query: "weather", limit: 5 },
      { requestInfo: { headers: AUTH_HEADERS } },
    );
    expect(res).not.toHaveProperty("isError");
    const call = mock.calls[0]!;
    expect(call.url).toBe("http://weft-app/api/v1/search");
    expect(JSON.parse(call.init.body as string)).toEqual({
      query: "weather",
      limit: 5,
    });
  });
});

describe("weft.fetch handler", () => {
  it("forwards all proxy args to /api/v1/fetch", async () => {
    const mock = mockFetch(() =>
      jsonResponse(200, {
        status: 200,
        body: "<html>ok</html>",
        payment: {
          receipt_id: "rcpt_1",
          amount_usd: "0.01",
          facilitator: "x402.weft.network",
        },
      }),
    );
    const client = new WeftAppClient({
      baseUrl: "http://weft-app",
      fetchImpl: mock.fetch as unknown as typeof fetch,
    });
    const handler = buildFetchHandler(client);
    const res = await handler(
      {
        url: "https://example.test/api",
        max_cost_usd: "0.05",
        method: "GET",
      },
      { requestInfo: { headers: AUTH_HEADERS } },
    );
    expect(res).not.toHaveProperty("isError");
    const call = mock.calls[0]!;
    expect(call.url).toBe("http://weft-app/api/v1/fetch");
    expect(JSON.parse(call.init.body as string)).toMatchObject({
      url: "https://example.test/api",
      max_cost_usd: "0.05",
      method: "GET",
    });
  });

  it("maps POLICY_VIOLATION_MAX_TX into a useful MCP error with dashboard URL", async () => {
    const mock = mockFetch(() =>
      jsonResponse(402, {
        error: "POLICY_VIOLATION_MAX_TX",
        details: { attempted_usd: "1.20", limit_usd: "0.50" },
        dashboard_url: "https://app.weftlabs.com/account/policy",
      }),
    );
    const client = new WeftAppClient({
      baseUrl: "http://weft-app",
      fetchImpl: mock.fetch as unknown as typeof fetch,
    });
    const handler = buildFetchHandler(client);
    const res = await handler(
      {
        url: "https://example.test/expensive",
        max_cost_usd: "1.50",
      },
      { requestInfo: { headers: AUTH_HEADERS } },
    );
    expect(res).toMatchObject({ isError: true });
    const text = (res as { content: Array<{ text: string }> }).content[0]!
      .text;
    expect(text).toMatch(/per-transaction policy/);
    expect(text).toMatch(/attempted \$1\.20/);
    expect(text).toMatch(/limit \$0\.50/);
    expect(text).toMatch(
      /See https:\/\/app\.weftlabs\.com\/account\/policy to adjust\./,
    );
  });

  it("maps unknown error codes through with structured detail", async () => {
    const mock = mockFetch(() =>
      jsonResponse(500, { error: "SOMETHING_BROKE", message: "kaboom" }),
    );
    const client = new WeftAppClient({
      baseUrl: "http://weft-app",
      fetchImpl: mock.fetch as unknown as typeof fetch,
    });
    const handler = buildFetchHandler(client);
    const res = await handler(
      { url: "https://x.test/", max_cost_usd: "0.01" },
      { requestInfo: { headers: AUTH_HEADERS } },
    );
    expect(res).toMatchObject({ isError: true });
    const text = (res as { content: Array<{ text: string }> }).content[0]!
      .text;
    expect(text).toMatch(/weft-app error: SOMETHING_BROKE/);
    expect(text).toMatch(/kaboom/);
  });
});

describe("createServer wiring", () => {
  it("registers all three tools at the MCP level", async () => {
    // Reach into the underlying low-level Server and inspect tool registry by
    // calling the public list endpoint. We use the InMemory transport pair so
    // a Client can ask the server to list its tools.
    const { createServer } = await import("../src/index.js");
    const { InMemoryTransport } = await import(
      "@modelcontextprotocol/sdk/inMemory.js"
    );
    const { Client } = await import(
      "@modelcontextprotocol/sdk/client/index.js"
    );

    const fetchSpy = vi.fn();
    const server = createServer({
      weftAppUrl: "http://weft-app",
      publicUrl: "http://localhost:9876",
      fetchImpl: fetchSpy as unknown as typeof fetch,
    });
    const [clientTransport, serverTransport] =
      InMemoryTransport.createLinkedPair();
    const client = new Client({ name: "test", version: "0.0.0" });
    await Promise.all([
      server.connect(serverTransport),
      client.connect(clientTransport),
    ]);
    const tools = await client.listTools();
    const names = tools.tools.map((t) => t.name).sort();
    expect(names).toEqual(["weft.balance", "weft.fetch", "weft.search"]);
    const search = tools.tools.find((t) => t.name === "weft.search");
    expect(search?.description).toMatch(/Free for authenticated buyers in v1/);
    expect(search?.description).not.toMatch(/promo|\$0\.01/);
    await Promise.all([client.close(), server.close()]);
  });
});
