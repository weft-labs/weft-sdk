/**
 * Public entry point for `@weft-labs/mcp-server`.
 *
 * Exposes:
 *   - `createServer(config)`: build a configured `McpServer` instance with the
 *     three Weft tools registered. Useful for embedders / tests.
 *   - `createHttpHandler(config)`: build a Node `http.RequestListener` that
 *     serves SSE + Streamable HTTP + OAuth discovery + a `/healthz` probe.
 *   - `startHttpServer(config)`: bind a Node http server on a port.
 *
 * The server is stateless: every tool invocation forwards the inbound
 * `Authorization` header to weft-app and returns the result.
 */
import { createServer as createNodeHttpServer, type IncomingMessage, type RequestListener, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WeftAppClient } from "./clients/weft-app.js";
import { registerBalanceTool } from "./tools/balance.js";
import { registerSearchTool } from "./tools/search.js";
import { registerFetchTool } from "./tools/fetch.js";
import { buildProtectedResourceMetadata } from "./auth/oauth.js";
import { SseTransportRouter } from "./transport/sse.js";
import { StreamableHttpRouter } from "./transport/http-stream.js";
import { log } from "./logger.js";

export interface McpServerConfig {
  /** Base URL of weft-app, e.g. `https://app.weftlabs.com`. */
  weftAppUrl: string;
  /** Public origin of THIS MCP server, e.g. `https://mcp.weft.network`. */
  publicUrl: string;
  /**
   * Origin of weft-app's authorization server. Defaults to `weftAppUrl`
   * (weft-app hosts its own OAuth endpoints per spec 09).
   */
  authServerUrl?: string;
  /** Override fetch (tests). */
  fetchImpl?: typeof fetch;
}

export const SERVER_NAME = "weft-mcp-server";
export const SERVER_VERSION = "0.1.0";

/**
 * Build a configured MCP server with the three Weft tools registered.
 *
 * No transport is attached — the caller is responsible for connecting one
 * (SSE, Streamable HTTP, or stdio in tests).
 */
export function createServer(config: McpServerConfig): McpServer {
  const client = new WeftAppClient({
    baseUrl: config.weftAppUrl,
    fetchImpl: config.fetchImpl,
  });
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      capabilities: {
        tools: {},
      },
      instructions:
        "Weft Account tools. weft.balance, weft.search, and weft.fetch all act on the authenticated user's Weft Account.",
    },
  );
  registerBalanceTool(server, client);
  registerSearchTool(server, client);
  registerFetchTool(server, client);
  return server;
}

/** Re-export for tests and embedders that want to inspect tool registration. */
export { WeftAppClient, WeftAppError } from "./clients/weft-app.js";
export { buildProtectedResourceMetadata } from "./auth/oauth.js";
export { normalizeAuthorization, looksLikeApiKey } from "./auth/api-key.js";
export { toMcpErrorResult } from "./tools/error-mapping.js";

/**
 * Build a Node `http.RequestListener` that serves:
 *   - `GET  /.well-known/oauth-protected-resource` — RFC 9728 metadata
 *   - `GET  /healthz`                             — liveness probe
 *   - `GET  /sse`                                 — open an SSE stream
 *   - `POST /messages?sessionId=...`              — JSON-RPC into an SSE stream
 *   - `*    /mcp`                                 — Streamable HTTP transport
 */
export function createHttpHandler(config: McpServerConfig): RequestListener {
  const factory = () => createServer(config);
  const sse = new SseTransportRouter(factory);
  const stream = new StreamableHttpRouter(factory);
  const oauthMetadata = buildProtectedResourceMetadata({
    resourceUrl: config.publicUrl,
    authServerUrl: config.authServerUrl ?? config.weftAppUrl,
  });

  return async (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const url = new URL(req.url ?? "/", "http://localhost");
    const path = url.pathname;

    try {
      if (method === "GET" && path === "/.well-known/oauth-protected-resource") {
        sendJson(res, 200, oauthMetadata);
        return;
      }
      if (method === "GET" && path === "/healthz") {
        sendJson(res, 200, {
          ok: true,
          name: SERVER_NAME,
          version: SERVER_VERSION,
          sse_sessions: sse.size(),
        });
        return;
      }
      if (method === "GET" && path === "/sse") {
        await sse.handleOpen(req, res);
        return;
      }
      if (method === "POST" && path === "/messages") {
        await sse.handleMessage(req, res);
        return;
      }
      if (path === "/mcp") {
        await stream.handle(req, res);
        return;
      }
      sendJson(res, 404, { error: "not_found", path });
    } catch (err) {
      log("error", "handler error", {
        path,
        error: err instanceof Error ? err.message : String(err),
      });
      if (!res.headersSent) {
        sendJson(res, 500, { error: "internal_error" });
      }
    }
  };
}

export interface StartedServer {
  port: number;
  close: () => Promise<void>;
}

/** Bind a Node http server on `port` (or random if 0) and return its handle. */
export async function startHttpServer(
  config: McpServerConfig,
  port: number,
): Promise<StartedServer> {
  const handler = createHttpHandler(config);
  const server = createNodeHttpServer(handler);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address() as AddressInfo;
  log("info", "mcp-server listening", {
    port: address.port,
    weft_app_url: config.weftAppUrl,
    public_url: config.publicUrl,
  });
  return {
    port: address.port,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      }),
  };
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  const buf = Buffer.from(JSON.stringify(body));
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": String(buf.byteLength),
  });
  res.end(buf);
}
