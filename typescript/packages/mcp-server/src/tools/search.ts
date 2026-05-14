/**
 * `weft.search` — search the Weft index for paid x402 resources.
 *
 * v1 scope (override of spec 12): this is a free authenticated passthrough
 * to `POST /api/v1/search`. Spec 10 (freemium promo + per-call billing) is
 * deferred to a later release.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { WeftAppClient } from "../clients/weft-app.js";
import { extractAuthorization } from "../auth/oauth.js";
import { normalizeAuthorization } from "../auth/api-key.js";
import { toMcpErrorResult } from "./error-mapping.js";
import { hashTokenPrefix, log } from "../logger.js";
import type { ToolExtra } from "./balance.js";

export const SEARCH_TOOL_NAME = "weft.search";
export const SEARCH_TOOL_DESCRIPTION =
  "Search the Weft index for paid x402 resources. Free for authenticated buyers in v1; billing is added in a later release.";

export const searchInputSchema = {
  query: z.string().min(1).describe("Free-text query"),
  limit: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .describe("Max number of hits (1-50, default 10)"),
};

export interface SearchArgs {
  query: string;
  limit?: number;
}

export function buildSearchHandler(client: WeftAppClient) {
  return async (args: SearchArgs, extra: ToolExtra) => {
    const t0 = Date.now();
    const headers = extra.requestInfo?.headers ?? {};
    const authorization = normalizeAuthorization(extractAuthorization(headers));
    const tokenPrefix = hashTokenPrefix(authorization);

    if (!authorization) {
      log("warn", "weft.search: missing auth", {
        tool: SEARCH_TOOL_NAME,
        token_prefix: tokenPrefix,
      });
      return toMcpErrorResult(
        new Error(
          "Missing Authorization header. Re-authorize the Weft MCP server (OAuth) or set an API key.",
        ),
      );
    }

    try {
      const data = await client.search(authorization, {
        query: args.query,
        limit: args.limit,
      });
      // Privacy rule: don't log the query string itself.
      log("info", "weft.search ok", {
        tool: SEARCH_TOOL_NAME,
        status: 200,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
        hits: data.hits?.length ?? 0,
      });
      return {
        content: [
          { type: "text" as const, text: JSON.stringify(data, null, 2) },
        ],
        structuredContent: data as unknown as Record<string, unknown>,
      };
    } catch (err) {
      log("warn", "weft.search err", {
        tool: SEARCH_TOOL_NAME,
        latency_ms: Date.now() - t0,
        token_prefix: tokenPrefix,
        error: err instanceof Error ? err.message : String(err),
      });
      return toMcpErrorResult(err);
    }
  };
}

export function registerSearchTool(
  server: McpServer,
  client: WeftAppClient,
): void {
  const handler = buildSearchHandler(client);
  server.registerTool(
    SEARCH_TOOL_NAME,
    {
      title: "Weft Search",
      description: SEARCH_TOOL_DESCRIPTION,
      inputSchema: searchInputSchema,
    },
    handler as Parameters<typeof server.registerTool>[2],
  );
}
