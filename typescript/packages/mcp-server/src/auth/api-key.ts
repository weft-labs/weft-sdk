/**
 * API-key alternative auth.
 *
 * weft-app's unified auth resolver (spec 08) accepts both OAuth bearer tokens
 * and API keys in the same `Authorization` header — API keys use the same
 * `Bearer <token>` shape with a `wk_live_` / `wk_test_` prefix.
 *
 * This file therefore does not validate or distinguish key types; it provides
 * one helper that normalizes a few common forms hosts have been observed to
 * send (raw key without scheme, `Bearer wk_live_...`, `ApiKey wk_live_...`)
 * into a canonical `Bearer wk_live_...` header. Anything else is passed
 * through untouched.
 */

const KEY_PREFIXES = ["wk_live_", "wk_test_"];

/**
 * Normalize an incoming Authorization header. Always returns a string of the
 * form `Bearer <token>` so the downstream weft-app client can forward it
 * verbatim.
 */
export function normalizeAuthorization(
  raw: string | undefined,
): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return undefined;

  // Bearer <something> — pass through.
  if (/^bearer\s+/i.test(trimmed)) {
    return `Bearer ${trimmed.replace(/^bearer\s+/i, "").trim()}`;
  }

  // ApiKey <something> — rewrite to Bearer.
  if (/^apikey\s+/i.test(trimmed)) {
    return `Bearer ${trimmed.replace(/^apikey\s+/i, "").trim()}`;
  }

  // Raw key (no scheme) — only accept Weft-shaped prefixes; otherwise we
  // refuse to guess.
  if (KEY_PREFIXES.some((p) => trimmed.startsWith(p))) {
    return `Bearer ${trimmed}`;
  }

  return undefined;
}

/**
 * Cheap sanity check: does the value look like one of the Weft API-key shapes?
 * Used only for log/metric tagging, not for auth decisions (weft-app is the
 * authority).
 */
export function looksLikeApiKey(authorization: string | undefined): boolean {
  if (!authorization) return false;
  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  return KEY_PREFIXES.some((p) => token.startsWith(p));
}
