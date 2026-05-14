import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { startHttpServer, type StartedServer } from "../src/index.js";

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
