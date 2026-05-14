/**
 * Maps a thrown weft-app structured error into an MCP tool result so the
 * agent host (Claude.ai, Claude Code, Cursor) can render a useful message
 * to the user, including the dashboard URL where they can adjust policy.
 *
 * MCP spec: tool errors are surfaced via `isError: true` plus a text-content
 * payload; the MCP host then exposes that text to the model.
 *   https://modelcontextprotocol.io/specification/draft/server/tools
 */
import { WeftAppError } from "../clients/weft-app.js";

export interface McpErrorResult {
  isError: true;
  content: Array<{ type: "text"; text: string }>;
}

/** Convert an unknown thrown value into a structured MCP tool-error result. */
export function toMcpErrorResult(err: unknown): McpErrorResult {
  if (err instanceof WeftAppError) {
    return { isError: true, content: [{ type: "text", text: renderWeftAppError(err) }] };
  }
  if (err instanceof Error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Weft MCP error: ${err.message}` }],
    };
  }
  return {
    isError: true,
    content: [{ type: "text", text: "Weft MCP error: unknown failure" }],
  };
}

function renderWeftAppError(err: WeftAppError): string {
  const headline = humanHeadline(err);
  const dashLine = err.dashboardUrl
    ? ` See ${err.dashboardUrl} to adjust.`
    : "";
  return `${headline}${dashLine}`;
}

/**
 * Translate the structured `error` code from weft-app into a user-readable
 * sentence. Falls back to the raw code when unknown so the agent still has
 * machine-grep-able signal.
 */
function humanHeadline(err: WeftAppError): string {
  switch (err.code) {
    case "POLICY_VIOLATION_MAX_TX": {
      const attempted = pickString(err.details, "attempted_usd");
      const limit = pickString(err.details, "limit_usd");
      return `Request blocked by your Weft per-transaction policy${
        attempted && limit ? ` (attempted $${attempted}, limit $${limit})` : ""
      }.`;
    }
    case "POLICY_VIOLATION_DAILY_CAP":
      return "Daily spend cap reached on your Weft account.";
    case "POLICY_VIOLATION_WEEKLY_CAP":
      return "Weekly spend cap reached on your Weft account.";
    case "EXCEEDED_MAX_COST": {
      const quoted = pickString(err.details, "quoted_usd");
      const max = pickString(err.details, "max_cost_usd");
      return `Merchant quoted${quoted ? ` $${quoted}` : ""} which exceeds the requested max_cost_usd${
        max ? ` ($${max})` : ""
      }.`;
    }
    case "INSUFFICIENT_BALANCE":
      return "Insufficient balance on your Weft account.";
    case "UNAUTHORIZED":
      return "Authentication failed. The MCP host's token may be expired — try re-authorizing.";
    case "DENYLISTED_RECIPIENT": {
      const recipient = pickString(err.details, "recipient");
      return `Request blocked: the merchant/recipient${
        recipient ? ` (${recipient})` : ""
      } is on the Weft denylist.`;
    }
    case "MERCHANT_RETURNED_NON_402": {
      const status = pickString(err.details, "status");
      return `Merchant did not honor the x402 payment flow${
        status ? ` (returned HTTP ${status})` : ""
      }. No payment was charged.`;
    }
    case "ARTIFACT_TOO_LARGE": {
      const size = pickString(err.details, "size_bytes");
      const limit = pickString(err.details, "limit_bytes");
      return `Merchant response exceeds the maximum artifact size${
        size && limit ? ` (${size} bytes > limit ${limit} bytes)` : ""
      }.`;
    }
    case "SETTLEMENT_FAILED": {
      const facilitator = pickString(err.details, "facilitator");
      return `Payment settlement failed${
        facilitator ? ` at facilitator ${facilitator}` : ""
      }. No charge was applied; please retry.`;
    }
    default:
      return `weft-app error: ${err.code}${err.message && err.message !== err.code ? ` — ${err.message}` : ""}`;
  }
}

function pickString(
  details: Record<string, unknown> | undefined,
  key: string,
): string | undefined {
  if (!details) return undefined;
  const v = details[key];
  return typeof v === "string" ? v : undefined;
}
