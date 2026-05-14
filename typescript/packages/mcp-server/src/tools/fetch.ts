/**
 * `weft.fetch` — fetch a URL, paying any x402 challenge it returns from the
 * user's Weft wallet within their spending policy.
 *
 * Relays to `POST /api/v1/fetch` (spec 11 — the fetch proxy + artifact
 * storage). The MCP server itself never holds keys, never signs anything; it
 * just forwards the inbound bearer.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { WeftAppClient } from "../clients/weft-app.js";
import { extractAuthorization } from "../auth/oauth.js";
import { normalizeAuthorization } from "../auth/api-key.js";
import { toMcpErrorResult } from "./error-mapping.js";
import { hashTokenPrefix, log } from "../logger.js";
import type { ToolExtra } from "./balance.js";

export const FETCH_TOOL_NAME = "weft.fetch";
export const FETCH_TOOL_DESCRIPTION =
  "Fetch a URL, paying any x402 challenge it returns from the user's Weft wallet (within their spending policy). Returns the response body, payment receipt, and merchant reputation.";

export const fetchInputSchema = {
  url: z.string().url().describe("Target URL"),
  max_cost_usd: z
    .string()
    .regex(/^\d+(\.\d{1,6})?$/)
    .describe("Maximum USD this call is allowed to spend, e.g. \"0.10\""),
  method: z
    .enum(["GET", "POST"])
    .optional()
    .describe("HTTP method (default GET)"),
  body: z.string().optional().describe("Request body, if any"),
  headers: z
    .record(z.string(), z.string())
    .optional()
    .describe("Extra request headers"),
};

export interface FetchArgs {
  url: string;
  max_cost_usd: string;
  method?: "GET" | "POST";
  body?: string;
  headers?: Record<string, string>;
}

export function buildFetchHandler(client: WeftAppClient) {
  return async (args: FetchArgs, extra: ToolExtra) => {
    const t0 = Date.now();
    const headers = extra.requestInfo?.headers ?? {};
    const authorization = normalizeAuthorization(extractAuthorization(headers));
    const tokenPrefix = hashTokenPrefix(authorization);

    if (!authorization) {
      log("warn", "weft.fetch: missing auth", {
        tool: FETCH_TOOL_NAME,
        token_prefix: tokenPrefix,
      });
      return toMcpErrorResult(
        new Error(
          "Missing Authorization header. Re-authorize the Weft MCP server (OAuth) or set an API key.",
        ),
      );
    }

    try {
      const data = await client.fetchResource(authorization, {
        url: args.url,
        max_cost_usd: args.max_cost_usd,
        method: args.method,
        body: args.body,
        headers: args.headers,
      });
      // Privacy rule: don't log the URL query string or response body.
      log("info", "weft.fetch ok", {
        tool: FETCH_TOOL_NAME,
        status: data.status,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
        paid: data.payment ? true : false,
      });
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
        structuredContent: data as unknown as Record<string, unknown>,
      };
    } catch (err) {
      log("warn", "weft.fetch err", {
        tool: FETCH_TOOL_NAME,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
        error: err instanceof Error ? err.message : String(err),
      });
      return toMcpErrorResult(err);
    }
  };
}

export function registerFetchTool(
  server: McpServer,
  client: WeftAppClient,
): void {
  const handler = buildFetchHandler(client);
  server.registerTool(
    FETCH_TOOL_NAME,
    {
      title: "Weft Fetch",
      description: FETCH_TOOL_DESCRIPTION,
      inputSchema: fetchInputSchema,
    },
    handler as Parameters<typeof server.registerTool>[2],
  );
}
