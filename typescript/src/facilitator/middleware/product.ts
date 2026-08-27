import type { RouteConfig, RoutesConfig } from "@x402/core/server";

/**
 * What kind of thing the seller is selling.
 *
 * Deliberately small. If you need a kind that is not here, use `tags`.
 */
export type WeftProductType = "api" | "agent" | "mcp";

/**
 * The legal {@link WeftProductType} values, as data.
 *
 * `WeftProductType` is erased at compile time and this package ships plain
 * `.mjs` examples, so the type is checked against this list at runtime too.
 */
const PRODUCT_TYPES: readonly string[] = ["api", "agent", "mcp"];

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
 * `weft:type:*` value a caller puts in `tags` is dropped with a warning, in
 * favour of the `type` field on the product or on the route.
 */
export const WEFT_TYPE_TAG_PREFIX = "weft:type:";

/**
 * Bounds the x402 protocol declares for the `ResourceInfo` identity fields.
 *
 * `ResourceInfoSchema` in `@x402/core/schemas` caps `tags` at five entries of
 * 1-32 printable-ASCII characters, `serviceName` at 1-32 printable-ASCII
 * characters, and `iconUrl` at 2048 characters. No code path inside
 * `@x402/core` applies that schema when a challenge is built, but it is the
 * published contract, and `parsePaymentRequired` — which any buyer may run —
 * rejects the *whole* `PaymentRequired` when a single field is out of bounds.
 *
 * The SDK therefore never emits a value outside these bounds. A declared
 * `type` spends one of the five tag slots, leaving four for the seller.
 *
 * These are the *protocol's* bounds, not the Weft facilitator's, which are
 * looser. That is deliberate: the challenge is read by buyers before it ever
 * reaches a facilitator, so the narrower contract is the one that has to hold.
 * It costs sellers whose names are not expressible in ASCII — a real cost,
 * carried knowingly, and the right place to fix it is the protocol schema.
 */
const MAX_TAGS = 5;
const MAX_TAG_CHARS = 32;
const MAX_SERVICE_NAME_CHARS = 32;
const MAX_ICON_URL_CHARS = 2048;
const PRINTABLE_ASCII = /^[\x20-\x7e]+$/;

/**
 * Product-level identity, declared once and applied to every protected route.
 *
 * This is what turns a settlement into a named product in the Weft dashboard.
 * Every field is optional; a middleware configured without any of them behaves
 * exactly as it did before this identity existed.
 *
 * Every field is also validated at construction time, because these values
 * routinely come from JSON or env and TypeScript is not present at runtime.
 * Anything the x402 protocol cannot carry is clamped or dropped, with one
 * `[weft]` line explaining what shipped — never a thrown error in a payment
 * server's boot path, and never a malformed challenge on the wire.
 */
export interface WeftProductIdentity {
  /**
   * Display name of the product, e.g. `"Acme Pricing API"`.
   *
   * Travels as `ResourceInfo.serviceName` on the 402 challenge. The protocol
   * carries 32 printable-ASCII characters; a longer name is truncated to fit,
   * with a warning naming both values.
   */
  name?: string;

  /**
   * What kind of product this is.
   *
   * Travels as a reserved `weft:type:<type>` tag — see {@link WEFT_TYPE_TAG_PREFIX}.
   * A route may declare its own `type`, which wins for that route.
   */
  type?: WeftProductType;

  /**
   * Free-text tags describing the product, e.g. `["finance", "pricing"]`.
   *
   * Travels as `ResourceInfo.tags`. Tags starting with `weft:type:` are
   * reserved and are dropped in favour of {@link WeftProductIdentity.type}.
   *
   * The x402 protocol allows five tags of at most 32 printable-ASCII
   * characters. A declared `type` uses one slot, so four remain. Anything
   * beyond that is dropped with a warning rather than being put on the wire,
   * because an out-of-bounds array costs the seller every tag they declared.
   */
  tags?: string[];

  /**
   * Absolute `http:` or `https:` URL of an icon for the product.
   *
   * Travels as `ResourceInfo.iconUrl`. A dashboard renders this URL, so any
   * other scheme is dropped with a warning.
   */
  iconUrl?: string;
}

