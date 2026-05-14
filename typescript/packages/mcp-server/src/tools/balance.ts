/**
 * `weft.balance` — returns the agent/user's current Weft Account balance,
 * promo credit, spending policy, and spent-today/week totals.
 *
 * This is a thin relay over `POST /api/v1/balance`. The MCP transport layer
 * injects the inbound `Authorization` header into `extra.requestInfo.headers`;
 * we forward it verbatim.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { WeftAppClient } from "../clients/weft-app.js";
import { extractAuthorization } from "../auth/oauth.js";
import { normalizeAuthorization } from "../auth/api-key.js";
import { toMcpErrorResult } from "./error-mapping.js";
import { hashTokenPrefix, log } from "../logger.js";

export const BALANCE_TOOL_NAME = "weft.balance";
export const BALANCE_TOOL_DESCRIPTION =
  "Get the current Weft Account balance, promo credit, spending policy, and spent-today/week totals.";

export type ToolExtra = {
  requestInfo?: {
    headers: Record<string, string | string[] | undefined>;
  };
};

export function buildBalanceHandler(client: WeftAppClient) {
  return async (_args: Record<string, never>, extra: ToolExtra) => {
    const t0 = Date.now();
    const headers = extra.requestInfo?.headers ?? {};
    const authorization = normalizeAuthorization(extractAuthorization(headers));
    const tokenPrefix = hashTokenPrefix(authorization);

    if (!authorization) {
      log("warn", "weft.balance: missing auth", {
        tool: BALANCE_TOOL_NAME,
        token_prefix: tokenPrefix,
      });
      return toMcpErrorResult(
        new Error(
          "Missing Authorization header. Re-authorize the Weft MCP server (OAuth) or set an API key.",
        ),
      );
    }

    try {
      const data = await client.balance(authorization);
      log("info", "weft.balance ok", {
        tool: BALANCE_TOOL_NAME,
        status: 200,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
      });
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
        structuredContent: data as unknown as Record<string, unknown>,
      };
    } catch (err) {
      log("warn", "weft.balance err", {
        tool: BALANCE_TOOL_NAME,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
        error: err instanceof Error ? err.message : String(err),
      });
      return toMcpErrorResult(err);
    }
  };
}

export function registerBalanceTool(
  server: McpServer,
  client: WeftAppClient,
): void {
  const handler = buildBalanceHandler(client);
  server.registerTool(
    BALANCE_TOOL_NAME,
    {
      title: "Weft Balance",
      description: BALANCE_TOOL_DESCRIPTION,
      inputSchema: {},
    },
    handler as Parameters<typeof server.registerTool>[2],
  );
}
