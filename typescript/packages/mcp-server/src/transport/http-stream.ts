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
 *
 * DNS-rebinding protection: when `allowedHosts` is supplied we forward it to
 * the SDK transport and enable host validation. A request whose `Host` header
 * is not in the list is rejected by the SDK. Empty/undefined `allowedHosts`
 * disables host validation (dev-only — see `cli.ts` for the prod guard).
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { AuthInfo } from "@modelcontextprotocol/sdk/server/auth/types.js";
import { log } from "../logger.js";

type ServerFactory = () => McpServer;

export interface StreamableHttpRouterOptions {
  /**
   * Allowed `Host` header values for DNS-rebinding protection. When non-empty,
   * the SDK transport rejects requests whose Host header is not on the list.
   */
  allowedHosts?: string[];
}

export class StreamableHttpRouter {
  private readonly allowedHosts?: string[];

  constructor(
    private readonly createServer: ServerFactory,
    opts: StreamableHttpRouterOptions = {},
  ) {
    this.allowedHosts =
      opts.allowedHosts && opts.allowedHosts.length > 0
        ? opts.allowedHosts
        : undefined;
  }

  /**
   * Handle any request (POST or GET) on the `/mcp` path. We instantiate a
   * fresh transport + server per request because the upstream Node wrapper
   * is per-request in stateless mode.
   */
  async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableDnsRebindingProtection: this.allowedHosts !== undefined,
      allowedHosts: this.allowedHosts,
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
        req as IncomingMessage & { auth?: AuthInfo },
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
