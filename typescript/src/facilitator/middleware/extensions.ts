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
 */
export type WeftDynamicExtension = (
  context: HTTPRequestContext,
) => unknown | Promise<unknown>;

/**
 * Largest resolved value, in bytes, that the SDK will put on a challenge.
 *
 * Mirrors the facilitator's own `MAX_EXTENSIONS_BYTES` relay cap. The
 * facilitator applies it to the *whole* extensions object and omits the whole
 * object when it is over — which would take `weft.product` down with an
 * oversized per-request blob. So an oversized value is dropped here, on its
 * own key, where the rest of the declaration survives.
 *
 * This is a per-key guard against a whole-map cap: several fat keys can still
 * add up past it. Keep these blobs small — they describe a request, they are
 * not a place to store one.
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
 * Byte length of a value as JSON, or undefined when it cannot be serialized.
 *
 * @param value - The resolved extension value
 * @returns The serialized size in bytes, or undefined
 */
function jsonBytes(value: unknown): number | undefined {
  try {
    const json = JSON.stringify(value);
    return json === undefined
      ? undefined
      : new TextEncoder().encode(json).length;
  } catch {
    return undefined;
  }
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
        );
        return dropKey(context, key);
      }

      // A callback that returns nothing is opting out for this request — a
      // route that only stamps some requests should not have to warn about
      // the rest.
      if (resolved === undefined || resolved === null) {
        return dropKey(context, key);
      }

      if (typeof resolved !== "object" || Array.isArray(resolved)) {
        warn(
          `extensions[${key}] callback returned ${typeof resolved === "object" ? "an array" : `a ${typeof resolved}`}; ` +
            `the x402 extensions channel carries objects, so the key is ` +
            `dropped from the challenge`,
        );
        return dropKey(context, key);
      }

      const bytes = jsonBytes(resolved);
      if (bytes === undefined) {
        warn(
          `extensions[${key}] callback returned a value that is not JSON ` +
            `(circular, BigInt or similar); dropping the key from the challenge`,
        );
        return dropKey(context, key);
      }
      if (bytes > MAX_EXTENSION_BYTES) {
        warn(
          `extensions[${key}] resolved to ${bytes} bytes, over the ` +
            `${MAX_EXTENSION_BYTES}-byte facilitator relay cap; dropping the ` +
            `key so the rest of the declaration still reaches settlement`,
        );
        return dropKey(context, key);
      }

      return resolved;
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
