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
 * Build the headers the construction-time `/supported` handshake carries.
 *
 * Total by design: this runs in a payment server's boot path, so no input —
 * junk key, junk identity — may ever make it throw. Anything unusable is
 * dropped with a warning and the handshake goes out without it.
 *
 * @param adapter - Which middleware adapter is calling home
 * @param apiKey - The seller's Weft API key, when configured
 * @param identity - Product-level identity from the middleware config
 * @returns Headers to send on the `/supported` call
 */
export function buildHandshakeHeaders(
  adapter: WeftAdapterName,
  apiKey: unknown,
  identity: WeftProductIdentity,
): Record<string, string> {
  const headers: Record<string, string> = {
    "User-Agent": `weft-sdk-${adapter}/${SDK_VERSION}`,
  };

  const key = resolveApiKey(apiKey);
  if (key !== undefined) {
    headers["Authorization"] = `Bearer ${key}`;
  }

  const declared = declaredIdentityValue(identity);
  if (declared !== undefined) {
    headers[WEFT_DECLARED_HEADER] = declared;
  }

  return headers;
}