/**
 * Extension key under which the product declaration travels on the wire.
 *
 * Unlike the identity fields, which ride `ResourceInfo`, the product
 * declaration rides x402 v2 `extensions`: declared by the server on the 402
 * challenge, echoed by the buyer's client onto `PaymentPayload`, validated
 * against the advertisement at verify time, and relayed by the facilitator on
 * the settlement event.
 */
export const WEFT_PRODUCT_EXTENSION_KEY = "weft.product";

/**
 * JSON Schema (Draft 2020-12) for the `weft.product` extension's `info`.
 *
 * Ships verbatim as the extension's `schema` member, per the x402 v2
 * extensions shape `{info, schema}`. Every field is optional because absent
 * declarations are omitted from `info` rather than sent empty.
 *
 * `additionalProperties: false` is a **published contract statement, not an
 * enforcement**. Upstream's echo check is a subset match — advertised `info`
 * fields must be preserved, but a buyer may *add* fields to the echoed
 * `info` and pass, and when a route advertises no extensions the check never
 * runs. So an echoed `weft.product` proves nothing about fields the seller
 * did not advertise: by the time it reaches a consumer it is unauthenticated
 * buyer input. A buyer has no legitimate reason to add fields to a seller
 * claim, and this flag is the declared basis for consumers to strip
 * anything unadvertised — but the stripping, and the deeper rule, are the
 * consumer's job. Attribution must never key on echoed extension contents;
 * it keys on seller-authenticated joins — the API key that settled the
 * payment (weft-app #635 freezes `payments.product_id` from exactly that at
 * settlement time) or the S1 handshake's authenticated declaration.
 */
export const WEFT_PRODUCT_INFO_SCHEMA = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  type: "object",
  properties: {
    kind: { type: "string", enum: [...PRODUCT_TYPES] },
    product_id: { type: "string", minLength: 1 },
    manifest_hash: { type: "string", minLength: 1 },
  },
  additionalProperties: false,
} as const;

/**
 * Product-level declaration: the identity plus the product reference fields.
 *
 * `productId` and `manifestHash` are not cosmetic identity — they are the
 * seller's claim about *which* dashboard product this deployment is and what
 * manifest it was built from. They travel in the `weft.product` extension,
 * never in `ResourceInfo`, so they extend the identity type rather than
 * joining it.
 */
export interface WeftProductDeclaration extends WeftProductIdentity {
  /**
   * Identifier of the dashboard product this deployment claims to be.
   *
   * Travels as `extensions["weft.product"].info.product_id` on the 402
   * challenge and, echoed by the buyer, on the payment payload the
   * facilitator settles.
   */
  productId?: string;

  /**
   * Hash of the product manifest this deployment was built from.
   *
   * Travels as `extensions["weft.product"].info.manifest_hash`, next to
   * {@link WeftProductDeclaration.productId}. Opaque to the SDK: no format is
   * enforced beyond being a non-empty string.
   */
  manifestHash?: string;
}

/**
 * A route config that may also declare the product kind for that route alone.
 *
 * `RouteConfig` comes from `@x402/core` and has no field for a product kind.
 * A seller whose surface is part API and part MCP needs to say so per route,
 * so the SDK accepts `type` here, consumes it into the reserved tag, and never
 * passes the field itself down to the resource server.
 *
 * The inherited `extensions` map gains one capability here: any value may be a
 * `WeftDynamicExtension` callback instead of a static object, resolved per
 * request at the same point as `price`. The field is already typed
 * `Record<string, unknown>` upstream, so this needs no wider type — only the
 * middleware registering the resolver for those keys.
 */
export interface WeftRouteConfig extends RouteConfig {
  /** Product kind for this route; overrides {@link WeftProductIdentity.type}. */
  type?: WeftProductType;
}

