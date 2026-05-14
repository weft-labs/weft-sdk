/**
 * Parameterized coverage for `toMcpErrorResult` over the structured-error
 * codes weft-app emits. Each row asserts:
 *   - `isError: true` on the MCP result
 *   - the user-facing text contains a substring proving the human headline
 *     was selected for this code (not the unknown-code fallback)
 *   - when `dashboard_url` is supplied, the text echoes it under "See …"
 */
import { describe, it, expect } from "vitest";
import { toMcpErrorResult } from "../src/tools/error-mapping.js";
import { WeftAppError } from "../src/clients/weft-app.js";

interface ErrCase {
  code: string;
  details?: Record<string, unknown>;
  /** Regex(es) that must match the rendered MCP error text. */
  textMatches: RegExp[];
  /** Whether to attach a dashboard_url and assert it appears. */
  withDashboardUrl?: boolean;
}

const DASHBOARD_URL = "https://app.weftlabs.com/account/policy";

const CASES: ErrCase[] = [
  {
    code: "POLICY_VIOLATION_MAX_TX",
    details: { attempted_usd: "1.20", limit_usd: "0.50" },
    textMatches: [
      /per-transaction policy/,
      /attempted \$1\.20/,
      /limit \$0\.50/,
    ],
    withDashboardUrl: true,
  },
  {
    code: "POLICY_VIOLATION_DAILY_CAP",
    textMatches: [/Daily spend cap reached/],
    withDashboardUrl: true,
  },
  {
    code: "POLICY_VIOLATION_WEEKLY_CAP",
    textMatches: [/Weekly spend cap reached/],
    withDashboardUrl: true,
  },
  {
    code: "EXCEEDED_MAX_COST",
    details: { quoted_usd: "0.30", max_cost_usd: "0.10" },
    textMatches: [
      /Merchant quoted \$0\.30/,
      /exceeds the requested max_cost_usd/,
      /\(\$0\.10\)/,
    ],
    withDashboardUrl: false,
  },
  {
    code: "INSUFFICIENT_BALANCE",
    textMatches: [/Insufficient balance/],
    withDashboardUrl: true,
  },
  {
    code: "UNAUTHORIZED",
    textMatches: [/Authentication failed/, /re-authoriz/],
    withDashboardUrl: false,
  },
  {
    code: "DENYLISTED_RECIPIENT",
    details: { recipient: "0xBADBAD" },
    textMatches: [/denylist/, /0xBADBAD/],
    withDashboardUrl: false,
  },
  {
    code: "MERCHANT_RETURNED_NON_402",
    details: { status: "500" },
    textMatches: [/x402 payment flow/, /HTTP 500/, /No payment was charged/],
    withDashboardUrl: false,
  },
  {
    code: "ARTIFACT_TOO_LARGE",
    details: { size_bytes: "12345678", limit_bytes: "1048576" },
    textMatches: [/maximum artifact size/, /12345678/, /1048576/],
    withDashboardUrl: false,
  },
  {
    code: "SETTLEMENT_FAILED",
    details: { facilitator: "x402.weft.network" },
    textMatches: [
      /settlement failed/,
      /x402\.weft\.network/,
      /No charge was applied/,
    ],
    withDashboardUrl: true,
  },
];

describe("toMcpErrorResult — parameterized", () => {
  it.each(CASES)("$code renders structured MCP error text", (c) => {
    const err = new WeftAppError(402, {
      error: c.code,
      details: c.details,
      dashboard_url: c.withDashboardUrl ? DASHBOARD_URL : undefined,
    });
    const result = toMcpErrorResult(err);
    expect(result).toMatchObject({ isError: true });
    const text = result.content[0]!.text;
    for (const re of c.textMatches) {
      expect(text).toMatch(re);
    }
    if (c.withDashboardUrl) {
      expect(text).toMatch(
        new RegExp(`See ${DASHBOARD_URL.replace(/[.\\/]/g, "\\$&")} to adjust\\.`),
      );
    } else {
      expect(text).not.toMatch(/See https:\/\//);
    }
    // Confirm we did NOT fall through to the unknown-code default.
    expect(text).not.toMatch(/^weft-app error: /);
  });

  it("falls through to a structured unknown-code rendering with the raw code", () => {
    const err = new WeftAppError(500, {
      error: "SOMETHING_NEW",
      message: "kaboom",
    });
    const result = toMcpErrorResult(err);
    expect(result).toMatchObject({ isError: true });
    expect(result.content[0]!.text).toMatch(
      /^weft-app error: SOMETHING_NEW — kaboom/,
    );
  });

  it("handles non-WeftAppError thrown values", () => {
    const result = toMcpErrorResult(new Error("network down"));
    expect(result).toMatchObject({ isError: true });
    expect(result.content[0]!.text).toBe("Weft MCP error: network down");
  });

  it("handles non-Error throw payloads", () => {
    const result = toMcpErrorResult("plain string");
    expect(result).toMatchObject({ isError: true });
    expect(result.content[0]!.text).toBe("Weft MCP error: unknown failure");
  });
});
