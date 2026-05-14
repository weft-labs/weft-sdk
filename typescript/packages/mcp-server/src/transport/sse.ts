/**
 * SSE transport handler.
 *
 * Hosts that pre-date the Streamable HTTP transport (some Claude.ai builds,
 * older Cursor) still negotiate via the legacy SSE shape:
 *   GET  /sse           — opens an event-stream
 *   POST /messages?...  — sends JSON-RPC into the open stream by sessionId
 *
 * We keep a session map in memory. The MCP server is stateless w.r.t. the
 * user (no DB), but per-process it must remember "which SSE response stream
 * belongs to which sessionId" for the duration of the connection. Lost on
 * process restart — fine, clients reconnect.
 *
 * Marked deprecated by upstream but still required for compatibility.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IncomingMessage, ServerResponse } from "node:http";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { log } from "../logger.js";

type ServerFactory = () => McpServer;

export class SseTransportRouter {
  private readonly transports = new Map<string, SSEServerTransport>();

  constructor(
    private readonly createServer: ServerFactory,
    private readonly postPath: string = "/messages",
  ) {}

  /** GET /sse — open a new SSE stream. */
  async handleOpen(_req: IncomingMessage, res: ServerResponse): Promise<void> {
    const transport = new SSEServerTransport(this.postPath, res);
    this.transports.set(transport.sessionId, transport);

    transport.onclose = () => {
      this.transports.delete(transport.sessionId);
      log("info", "sse: stream closed", { session: transport.sessionId.slice(0, 8) });
    };

    const server = this.createServer();
    await server.connect(transport);
    log("info", "sse: stream opened", { session: transport.sessionId.slice(0, 8) });
  }

  /** POST /messages?sessionId=... — deliver a JSON-RPC message. */
  async handleMessage(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const url = new URL(req.url ?? "/", "http://localhost");
    const sessionId = url.searchParams.get("sessionId");
    if (!sessionId) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "missing sessionId" }));
      return;
    }
    const transport = this.transports.get(sessionId);
    if (!transport) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "session not found" }));
      return;
    }
    await transport.handlePostMessage(req as IncomingMessage & { auth?: any }, res);
  }

  /** Number of live SSE sessions (for /healthz, metrics). */
  size(): number {
    return this.transports.size;
  }
}