/** {@link RoutesConfig}, with per-route {@link WeftRouteConfig.type} allowed. */
export type WeftRoutesConfig =
  Record<string, WeftRouteConfig> | WeftRouteConfig;

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
 * Whether a caller actually declared a value.
 *
 * `null` reads as "absent": upstream types every identity field `.nullish()`,
 * and a seller whose JSON config carries an explicit null means they have no
 * name, not that they want `null` on the wire. Treating it as absent also
 * keeps the field off challenges consumed by `@x402/core` 2.14, which typed
 * these `.optional()` and rejects an explicit null — and the peer range
 * (`^2.0.0`) lets a seller pin exactly that.
 *
 * @param value - A declared identity value
 * @returns True when the caller supplied something other than null/undefined
 */
function isDeclared(value: unknown): boolean {
  return value !== undefined && value !== null;
}

/**
 * Name a value's runtime type for a diagnostic.
 *
 * @param value - The offending value
 * @returns A short phrase, e.g. `a number`, `an array`, `null`
 */
function typeName(value: unknown): string {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "an array";
  }
  return `a ${typeof value}`;
}

/**
 * Render a value for a diagnostic without ever throwing.
 *
 * @param value - The offending value
 * @returns A quoted, escaped rendering of the value
 */
function show(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return typeName(value);
  }
}

/**
 * Discriminate the two shapes of `RoutesConfig`.
 *
 * Mirrors the check `@x402/core` uses itself (`"accepts" in routes`) so a
 * config the resource server treats as a single route is treated the same way
 * here.
 *
 * @param routes - Route configuration passed by the caller
 * @returns True when `routes` is a single route rather than a path map
 */
function isSingleRoute(routes: WeftRoutesConfig): routes is WeftRouteConfig {
  return "accepts" in routes;
}

/** Reports identity the seller declared but that will not ship as written. */
export type Warn = (message: string) => void;

/**
 * Build a warning sink that emits each distinct message once.
 *
 * Product-level identity is applied to every route, so an over-long tag would
 * otherwise produce one identical line per route at boot. Identity warnings are
 * all emitted when the middleware is built, so they land in boot output rather
 * than in a payment path; the one sink that runs per request — a failing
 * {@link WeftDynamicExtension} — leans on the same de-duplication to stay one
 * line per distinct problem instead of one per request.
 *
 * @returns A warn function that suppresses repeats
 */
