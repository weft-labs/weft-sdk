export {
  weftPaymentMiddleware,
  type ExpressMiddleware,
  type WeftExpressMiddlewareConfig,
  type SchemeRegistration,
} from "./express";

export {
  weftPaymentMiddlewareHono,
  type HonoMiddleware,
  type WeftHonoMiddlewareConfig,
} from "./hono";

export {
  applyProductIdentity,
  productTypeTag,
  WEFT_TYPE_TAG_PREFIX,
  type WeftProductIdentity,
  type WeftProductType,
  type WeftRouteConfig,
  type WeftRoutesConfig,
} from "./product";

export {
  WEFT_API_KEY_HEADER,
  WEFT_DECLARED_HEADER,
  type WeftAdapterName,
} from "./handshake";

export type {
  RoutesConfig,
  RouteConfig,
  PaywallConfig,
  PaywallProvider,
} from "@x402/core/server";

export type { Network, SchemeNetworkServer } from "@x402/core/types";
