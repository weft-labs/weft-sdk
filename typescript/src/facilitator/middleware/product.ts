import type { RouteConfig, RoutesConfig } from "@x402/core/server";

/**
 * What kind of thing the seller is selling.
 *
 * Deliberately small. If you need a kind that is not here, use `tags`.
 */
export type WeftProductType = "api" | "agent" | "mcp";

/**
 * Reserved tag prefix that carries {@link WeftProductIdentity.type} on the wire.
 *
 * `ResourceInfo` in the x402 protocol has no field for a product kind, and the
 * facilitator only relays `serviceName`, `tags` and `iconUrl` to the settlement
 * event. `tags` is therefore the only channel a product type can travel in, so
 * the SDK encodes it as one reserved tag — `weft:type:api`, `weft:type:agent`,
 * `weft:type:mcp`.
 *
 * The prefix is namespaced so it cannot collide with a seller's own free-text
 * tags, stays readable in a raw settlement row, and is matched downstream with
 * a plain `startsWith`. The SDK guarantees at most one such tag per route: any
 * `weft:type:*` value a caller puts in `tags` is dropped in favour of `type`.
 */
export const WEFT_TYPE_TAG_PREFIX = "weft:type:";

/**
 * Bounds the x402 protocol declares for `ResourceInfo.tags`.
 *
 * `ResourceInfoSchema` in `@x402/core/schemas` caps tags at five entries of at
 * most 32 printable-ASCII characters each. No code path inside `@x402/core`
 * applies that schema today, but it is the published contract: a counterparty
 * that validates will reject the challenge, and the Weft facilitator drops the
 * whole `tags` array — type tag included — rather than filtering it, if any
 * single entry is out of bounds.
 *
 * The SDK therefore keeps what it emits inside these bounds. Note that a
 * declared `type` spends one of the five slots, leaving four for the seller.
 */
const MAX_TAGS = 5;
const MAX_TAG_CHARS = 32;
const PRINTABLE_ASCII = /^[\x20-\x7e]+$/;

/**
 * Longest `serviceName` the x402 schema allows, in characters.
 */
const MAX_SERVICE_NAME_CHARS = 32;

/**
 * Product-level identity, declared once and applied to every protected route.
 *
 * This is what turns a settlement into a named product in the Weft dashboard.
 * Every field is optional; a middleware configured without any of them behaves
 * exactly as it did before this identity existed.
 */
export interface WeftProductIdentity {
  /**
   * Display name of the product, e.g. `"Acme Pricing API"`.
   *
   * Travels as `ResourceInfo.serviceName` on the 402 challenge.
   */
  name?: string;

  /**
   * What kind of product this is.
   *
   * Travels as a reserved `weft:type:<type>` tag — see {@link WEFT_TYPE_TAG_PREFIX}.
   */
  type?: WeftProductType;

  /**
   * Free-text tags describing the product, e.g. `["finance", "pricing"]`.
   *
   * Travels as `ResourceInfo.tags`. Tags starting with `weft:type:` are
   * reserved and are replaced by {@link WeftProductIdentity.type}.
   *
   * The x402 protocol allows five tags of at most 32 printable-ASCII
   * characters. A declared `type` uses one slot, so four remain. Anything
   * beyond that is dropped with a warning rather than being put on the wire,
   * because an out-of-bounds array costs the seller every tag they declared.
   */
  tags?: string[];

  /**
   * Absolute URL of an icon for the product.
   *
   * Travels as `ResourceInfo.iconUrl`.
   */
  iconUrl?: string;
}

/**
 * Build the reserved tag for a product type.
 *
 * @param type - The product type to encode
 * @returns The reserved tag, e.g. `weft:type:api`
 */
export function productTypeTag(type: WeftProductType): string {
  return `${WEFT_TYPE_TAG_PREFIX}${type}`;
}

/**
 * Whether any identity field was actually declared.
 *
 * @param identity - Product-level identity from the middleware config
 * @returns True when at least one field is set
 */
function hasIdentity(identity: WeftProductIdentity): boolean {
  return (
    identity.name !== undefined ||
    identity.type !== undefined ||
    identity.tags !== undefined ||
    identity.iconUrl !== undefined
  );
}

/**
 * Discriminate the two shapes of `RoutesConfig`.
 *
 * Mirrors the check `@x402/core` uses itself (`"accepts" in routes`) so a
 * config the resource server treats as a single route is treated the same way
 * here.
 *
 * @param routes - Route configuration passed by the caller
 * @returns True when `routes` is a single `RouteConfig` rather than a path map
 */
function isSingleRoute(routes: RoutesConfig): routes is RouteConfig {
  return "accepts" in routes;
}

/** Reports identity the seller declared but that will not ship. */
type Warn = (message: string) => void;

/**
 * Build a warning sink that emits each distinct message once.
 *
 * Product-level identity is applied to every route, so an over-long tag would
 * otherwise produce one identical line per route at boot. Warnings are emitted
 * when the middleware is built, never per request, so they land in boot output
 * rather than in a payment path.
 *
 * @returns A warn function that suppresses repeats
 */
function createWarn(): Warn {
  const seen = new Set<string>();

  return (message: string) => {
    if (seen.has(message)) {
      return;
    }
    seen.add(message);
    console.warn(`[weft] ${message}`);
  };
}