export function createWarn(): Warn {
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
 * Read a declared value that has to be a string.
 *
 * @param field - Field name, for the diagnostic
 * @param value - The declared value, from a route or from the product identity
 * @param warn - Sink for anything that will not ship
 * @returns The string, or undefined when absent or unusable
 */
function asString(
  field: string,
  value: unknown,
  warn: Warn,
): string | undefined {
  if (!isDeclared(value)) {
    return undefined;
  }
  if (typeof value !== "string") {
    warn(
      `ignoring ${field} ${show(value)}: expected a string, got ` +
        `${typeName(value)}`,
    );
    return undefined;
  }
  return value;
}

/**
 * Whether a tag is using the reserved product-type namespace.
 *
 * Matched leniently — case-folded and trimmed — so `"WEFT:TYPE:mcp"` and
 * `" weft:type:mcp"` are recognised as the reserved form a reader would have
 * to interpret, rather than surviving as free-text tags that contradict the
 * one-type-per-route guarantee and burn a tag slot doing it.
 *
 * @param tag - A seller-declared tag
 * @returns True when the tag occupies the reserved namespace
 */
function isReservedTypeTag(tag: string): boolean {
  return tag.trim().toLowerCase().startsWith(WEFT_TYPE_TAG_PREFIX);
}

/**
 * Read a declared product type, rejecting anything not in the legal set.
 *
 * `WeftProductType` is a compile-time type only, and the reserved tag it
 * becomes is subject to the same protocol bounds as every other tag. An
 * unchecked value here is worse than an unchecked free-text tag: the Weft
 * facilitator drops the entire `tags` array when a single entry is malformed,
 * so a junk `type` costs the seller every tag they declared — through the very
 * value the tag bounds exist to protect.
 *
 * @param value - The declared type, from a route or from the product identity
 * @param field - Field name, for the diagnostic
 * @param warn - Sink for anything that will not ship
 * @returns The product type, or undefined when absent or illegal
 */
function resolveType(
  value: unknown,
  field: string,
  warn: Warn,
): WeftProductType | undefined {
  if (!isDeclared(value)) {
    return undefined;
  }
  if (typeof value !== "string" || !PRODUCT_TYPES.includes(value)) {
    warn(
      `ignoring ${field} ${show(value)}: expected one of ` +
        `${PRODUCT_TYPES.join(", ")}`,
    );
    return undefined;
  }
  return value as WeftProductType;
}

/**
 * Read a declared tag list, dropping entries that are not strings.
 *
 * @param value - The declared tags, from a route or from the product identity
 * @param field - Field name, for the diagnostic
 * @param warn - Sink for anything that will not ship
 * @returns The string tags, or undefined when absent or unusable
 */
function asTagList(
  value: unknown,
  field: string,
  warn: Warn,
): string[] | undefined {
  if (!isDeclared(value)) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    warn(
      `ignoring ${field} ${show(value)}: expected an array of strings, got ` +
        `${typeName(value)}`,
    );
    return undefined;
  }

  return value.filter((entry): entry is string => {
    if (typeof entry === "string") {
      return true;
    }
    warn(
      `dropping tag ${show(entry)}: expected a string, got ` +
        `${typeName(entry)}`,
    );
    return false;
  });
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
 * It is then filtered by the same bounds as every other tag rather than being
 * trusted: nothing reaches the wire unchecked, including values the SDK built
 * itself.
 *
 * @param routeTags - Tags declared on the route, if any
 * @param identityTags - Tags declared on the product identity, if any
 * @param type - The already-validated type for this route, if any
 * @param warn - Sink for anything dropped
 * @returns The tags to put on the wire, or undefined to leave `tags` absent
 */
function resolveTags(
  routeTags: unknown,
  identityTags: unknown,
  type: WeftProductType | undefined,
  warn: Warn,
): string[] | undefined {
  const declared =
    asTagList(routeTags, "route tags", warn) ??
    asTagList(identityTags, "tags", warn);

  if (declared === undefined && type === undefined) {
    return undefined;
  }

  const sellerTags = (declared ?? []).filter((tag) => {
    if (!isReservedTypeTag(tag)) {
      return true;
    }
    warn(
      `dropping reserved tag ${show(tag)}: declare the product kind with ` +
        `\`type\` (${PRODUCT_TYPES.join(", ")}) on the middleware config or ` +
        `on the route`,
    );
    return false;
  });

  const malformed: string[] = [];
  const carried = [
    ...(type !== undefined ? [productTypeTag(type)] : []),
    ...sellerTags,
  ].filter((tag) => {
    if (tag.length <= MAX_TAG_CHARS && PRINTABLE_ASCII.test(tag)) {
      return true;
    }
    malformed.push(tag);
    return false;
  });

  if (malformed.length > 0) {
    warn(
      `dropping ${malformed.length} tag(s) the x402 protocol cannot carry ` +
        `(max ${MAX_TAG_CHARS} printable-ASCII characters each): ` +
        `${malformed.join(", ")}`,
    );
  }

  const deduped = [...new Set(carried)];

  if (deduped.length > MAX_TAGS) {
    const dropped = deduped.slice(MAX_TAGS);
    warn(
      `dropping ${dropped.length} tag(s): the x402 protocol carries ` +
        `${MAX_TAGS}` +
        (type !== undefined ? " and the declared type uses one of them" : "") +
        `. Dropped: ${dropped.join(", ")}`,
    );
  }

  const bounded = deduped.slice(0, MAX_TAGS);
  return bounded.length > 0 ? bounded : undefined;
}

/**
 * Resolve the service name for one route, keeping it inside the x402 schema.
 *
 * An over-long name is truncated rather than rejected. The alternative — a
 * thrown error at construction — turns a cosmetic field into a boot failure on
 * a payment server, and 32 characters is tight enough that ordinary product
 * names exceed it. Sending it unchanged is not an option either: it is the
 * whole `PaymentRequired` that `parsePaymentRequired` rejects, not the field,
 * so an over-long name costs the seller the entire challenge.
 *
 * Truncating is also what the SDK already does to tags, for the same reason.
 * A name that cannot be represented at all — empty, or not printable ASCII —
 * is dropped instead, because there is nothing left to truncate to.
 *
 * @param routeServiceName - Service name declared on the route, if any
 * @param identityName - Product name declared on the middleware config, if any
 * @param warn - Sink for anything that will not travel as declared
 * @returns The service name to put on the wire, or undefined to leave it absent
 */
function resolveServiceName(
  routeServiceName: unknown,
  identityName: unknown,
  warn: Warn,
): string | undefined {
  const declared =
    asString("route serviceName", routeServiceName, warn) ??
    asString("name", identityName, warn);

  if (declared === undefined) {
    return undefined;
  }

  if (!PRINTABLE_ASCII.test(declared)) {
    warn(
      `dropping product name ${show(declared)}: the x402 protocol carries ` +
        `1-${MAX_SERVICE_NAME_CHARS} printable-ASCII characters ` +
        `(U+0020-U+007E)`,
    );
    return undefined;
  }

  if (declared.length > MAX_SERVICE_NAME_CHARS) {
    const truncated = declared.slice(0, MAX_SERVICE_NAME_CHARS);
    warn(
      `product name ${show(declared)} is ${declared.length} characters; the ` +
        `x402 protocol carries ${MAX_SERVICE_NAME_CHARS}, so it travels as ` +
        `${show(truncated)}`,
    );
    return truncated;
  }

  return declared;
}

/**
 * Resolve the icon URL for one route.
 *
 * This is the last Weft-authored check before a URL the SDK put on a challenge
 * is rendered in someone's dashboard: the facilitator relays `iconUrl` without
 * inspecting its scheme. So the SDK only emits absolute `http:`/`https:` URLs
 * inside the protocol's length bound, and drops anything else with a warning.
 *
 * @param routeIconUrl - Icon URL declared on the route, if any
 * @param identityIconUrl - Icon URL declared on the middleware config, if any
 * @param warn - Sink for anything that will not ship
 * @returns The icon URL to put on the wire, or undefined to leave it absent
 */
function resolveIconUrl(
  routeIconUrl: unknown,
  identityIconUrl: unknown,
  warn: Warn,
): string | undefined {
  const declared =
    asString("route iconUrl", routeIconUrl, warn) ??
    asString("iconUrl", identityIconUrl, warn);

  if (declared === undefined) {
    return undefined;
  }

  if (declared.length > MAX_ICON_URL_CHARS) {
    warn(
      `dropping iconUrl: ${declared.length} characters exceeds the ` +
        `${MAX_ICON_URL_CHARS} the x402 protocol carries`,
    );
    return undefined;
  }

  let scheme: string;
  try {
    scheme = new URL(declared).protocol;
  } catch {
    warn(
      `dropping iconUrl ${show(declared)}: expected an absolute http or ` +
        `https URL`,
    );
    return undefined;
  }

  if (scheme !== "http:" && scheme !== "https:") {
    warn(
      `dropping iconUrl ${show(declared)}: only http and https are carried ` +
        `(a dashboard renders this URL)`,
    );
    return undefined;
  }

  return declared;
}

/**
 * Read a declared opaque reference string, refusing blanks.
 *
 * `product_id` and `manifest_hash` have no protocol bound to clamp to, but an
 * empty value is not a declaration — the contract is that absent fields are
 * omitted from `info`, never sent empty. The value ships trimmed: these ids
 * exist to be joined against dashboard records by exact string, and padding
 * from a sloppy env var would silently fail that join.
 *
 * @param field - Field name, for the diagnostic
 * @param value - The declared value
 * @param warn - Sink for anything that will not ship
 * @returns The trimmed string, or undefined when absent, blank or unusable
 */
function resolveOpaqueString(
  field: string,
  value: unknown,
  warn: Warn,
): string | undefined {
  const declared = asString(field, value, warn);
  if (declared === undefined) {
    return undefined;
  }
  const trimmed = declared.trim();
  if (trimmed === "") {
    warn(`ignoring empty ${field}`);
    return undefined;
  }
  return trimmed;
}

/**
 * Build the `extensions` object for one route, declaring `weft.product`.
 *
 * The declaration is emitted only when it would say something — a resolved
 * kind, product id or manifest hash — and each absent field is omitted from
 * `info`, never sent empty. A route that already declares `weft.product` in
 * its own `extensions` keeps its declaration: per-route always wins over the
 * product level, exactly as it does for `serviceName`.
 *
 * @param routeExtensions - The route's own `extensions`, if any
 * @param type - The already-resolved product kind for this route, if any
 * @param declaration - Product-level declaration from the middleware config
 * @param warn - Sink for anything that will not ship
 * @returns The extensions to put on the route, or undefined to leave them alone
 */
function resolveProductExtensions(
  routeExtensions: RouteConfig["extensions"],
  type: WeftProductType | undefined,
  declaration: WeftProductDeclaration,
  warn: Warn,
): RouteConfig["extensions"] | undefined {
  const productId = resolveOpaqueString(
    "productId",
    declaration.productId,
    warn,
  );
  const manifestHash = resolveOpaqueString(
    "manifestHash",
    declaration.manifestHash,
    warn,
  );

  const info = {
    ...(type !== undefined && { kind: type }),
    ...(productId !== undefined && { product_id: productId }),
    ...(manifestHash !== undefined && { manifest_hash: manifestHash }),
  };

  if (Object.keys(info).length === 0) {
    return undefined;
  }

  if (routeExtensions !== undefined) {
    if (
      typeof routeExtensions !== "object" ||
      routeExtensions === null ||
      Array.isArray(routeExtensions)
    ) {
      // Pass-through contract: what a seller puts in an upstream RouteConfig
      // field is between them and @x402/core, so the junk value stays on the
      // route untouched — the warning must not claim otherwise.
      warn(
        `route extensions ${show(routeExtensions)} are ${typeName(routeExtensions)}, ` +
          `not an object; leaving them untouched and skipping the ` +
          `${WEFT_PRODUCT_EXTENSION_KEY} declaration for this route`,
      );
      return undefined;
    }
    if (WEFT_PRODUCT_EXTENSION_KEY in routeExtensions) {
      return undefined;
    }
  }

  return {
    ...routeExtensions,
    [WEFT_PRODUCT_EXTENSION_KEY]: { info, schema: WEFT_PRODUCT_INFO_SCHEMA },
  };
}

/**
 * Apply product-level identity to a single route.
 *
 * A per-route value always wins over the product-level default. The route's
 * own `type` is consumed here and never forwarded: `RouteConfig` upstream has
 * no such field, and the value's only destination is the reserved tag and the
 * `weft.product` extension's `kind`.
 *
 * @param route - The seller's route configuration
 * @param identity - Product-level declaration from the middleware config
 * @param warn - Sink for anything that will not ship as declared
 * @returns A new route config; the input is never mutated
 */
function applyToRoute(
  route: WeftRouteConfig,
  identity: WeftProductDeclaration,
  warn: Warn,
): RouteConfig {
  if (typeof route !== "object" || route === null) {
    warn(
      `ignoring route ${show(route)}: expected a route config object, got ` +
        `${typeName(route)}`,
    );
    return route;
  }

  // Every identity field is destructured *out* of the route rather than merged
  // over: a value this function drops has to leave the route entirely. Spread
  // the route and add the survivors back, and a dropped value rides through on
  // the original object — defeating the drop precisely when it matters, which
  // is when the seller's own value is the one the protocol cannot carry.
  const {
    type: declaredType,
    serviceName: declaredServiceName,
    tags: declaredTags,
    iconUrl: declaredIconUrl,
    ...rest
  } = route;

  const type =
    resolveType(declaredType, "route type", warn) ??
    resolveType(identity.type, "type", warn);
  const serviceName = resolveServiceName(
    declaredServiceName,
    identity.name,
    warn,
  );
  const iconUrl = resolveIconUrl(declaredIconUrl, identity.iconUrl, warn);
  const tags = resolveTags(declaredTags, identity.tags, type, warn);
  const extensions = resolveProductExtensions(
    rest.extensions,
    type,
    identity,
    warn,
  );

  return {
    ...rest,
    ...(serviceName !== undefined && { serviceName }),
    ...(tags !== undefined && { tags }),
    ...(iconUrl !== undefined && { iconUrl }),
    ...(extensions !== undefined && { extensions }),
  };
}

/**
 * Whether any product-level field was actually declared.
 *
 * @param identity - Product-level declaration from the middleware config
 * @returns True when at least one field is set to something other than null
 */
function hasProductIdentity(identity: WeftProductDeclaration): boolean {
  return (
    isDeclared(identity.name) ||
    isDeclared(identity.type) ||
    isDeclared(identity.tags) ||
    isDeclared(identity.iconUrl) ||
    isDeclared(identity.productId) ||
    isDeclared(identity.manifestHash)
  );
}

/**
 * Whether any route declares a Weft-specific field of its own.
 *
 * Only `type` counts: `serviceName`, `tags` and `iconUrl` are upstream fields
 * a seller could already set before this identity existed, and a config that
 * uses no Weft identity anywhere must still pass through untouched.
 *
 * @param routes - Route configuration passed by the caller
 * @returns True when at least one route declares `type`
 */
function hasRouteIdentity(routes: WeftRoutesConfig): boolean {
  if (isSingleRoute(routes)) {
    return isDeclared(routes.type);
  }
  return Object.values(routes).some((route) => isDeclared(route?.type));
}

/**
 * Resolve the product-level identity to exactly what the wire will carry.
 *
 * The construction-time facilitator handshake declares the product too, and a
 * dashboard fed from both sources must never see two different products. So
 * the handshake reuses the resolvers the 402 challenge goes through — same
 * clamping, same drops — with one difference: the product type is returned as
 * its own field rather than folded into `tags`, because the handshake payload
 * has a field for it and the challenge does not.
 *
 * Silent by design: `applyProductIdentity` already warns about these same
 * values at construction time, and one warning per problem is enough.
 *
 * @param identity - Product-level identity from the middleware config
 * @returns The identity as it ships, or an empty object when nothing survives
 */
export function sanitizeProductIdentity(
  identity: WeftProductIdentity,
): WeftProductIdentity {
  const silent: Warn = () => undefined;

  const type = resolveType(identity.type, "type", silent);
  const name = resolveServiceName(undefined, identity.name, silent);
  const iconUrl = resolveIconUrl(undefined, identity.iconUrl, silent);
  const tags = resolveTags(undefined, identity.tags, type, silent)?.filter(
    (tag) => !isReservedTypeTag(tag),
  );

  return {
    ...(name !== undefined && { name }),
    ...(type !== undefined && { type }),
    ...(tags !== undefined && tags.length > 0 && { tags }),
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
 * Every value this produces is inside the bounds `ResourceInfoSchema` declares,
 * so the challenge the middleware emits parses for any buyer that validates.
 * Values that cannot be made to fit are clamped or dropped, each with one
 * `[weft]` line at construction time.
 *
 * A config that declares no Weft identity at all — neither on the middleware
 * nor on a route — is returned by reference, exactly as the caller wrote it.
 * That is the pre-identity behaviour, kept deliberately: with nothing of ours
 * on the routes, what the seller puts in a `RouteConfig` is between them and
 * `@x402/core`.
 *
 * @param routes - Route configuration passed by the caller
 * @param identity - Product-level declaration from the middleware config
 * @returns Route configuration with identity applied; the input is never mutated
 */
export function applyProductIdentity(
  routes: WeftRoutesConfig,
  identity: WeftProductDeclaration,
): RoutesConfig {
  if (typeof routes !== "object" || routes === null) {
    return routes;
  }

  if (!hasProductIdentity(identity) && !hasRouteIdentity(routes)) {
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
