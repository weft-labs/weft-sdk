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
 *
 * DNS-rebinding protection: when `allowedHosts` is supplied we forward it to
 * the SDK transport and enable host validation on the POST /messages call.
 * GET /sse stream-open requests also have their Host header validated.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { log } from "../logger.js";

type ServerFactory = () => McpServer;

export interface SseTransportRouterOptions {
  /**
   * Allowed `Host` header values for DNS-rebinding protection. When non-empty,
   * the SDK transport rejects POST /messages requests whose Host header is
   * not on the list, and the router rejects GET /sse open requests whose
   * Host header is not on the list.
   */
  allowedHosts?: string[];
}

export class SseTransportRouter {
  private readonly transports = new Map<string, SSEServerTransport>();
  private readonly allowedHosts?: string[];

  constructor(
    private readonly createServer: ServerFactory,
    private readonly postPath: string = "/messages",
    opts: SseTransportRouterOptions = {},
  ) {
    this.allowedHosts =
      opts.allowedHosts && opts.allowedHosts.length > 0
        ? opts.allowedHosts
        : undefined;
  }

  /** GET /sse — open a new SSE stream. */
  async handleOpen(req: IncomingMessage, res: ServerResponse): Promise<void> {
    // SSE GET /sse open doesn't pass through the SDK transport's Host check
    // (that happens on POST /messages). Enforce it here so a DNS-rebind
    // attacker can't even open a stream.
    if (this.allowedHosts !== undefined) {
      const host = (req.headers.host ?? "").toLowerCase();
      const allowed = this.allowedHosts.some(
        (h) => h.toLowerCase() === host,
      );
      if (!allowed) {
        log("warn", "sse: rejected open by host check", { host });
        res.writeHead(421, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "host_not_allowed" }));
        return;
      }
    }

    const transport = new SSEServerTransport(this.postPath, res, {
      enableDnsRebindingProtection: this.allowedHosts !== undefined,
      allowedHosts: this.allowedHosts,
    });
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
    await transport.handlePostMessage(
      req as IncomingMessage & { auth?: AuthInfo },
      res,
    );
  }

  /** Number of live SSE sessions (for /healthz, metrics). */
  size(): number {
    return this.transports.size;
  }
}
