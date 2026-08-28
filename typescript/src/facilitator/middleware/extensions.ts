import type { HTTPRequestContext, x402ResourceServer } from "@x402/core/server";
import type {
  PaymentRequiredContext,
  ResourceServerExtension,
} from "@x402/core/types";
import { createWarn, type Warn } from "./product";
import type { WeftRouteConfig, WeftRoutesConfig } from "./product";

/**
 * A route extension whose value is computed per request.
 *
 * Declared in place of a static value under a key of a route's `extensions`,
 * and evaluated at the same point as the `price` callback — while the 402
 * challenge is being built, with the same {@link HTTPRequestContext}. The
 * resolved value ships on the challenge, the buyer's client echoes it onto the
 * payment payload, and the facilitator relays it onto the settlement event, so
 * a seller who prices from the request body can also say what that body asked
 * for:
 *
 * ```ts
 * {
 *   accepts: [{ scheme, network, payTo, price: quote }],
 *   extensions: {
 *     "acme.request": async (context) => {
 *       const { model, max_tokens } = (await context.adapter.getBody()) as Body;
 *       return { info: { model, max_tokens } };
 *     },
 *   },
 * }
 * ```
 *
 * Two rules the callback has to hold to.
 *
 * **It must be deterministic for one request.** The challenge is built twice —
 * once for the unpaid request, once for the buyer's paid retry — and upstream
 * rejects the payment with `extension_echo_mismatch` when what the buyer
 * echoes no longer matches what the retry advertises. Derive the value from
 * the request; never from a clock, a counter or a random source.
 *
 * **It is display-only.** By the time the value reaches a consumer it is
 * unauthenticated buyer input, exactly like every other echoed extension.
 * Attribution stays keyed on the authenticated API key that settled the
 * payment, never on anything in here.
 *
 * The value travels as JSON and is advertised as JSON round-trips it, so a
 * `NaN` arrives as `null` and a function-valued field does not arrive at all.
 * Return plain JSON data and the question never comes up.
 */
export type WeftDynamicExtension = (
  context: HTTPRequestContext,
) => unknown | Promise<unknown>;

/**
 * Largest serialized extensions object, in bytes, the SDK will put on a
 * challenge.
 *
 * Mirrors the facilitator's own `MAX_EXTENSIONS_BYTES` relay cap, and is
 * measured the same way: on the whole object, key names included. The
 * facilitator omits *every* extension when the object is over — `weft.product`
 * with it — so a resolved value that would take the object past the cap is
 * dropped here, on its own key, where the rest of the declaration survives.
 *
 * Keep these blobs small. They describe a request; they are not a place to
 * store one.
 */
export const MAX_EXTENSION_BYTES = 16 * 1024;

/**
 * Recover the HTTP request from the enrichment context.
 *
 * `transportContext` is `unknown` upstream because the resource server is not
 * HTTP-only; the HTTP path always passes `{request}`.
 *
 * @param context - Payment-required enrichment context from `@x402/core`
 * @returns The request context, or undefined off the HTTP transport
 */
function requestOf(
  context: PaymentRequiredContext,
): HTTPRequestContext | undefined {
  const transport = context.transportContext as
    { request?: HTTPRequestContext } | undefined;
  return transport?.request;
}

/**
 * Drop a key that resolved to nothing shippable.
 *
 * Returning `undefined` from the hook means "no change", which would leave the
 * callback *itself* on the challenge — `JSON.stringify` drops a function-valued
 * key, so nothing malformed reaches the wire either way, but the key is removed
 * here so the in-process challenge says the same thing the buyer sees.
 *
 * @param context - Payment-required enrichment context from `@x402/core`
 * @param key - The extension key to remove
 * @returns Always undefined, so the hook makes no assignment of its own
 */
function dropKey(context: PaymentRequiredContext, key: string): undefined {
  delete context.paymentRequiredResponse.extensions?.[key];
  return undefined;
}

/**
 * Serialize a value to JSON, or undefined when JSON cannot carry it.
 *
 * @param value - The value to serialize
 * @returns The JSON text, or undefined for a circular, BigInt or unserializable value
 */
function toJson(value: unknown): string | undefined {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
}

/**
 * Byte length of a string as UTF-8 — what the facilitator's cap counts.
 *
 * @param text - The serialized JSON
 * @returns The length in bytes
 */
function byteLength(text: string): number {
  return new TextEncoder().encode(text).length;
}

/**
 * Size of the whole extensions object once this key holds this value.
 *
 * The facilitator's cap is on the *serialized map*, not on one value: a blob
 * that fits on its own can still push the object past the cap once its key
 * name and `weft.product` are counted, and the facilitator then omits every
 * extension rather than the offender. So the projection is what gets measured.
 *
 * Still an approximation in one direction: keys resolved later in the same
 * challenge are unresolved callbacks here, which serialize to nothing. Each
 * one measures against everything already accepted, so the estimate only
 * improves as the map fills.
 *
 * @param context - Payment-required enrichment context from `@x402/core`
 * @param key - The extension key about to be written
 * @param value - The wire value that key would hold
 * @returns The projected size in bytes, or undefined when the map will not serialize
 */
function projectedBytes(
  context: PaymentRequiredContext,
  key: string,
  value: unknown,
): number | undefined {
  const projected = {
    ...context.paymentRequiredResponse.extensions,
    [key]: value,
  };
  const json = toJson(projected);
  return json === undefined ? undefined : byteLength(json);
}

