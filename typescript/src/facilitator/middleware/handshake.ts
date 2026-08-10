import { version as SDK_VERSION } from "../../../package.json";
import { sanitizeProductIdentity, WeftProductIdentity } from "./product";

/**
 * Header that carries the seller's declared product identity on the
 * construction-time `/supported` call.
 *
 * The value is base64url-encoded JSON of `{name, type, tags, icon_url}` —
 * exactly the identity the 402 challenge will carry, so a dashboard fed from
 * the handshake and one fed from settlements agree. Fields nobody declared
 * are absent from the JSON, and the header itself is absent when no identity
 * was declared at all.
 */
export const WEFT_DECLARED_HEADER = "X-Weft-Declared";

/** The middleware adapters a handshake can identify itself as. */
export type WeftAdapterName = "express" | "hono";

/**
 * Encode a string as unpadded base64url without assuming a Node runtime.
 *
 * The Hono middleware runs on edge runtimes where `Buffer` may not exist;
 * `TextEncoder` and `btoa` exist everywhere this package supports.
 *
 * @param value - The string to encode
 * @returns The base64url encoding of the string's UTF-8 bytes
 */
function base64UrlEncode(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Build the `X-Weft-Declared` value for a product identity, if any survives.
 *
 * @param identity - Product-level identity from the middleware config
 * @returns The base64url payload, or undefined when nothing was declared
 */
function declaredIdentityValue(
  identity: WeftProductIdentity,
): string | undefined {
  const declared = sanitizeProductIdentity(identity);

  const payload = {
    ...(declared.name !== undefined && { name: declared.name }),
    ...(declared.type !== undefined && { type: declared.type }),
    ...(declared.tags !== undefined && { tags: declared.tags }),
    ...(declared.iconUrl !== undefined && { icon_url: declared.iconUrl }),
  };

  if (Object.keys(payload).length === 0) {
    return undefined;
  }
  return base64UrlEncode(JSON.stringify(payload));
}

/**
 * Characters that may appear in the `Authorization` value the handshake sends.
 *
 * Printable ASCII excluding space — no real credential contains anything
 * else. The bound exists for log hygiene, not pedantry: a value outside it
 * survives to `fetch`, where undici rejects the header with a `TypeError`
 * that quotes the **entire value**, and upstream `initialize()` prints that
 * error via its own `console.warn` — a live key in the seller's boot output,
 * through a path this SDK cannot intercept. So anything that could trip that
 * error is refused here, before it can become a header.
 */
const HEADER_SAFE = /^[\x21-\x7e]+$/;

/**
 * Read a declared API key, refusing anything that cannot be a credential.
 *
 * The key's value is never logged — not by the warnings here, which name the
 * field and never quote it, and not by anything downstream, because a value
 * that would make the HTTP layer throw (and echo the key back) never leaves
 * this function.
 *
 * @param apiKey - The declared API key, usually from env at runtime
 * @returns The trimmed key, or undefined when absent or unusable
 */
function resolveApiKey(apiKey: unknown): string | undefined {
  if (apiKey === undefined || apiKey === null) {
    return undefined;
  }
  if (typeof apiKey !== "string") {
    console.warn(
      `[weft] ignoring apiKey: expected a string, got ${typeof apiKey}`,
    );
    return undefined;
  }
  const trimmed = apiKey.trim();
  if (trimmed === "") {
    console.warn("[weft] ignoring empty apiKey");
    return undefined;
  }
  if (!HEADER_SAFE.test(trimmed)) {
    console.warn(
      "[weft] ignoring apiKey: it contains whitespace or non-printable " +
        "characters that cannot travel in an HTTP header",
    );
    return undefined;
  }
  return trimmed;
}

/**
 * Header the Weft facilitator reads the seller's API key from on `/settle`
 * and `/verify`.
 *
 * The facilitator's `/settle` handler validates this header and returns 401
 * without it, so a seller who sets `apiKey` and nothing else must have it
 * here or every settlement — the step that credits their wallet — fails.
 * `/verify` does not require the key, but the facilitator reads it when
 * present and stamps the verification event with the key's digest; the SDK
 * sends it there too so the seller's funnel attributes verification attempts
 * instead of counting settlements against zero. `/supported` carries the same
 * key as a bearer for the handshake, so one key travels under two header names
 * by the facilitator's own design, not the SDK's whim.
 */
export const WEFT_API_KEY_HEADER = "X-API-Key";

/**
 * Auth headers the SDK derives from `apiKey`, keyed by the facilitator path
 * each belongs to — the shape `@x402/core`'s `createAuthHeaders` expects.
 *
 * `supported` always carries at least a `User-Agent`. `settle` and `verify`
 * are present only when a usable key was configured — they carry the same
 * `X-API-Key`, so the facilitator credits the wallet on `/settle` and
 * attributes the verification funnel on `/verify` from one credential. An
 * empty `X-API-Key` is a failed settlement dressed up as a configured one, so
 * neither is present without a usable key.
 */
export interface WeftFacilitatorAuthHeaders {
  supported: Record<string, string>;
  settle?: Record<string, string>;
  verify?: Record<string, string>;
}

/**
 * Build the auth headers the SDK adds to the facilitator calls it drives.
 *
 * Total by design: this runs in a payment server's boot path, so no input —
 * junk key, junk identity — may ever make it throw. Anything unusable is
 * dropped with a warning and the calls go out without it.
 *
 * The key is validated once here and reused across every path, so a
 * malformed key warns a single time and reaches none of the `/supported`
 * bearer, the `/settle` `X-API-Key`, or the `/verify` `X-API-Key`.
 *
 * @param adapter - Which middleware adapter is calling home
 * @param apiKey - The seller's Weft API key, when configured
 * @param identity - Product-level identity from the middleware config
 * @returns Per-path auth headers for the facilitator calls
 */
export function buildFacilitatorAuthHeaders(
  adapter: WeftAdapterName,
  apiKey: unknown,
  identity: WeftProductIdentity,
): WeftFacilitatorAuthHeaders {
  const key = resolveApiKey(apiKey);

  const supported: Record<string, string> = {
    "User-Agent": `weft-sdk-${adapter}/${SDK_VERSION}`,
  };
  if (key !== undefined) {
    supported["Authorization"] = `Bearer ${key}`;
  }

  const declared = declaredIdentityValue(identity);
  if (declared !== undefined) {
    supported[WEFT_DECLARED_HEADER] = declared;
  }

  const settle = key !== undefined ? { [WEFT_API_KEY_HEADER]: key } : undefined;
  const verify = key !== undefined ? { [WEFT_API_KEY_HEADER]: key } : undefined;

  return {
    supported,
    ...(settle !== undefined && { settle }),
    ...(verify !== undefined && { verify }),
  };
}
