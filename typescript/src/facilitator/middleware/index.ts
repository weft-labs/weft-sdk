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
  WEFT_PRODUCT_EXTENSION_KEY,
  WEFT_PRODUCT_INFO_SCHEMA,
  WEFT_TYPE_TAG_PREFIX,
  type WeftProductDeclaration,
  type WeftProductIdentity,
  type WeftProductType,
  type WeftRouteConfig,
  type WeftRoutesConfig,
} from "./product";

export {
  registerDynamicExtensions,
  MAX_EXTENSION_BYTES,
  WEFT_REQUEST_EXTENSION_KEY,
  WEFT_REQUEST_INFO_SCHEMA,
  type WeftDynamicExtension,
} from "./extensions";

export {
  WEFT_API_KEY_HEADER,
  WEFT_DECLARED_HEADER,
  type WeftAdapterName,
} from "./handshake";

export type { ResumeVerifiedPayment, VerifiedPaymentResume } from "./replay";

export type {
  RoutesConfig,
  RouteConfig,
  PaywallConfig,
  PaywallProvider,
} from "@x402/core/server";

export type { Network, SchemeNetworkServer } from "@x402/core/types";
