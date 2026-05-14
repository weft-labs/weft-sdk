/**
 * Structured stdout logger. Intentionally minimal: one JSON object per line.
 *
 * Privacy rule (per spec): we never log request bodies, fetched artifact
 * bodies, or full bearer tokens. Tokens are hashed and we keep only the first
 * 8 hex chars so a leaked log line cannot reconstruct credentials but
 * operators can still correlate sessions.
 */
import { createHash } from "node:crypto";

export interface LogFields {
  tool?: string;
  status?: number | string;
  latency_ms?: number;
  token_prefix?: string;
  error?: string;
  [key: string]: unknown;
}

export function log(level: "info" | "warn" | "error", msg: string, fields: LogFields = {}): void {
  const line = {
    ts: new Date().toISOString(),
    level,
    msg,
    ...fields,
  };
  process.stdout.write(`${JSON.stringify(line)}\n`);
}

/**
 * Hash a bearer token and return the first 8 hex chars, prefixed with the
 * algorithm name. Returns "anon" if the token is empty/missing.
 */
export function hashTokenPrefix(authorizationHeader: string | undefined): string {
  if (!authorizationHeader) return "anon";
  const token = authorizationHeader.replace(/^Bearer\s+/i, "").trim();
  if (token.length === 0) return "anon";
  const digest = createHash("sha256").update(token).digest("hex");
  return `sha256:${digest.slice(0, 8)}`;
}
