import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { request as httpRequest } from "node:http";
import { startHttpServer, type StartedServer } from "../src/index.js";

interface RawResponse {
  status: number;
  headers: Record<string, string | string[] | undefined>;
  body: string;
}

/**
 * Low-level HTTP request that lets us forge the `Host` header. The WHATWG
 * `fetch` (Node 18+) strips and re-sets `Host` on the wire, so we cannot use
 * it to test DNS-rebinding behavior.
 */
function rawRequest(opts: {
  port: number;
  method: string;
  path: string;
  host: string;
  headers?: Record<string, string>;
  body?: string;
}): Promise<RawResponse> {
  return new Promise<RawResponse>((resolve, reject) => {
    const req = httpRequest(
      {
        host: "127.0.0.1",
        port: opts.port,
        method: opts.method,
        path: opts.path,
        headers: { host: opts.host, ...(opts.headers ?? {}) },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () =>
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString("utf8"),
          }),
        );
      },
    );
    req.on("error", reject);
    if (opts.body !== undefined) req.write(opts.body);
    req.end();
  });
}

let server: StartedServer;

beforeAll(async () => {
  server = await startHttpServer(
    {
      weftAppUrl: "http://weft-app.test",
      publicUrl: "https://mcp.weft.network",
      authServerUrl: "https://app.weftlabs.com",
    },
    0, // random free port
  );
});

afterAll(async () => {
  await server.close();
});

describe("HTTP server", () => {
  it("serves /.well-known/oauth-protected-resource", async () => {
    const res = await fetch(
      `http://127.0.0.1:${server.port}/.well-known/oauth-protected-resource`,
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toMatch(/application\/json/);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toMatchObject({
      resource: "https://mcp.weft.network",
      authorization_servers: ["https://app.weftlabs.com"],
      bearer_methods_supported: ["header"],
    });
    expect(body.scopes_supported).toEqual([
      "weft.balance",
      "weft.search",
      "weft.fetch",
    ]);
  });

  it("serves /healthz", async () => {
    const res = await fetch(`http://127.0.0.1:${server.port}/healthz`);
    expect(res.status).toBe(200);
    const body = (await res.json()) as Record<string, unknown>;
    expect(body).toMatchObject({ ok: true, name: "weft-mcp-server" });
  });

  it("returns 404 for unknown paths", async () => {
    const res = await fetch(`http://127.0.0.1:${server.port}/nope`);
    expect(res.status).toBe(404);
  });
});

describe("DNS-rebinding protection (allowedHosts)", () => {
  let protectedServer: StartedServer;
  const allowedHost = "mcp.weft.network";

  beforeAll(async () => {
    protectedServer = await startHttpServer(
      {
        weftAppUrl: "http://weft-app.test",
        publicUrl: "http://localhost",
        allowedHosts: [allowedHost],
      },
      0,
    );
  });

  afterAll(async () => {
    await protectedServer.close();
  });

  it("Streamable HTTP /mcp rejects an evil Host header", async () => {
    const res = await rawRequest({
      port: protectedServer.port,
      method: "POST",
      path: "/mcp",
      host: "evil.attacker.com",
      headers: {
        "content-type": "application/json",
        accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "tools/list",
        params: {},
      }),
    });
    // SDK returns a 4xx (typically 403) when the Host fails validation.
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
    // Confirm the body cites host validation rather than e.g. a JSON-RPC error.
    expect(res.body.toLowerCase()).toMatch(/host|origin|rebind|not allowed/);
  });

  it("Streamable HTTP /mcp accepts an allowed Host header", async () => {
    const res = await rawRequest({
      port: protectedServer.port,
      method: "POST",
      path: "/mcp",
      host: allowedHost,
      headers: {
        "content-type": "application/json",
        accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "test", version: "0.0.0" },
        },
      }),
    });
    // We don't care about the JSON-RPC body — just that host validation did
    // not short-circuit the request as a 4xx host failure.
    expect(res.status).toBeLessThan(400);
  });

  it("SSE GET /sse rejects an evil Host header", async () => {
    const res = await rawRequest({
      port: protectedServer.port,
      method: "GET",
      path: "/sse",
      host: "evil.attacker.com",
      headers: { accept: "text/event-stream" },
    });
    expect(res.status).toBe(421);
    const body = JSON.parse(res.body) as Record<string, unknown>;
    expect(body).toMatchObject({ error: "host_not_allowed" });
  });

  it("SSE POST /messages rejects an evil Host header", async () => {
    // Even with a bogus sessionId, the SDK transport's Host check must run
    // before any session validation — but since we reject GETs at our layer
    // and POSTs go through the SDK transport, the SDK either short-circuits
    // on Host or hits the session lookup (which here returns 404). Either
    // way the response should not be a 200 leak.
    const res = await rawRequest({
      port: protectedServer.port,
      method: "POST",
      path: "/messages?sessionId=unknown",
      host: "evil.attacker.com",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "ping" }),
    });
    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.status).toBeLessThan(500);
  });
});