/**
 * Build the resource-server extension that resolves one dynamic key.
 *
 * Registered once per key, not per route: the route's own declaration arrives
 * as the hook's `declaration` argument, so two routes may declare the same key
 * with different callbacks. A route that declares the key statically is left
 * alone — only a function is resolved.
 *
 * Nothing here throws. A callback that fails costs the seller the blob, never
 * the payment: the key is dropped and the challenge ships without it.
 *
 * @param key - The extension key this hook resolves
 * @param warn - Sink for anything that will not ship
 * @returns An extension to register on the resource server
 */
function dynamicExtension(key: string, warn: Warn): ResourceServerExtension {
  return {
    key,
    async enrichPaymentRequiredResponse(declaration, context) {
      if (typeof declaration !== "function") {
        return undefined;
      }

      const request = requestOf(context);
      if (!request) {
        warn(
          `extensions[${key}] is a callback but no HTTP request context ` +
            `reached it; dropping the key from the challenge`,
          `${key}:no-request`,
        );
        return dropKey(context, key);
      }

      let resolved: unknown;
      try {
        resolved = await (declaration as WeftDynamicExtension)(request);
      } catch (error) {
        warn(
          `extensions[${key}] callback failed; dropping the key from the ` +
            `challenge: ` +
            (error instanceof Error ? error.message : String(error)),
          `${key}:threw`,
        );
        return dropKey(context, key);
      }

      // A callback that returns nothing is opting out for this request — a
      // route that only stamps some requests should not have to warn about
      // the rest.
      if (resolved === undefined || resolved === null) {
        return dropKey(context, key);
      }

      const json = toJson(resolved);
      if (json === undefined) {
        warn(
          `extensions[${key}] callback returned a value JSON cannot carry (a ` +
            `function, a circular reference, a BigInt or similar); dropping ` +
            `the key from the challenge`,
          `${key}:unserializable`,
        );
        return dropKey(context, key);
      }

      // Advertise the round trip, never the original. `JSON.stringify`
      // normalizes — NaN and Infinity become null, functions and symbols
      // vanish — and the paid retry's echo check compares what this hook
      // advertised against the buyer's JSON-decoded copy. Advertising the
      // un-normalized original makes those two disagree and costs the seller
      // the payment, which is the one thing this path must never do.
      const wire: unknown = JSON.parse(json);

      // Checked after the round trip, so a `toJSON` that returns something
      // else is caught alongside a callback that returned it directly.
      if (typeof wire !== "object" || wire === null || Array.isArray(wire)) {
        warn(
          `extensions[${key}] callback returned ${Array.isArray(wire) ? "an array" : `a ${typeof wire}`}; ` +
            `the x402 extensions channel carries objects, so the key is ` +
            `dropped from the challenge`,
          `${key}:not-an-object`,
        );
        return dropKey(context, key);
      }

      const bytes = projectedBytes(context, key, wire) ?? byteLength(json);
      if (bytes > MAX_EXTENSION_BYTES) {
        warn(
          `extensions[${key}] takes the challenge's extensions to ${bytes} ` +
            `bytes, over the ${MAX_EXTENSION_BYTES}-byte facilitator relay ` +
            `cap; dropping the key so the rest of the declaration still ` +
            `reaches settlement`,
          `${key}:over-cap`,
        );
        return dropKey(context, key);
      }

      return wire;
    },
  };
}

/**
 * The route configs in a `RoutesConfig`, in either of its two shapes.
 *
 * @param routes - Route configuration passed by the caller
 * @returns Every route config, ignoring anything that is not one
 */
function routeConfigs(routes: WeftRoutesConfig): WeftRouteConfig[] {
  if (typeof routes !== "object" || routes === null) {
    return [];
  }
  const configs = "accepts" in routes ? [routes] : Object.values(routes);
  return configs.filter(
    (config): config is WeftRouteConfig =>
      typeof config === "object" && config !== null,
  );
}

/**
 * Every extension key declared as a callback by at least one route.
 *
 * @param routes - Route configuration passed by the caller
 * @returns The distinct keys needing per-request resolution
 */
function dynamicExtensionKeys(routes: WeftRoutesConfig): string[] {
  const keys = new Set<string>();
  for (const config of routeConfigs(routes)) {
    const extensions = config.extensions;
    if (typeof extensions !== "object" || extensions === null) {
      continue;
    }
    for (const [key, value] of Object.entries(extensions)) {
      if (typeof value === "function") {
        keys.add(key);
      }
    }
  }
  return [...keys];
}

/**
 * Teach a resource server to resolve the routes' {@link WeftDynamicExtension}
 * callbacks.
 *
 * Upstream reads `routeConfig.extensions` straight off the shared, long-lived
 * route config, so a per-request value cannot be written there without racing
 * every concurrent request. `registerExtension` is the path that *is* request
 * scoped: the enrichment hook runs while the challenge for one request is
 * being built, and its return value replaces that request's copy of the key —
 * which is the same object the verify and settle steps go on to see.
 *
 * A config with no callbacks registers nothing at all.
 *
 * @param server - The resource server the middleware is building on
 * @param routes - Route configuration passed by the caller
 */
export function registerDynamicExtensions(
  server: x402ResourceServer,
  routes: WeftRoutesConfig,
): void {
  const keys = dynamicExtensionKeys(routes);
  if (keys.length === 0) {
    return;
  }

  const warn = createWarn();

  // The peer range is `^2.0.0` and per-key enrichment arrived mid-2.x. On an
  // older build the callback stays a function, which JSON drops: the seller
  // loses the blob, not the payment — but silently, so say it once at boot.
  if (typeof server.registerExtension !== "function") {
    warn(
      `this @x402/core build has no registerExtension, so per-request route ` +
        `extensions (${keys.join(", ")}) cannot be resolved and will not ship`,
    );
    return;
  }

  for (const key of keys) {
    server.registerExtension(dynamicExtension(key, warn));
  }
}
