/**
 * Streamable HTTP transport handler (the newer MCP transport).
 *
 * Single endpoint `POST /mcp` (and `GET /mcp` for the server-initiated
 * notification stream). Hosts that support it negotiate this first; Claude.ai
 * prefers it.
 *
 * We run **stateless** mode: `sessionIdGenerator: undefined`. The MCP server
 * itself has zero user state — every call is "read Authorization, forward to
 * weft-app, return". This makes horizontal scaling and serverless deploy
 * trivial.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { log } from "../logger.js";

type ServerFactory = () => McpServer;

export class StreamableHttpRouter {
  constructor(private readonly createServer: ServerFactory) {}

  /**
   * Handle any request (POST or GET) on the `/mcp` path. We instantiate a
   * fresh transport + server per request because the upstream Node wrapper
   * is per-request in stateless mode.
   */
  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    const server = this.createServer();
    try {
      await server.connect(transport);
      res.on("close", () => {
        // Best-effort cleanup; SDK closes its own resources.
        transport.close().catch(() => undefined);
        server.close().catch(() => undefined);
      });
      await transport.handleRequest(
        req as IncomingMessage & { auth?: any },
        res,
      );
    } catch (err) {
      log("error", "stream: handler error", {
        error: err instanceof Error ? err.message : String(err),
      });
      if (!res.headersSent) {
        res.writeHead(500, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "internal_error" }));
      }
    }
  }
}