/**
 * Resolve the tags for one route.
 *
 * Route tags win over product tags wholesale — a seller who lists tags on a
 * route means exactly those. The product type is not a tag default though: it
 * is a separate declaration that happens to travel in the tags channel, so it
 * is always applied on top, and reserved `weft:type:*` values supplied by the
 * caller are dropped so exactly one type ever reaches the settlement event.
 *
 * The type tag is placed first, so if the seller declared more tags than the
 * protocol carries, the product type is the one thing guaranteed to survive.
 *
 * @param routeTags - Tags declared on the route, if any
 * @param identity - Product-level identity from the middleware config
 * @param warn - Sink for anything dropped
 * @returns The tags to put on the wire, or undefined to leave `tags` absent
 */
function resolveTags(
  routeTags: string[] | undefined,
  identity: WeftProductIdentity,
  warn: Warn,
): string[] | undefined {
  const declared = routeTags ?? identity.tags;

  if (declared === undefined && identity.type === undefined) {
    return undefined;
  }

  const sellerTags = (declared ?? []).filter(
    (tag) => !tag.startsWith(WEFT_TYPE_TAG_PREFIX),
  );

  const malformed = sellerTags.filter(
    (tag) => tag.length > MAX_TAG_CHARS || !PRINTABLE_ASCII.test(tag),
  );
  if (malformed.length > 0) {
    warn(
      `dropping ${malformed.length} tag(s) the x402 protocol cannot carry ` +
        `(max ${MAX_TAG_CHARS} printable-ASCII characters each): ` +
        `${malformed.join(", ")}`,
    );
  }

  const merged = [
    ...(identity.type !== undefined ? [productTypeTag(identity.type)] : []),
    ...sellerTags.filter((tag) => !malformed.includes(tag)),
  ];

  const deduped = [...new Set(merged)];

  if (deduped.length > MAX_TAGS) {
    warn(
      `dropping ${deduped.length - MAX_TAGS} tag(s): the x402 protocol ` +
        `carries ${MAX_TAGS} and a declared type uses one of them. ` +
        `Dropped: ${deduped.slice(MAX_TAGS).join(", ")}`,
    );
  }

  const bounded = deduped.slice(0, MAX_TAGS);
  return bounded.length > 0 ? bounded : undefined;
}

/**
 * Resolve the service name for one route, warning if it will not travel intact.
 *
 * The name is passed through unchanged: unlike tags, an over-long name costs
 * only itself, and the Weft facilitator accepts far more than the protocol
 * schema does. The warning exists so the seller finds out at boot rather than
 * from a truncated product name in someone else's dashboard.
 *
 * @param routeServiceName - Service name declared on the route, if any
 * @param identity - Product-level identity from the middleware config
 * @param warn - Sink for anything that will not travel intact
 * @returns The service name to put on the wire, or undefined to leave it absent
 */
function resolveServiceName(
  routeServiceName: string | undefined,
  identity: WeftProductIdentity,
  warn: Warn,
): string | undefined {
  const serviceName = routeServiceName ?? identity.name;

  if (
    serviceName !== undefined &&
    (serviceName.length > MAX_SERVICE_NAME_CHARS ||
      !PRINTABLE_ASCII.test(serviceName))
  ) {
    warn(
      `product name "${serviceName}" exceeds what the x402 protocol ` +
        `declares (max ${MAX_SERVICE_NAME_CHARS} printable-ASCII ` +
        `characters); some clients may drop it`,
    );
  }

  return serviceName;
}

/**
 * Apply product-level identity to a single route.
 *
 * @param route - The seller's route configuration
 * @param identity - Product-level identity from the middleware config
 * @param warn - Sink for anything that will not ship as declared
 * @returns A new route config; the input is never mutated
 */
function applyToRoute(
  route: RouteConfig,
  identity: WeftProductIdentity,
  warn: Warn,
): RouteConfig {
  const serviceName = resolveServiceName(route.serviceName, identity, warn);
  const iconUrl = route.iconUrl ?? identity.iconUrl;
  const tags = resolveTags(route.tags, identity, warn);

  return {
    ...route,
    ...(serviceName !== undefined && { serviceName }),
    ...(tags !== undefined && { tags }),
    ...(iconUrl !== undefined && { iconUrl }),
  };
}

/**
 * Merge product-level identity into every protected route.
 *
 * A per-route value always wins over the product-level default, so a seller
 * who names one route individually keeps that name. Fields nobody declared
 * stay absent from the 402 challenge rather than being sent empty.
 *
 * @param routes - Route configuration passed by the caller
 * @param identity - Product-level identity from the middleware config
 * @returns Route configuration with identity applied; the input is never mutated
 */
export function applyProductIdentity(
  routes: RoutesConfig,
  identity: WeftProductIdentity,
): RoutesConfig {
  if (!hasIdentity(identity)) {
    return routes;
  }

  const warn = createWarn();

  if (isSingleRoute(routes)) {
    return applyToRoute(routes, identity, warn);
  }

  return Object.fromEntries(
    Object.entries(routes).map(([pattern, route]) => [
      pattern,
      applyToRoute(route, identity, warn),
    ]),
  );
}
