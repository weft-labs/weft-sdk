import {
  HTTPRequestContext,
  PaywallConfig,
  PaywallProvider,
  x402HTTPResourceServer,
  x402ResourceServer,
  HTTPAdapter,
} from "@x402/core/server";
import { SchemeNetworkServer, Network } from "@x402/core/types";
import { createFacilitatorClient, WeftFacilitatorConfig } from "../client";
import { buildFacilitatorAuthHeaders } from "./handshake";
import {
  applyProductIdentity,
  WeftProductDeclaration,
  WeftRoutesConfig,
} from "./product";

interface HonoRequest {
  method: string;
  path: string;
  url: string;
  header(name: string): string | undefined;
  query(): Record<string, string>;
  query(name: string): string | undefined;
  json(): Promise<unknown>;
}

interface HonoContext {
  req: HonoRequest;
  res: Response | undefined;
  header(name: string, value: string): void;
  html(body: string, status?: number): Response;
  json(body: unknown, status?: number): Response;
}

export type HonoMiddleware = (
  c: HonoContext,
  next: () => Promise<void>,
) => Promise<Response | void>;

/**
 * Floor between background facilitator re-sync attempts.
 *
 * Without it, a sustained facilitator outage on a busy server couples retry
 * (and warn) volume to request rate: a refused connection settles in
 * milliseconds, so every protected request would launch a fresh `/supported`
 * call for the whole outage. One attempt per floor interval bounds both.
 */
const FACILITATOR_SYNC_RETRY_FLOOR_MS = 30_000;

export interface SchemeRegistration {
  network: Network;
  server: SchemeNetworkServer;
}

/**
 * Configuration for the Hono payment middleware.
 *
 * Extends {@link WeftProductDeclaration}, so `name`, `type`, `tags`,
 * `iconUrl`, `productId` and `manifestHash` are declared once here and
 * applied to every protected route.
 */
export interface WeftHonoMiddlewareConfig extends WeftProductDeclaration {
  /**
   * The seller's Weft API key.
   *
   * Authenticates the facilitator calls that need it: `X-API-Key` on
   * `/settle` — which the facilitator requires, or every settlement 401s —
   * and `Authorization: Bearer <key>` on the construction-time `/supported`
   * handshake, which is how the dashboard learns an SDK is deployed before
   * any payment. Optional, but a seller who omits it must supply their own
   * `facilitator.createAuthHeaders` or settlement fails.
   */
  apiKey?: string;
  facilitator?: WeftFacilitatorConfig;
  schemes?: SchemeRegistration[];
  paywallConfig?: PaywallConfig;
  paywall?: PaywallProvider;
  syncFacilitatorOnStart?: boolean;
}

class HonoAdapter implements HTTPAdapter {
  constructor(private c: HonoContext) {}

  getHeader(name: string): string | undefined {
    return this.c.req.header(name);
  }

  getMethod(): string {
    return this.c.req.method;
  }

  getPath(): string {
    return this.c.req.path;
  }

  getUrl(): string {
    return this.c.req.url;
  }

  getAcceptHeader(): string {
    return this.c.req.header("Accept") || "";
  }

  getUserAgent(): string {
    return this.c.req.header("User-Agent") || "";
  }

  getQueryParams(): Record<string, string | string[]> {
    const query = this.c.req.query();
    const result: Record<string, string | string[]> = {};
    for (const [key, value] of Object.entries(query)) {
      result[key] = value;
    }
    return result;
  }

  getQueryParam(name: string): string | string[] | undefined {
    return this.c.req.query(name);
  }

  async getBody(): Promise<unknown> {
    try {
      return await this.c.req.json();
    } catch {
      return undefined;
    }
  }
}

/**
 * Flatten a `Headers` instance into the plain record `HTTPTransportContext`
 * expects. Header names are already lowercased by `Headers`; the settlement
 * override lookup in `@x402/core` compares case-insensitively either way.
 *
 * @param headers - Response headers set by the route handler, if any
 * @returns A plain record, or undefined when there is no response yet
 */
function toHeaderRecord(
  headers: Headers | undefined,
): Record<string, string> | undefined {
  if (!headers) return undefined;
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

/**
 * Create a Hono middleware that requires x402 payment for the given routes.
 *
 * Product identity declared on `config` (`name`, `type`, `tags`, `iconUrl`) is
 * merged into every route, so it travels on the 402 challenge's `resource` and
 * from there onto the buyer's payment payload and the settlement event.
 *
 * @param routes - Route configuration, either a path map or a single route;
 *   each route may declare its own `type` to override the product's
 * @param config - Facilitator, scheme, paywall and product identity settings
 * @returns A Hono middleware function
 */
export function weftPaymentMiddlewareHono(
  routes: WeftRoutesConfig,
  config?: WeftHonoMiddlewareConfig,
): HonoMiddleware {
  const facilitatorClient = createFacilitatorClient(
    config?.facilitator,
    buildFacilitatorAuthHeaders("hono", config?.apiKey, config ?? {}),
  );
  const resourceServer = new x402ResourceServer(facilitatorClient);

  if (config?.schemes) {
    config.schemes.forEach(({ network, server: schemeServer }) => {
      resourceServer.register(network, schemeServer);
    });
  }

  const httpServer = new x402HTTPResourceServer(
    resourceServer,
    applyProductIdentity(routes, config ?? {}),
  );

  if (config?.paywall) {
    httpServer.registerPaywallProvider(config.paywall);
  }

  // The construction-time facilitator sync doubles as the identity handshake,
  // so its failure modes are held to handshake rules: it must never crash the
  // process (a rejection with no handler attached would, under Node's default
  // unhandled-rejection policy) and must never brick the middleware. The
  // returned promise therefore cannot reject, and a failed sync is retried in
  // the background off later protected requests until one attempt succeeds.
  // A request the sync still cannot serve rejects into Hono's own onError.
  const syncOnStart = config?.syncFacilitatorOnStart ?? true;
  let facilitatorSynced = false;
  let syncInFlight: Promise<void> | null = null;
  let lastFailedSyncAt = 0;

  const syncFacilitator = (): Promise<void> => {
    syncInFlight ??= httpServer
      .initialize()
      .then(
        () => {
          facilitatorSynced = true;
        },
        (error: unknown) => {
          lastFailedSyncAt = Date.now();
          console.warn(
            "[weft] facilitator sync failed; payment-protected routes " +
              "degrade until a later attempt succeeds: " +
              (error instanceof Error ? error.message : String(error)),
          );
        },
      )
      .finally(() => {
        syncInFlight = null;
      });
    return syncInFlight;
  };

  let bootSync: Promise<void> | null = syncOnStart ? syncFacilitator() : null;

  return async (c: HonoContext, next: () => Promise<void>) => {
    const adapter = new HonoAdapter(c);
    const context: HTTPRequestContext = {
      adapter,
      path: c.req.path,
      method: c.req.method,
      paymentHeader:
        adapter.getHeader("payment-signature") ||
        adapter.getHeader("x-payment"),
    };

    if (!httpServer.requiresPayment(context)) {
      return next();
    }

    if (bootSync) {
      // The pre-existing first-request barrier: with a healthy facilitator
      // this resolves once and never runs again. It cannot throw.
      await bootSync;
      bootSync = null;
    }
    if (
      syncOnStart &&
      !facilitatorSynced &&
      Date.now() - lastFailedSyncAt >= FACILITATOR_SYNC_RETRY_FLOOR_MS
    ) {
      // Heal a failed boot sync without delaying anyone: the retry is kicked
      // fire-and-forget (one in flight at most, one attempt per floor
      // interval) and this request proceeds.
      void syncFacilitator();
    }

    const result = await httpServer.processHTTPRequest(
      context,
      config?.paywallConfig,
    );

    switch (result.type) {
      case "no-payment-required":
        return next();

      case "payment-error": {
        const { response } = result;
        Object.entries(response.headers).forEach(([key, value]) => {
          c.header(key, value as string);
        });
        if (response.isHtml) {
          return c.html(response.body as string, response.status as 402);
        } else {
          return c.json(response.body || {}, response.status as 402);
        }
      }

      case "payment-verified": {
        const { paymentPayload, paymentRequirements } = result;

        await next();

        let res = c.res;

        if (res && res.status >= 400) {
          return;
        }

        c.res = undefined;

        try {
          const settleResult = await httpServer.processSettlement(
            paymentPayload,
            paymentRequirements,
            undefined,
            // The route handler signals a settlement override (a metered amount
            // below the signed maximum) through a response header.
            // `processSettlement` only reads that off `transportContext`, so
            // omitting this settles the full authorised amount and makes
            // `upto` behave exactly like `exact`.
            { request: context, responseHeaders: toHeaderRecord(res?.headers) },
          );

          if (!settleResult.success) {
            res = c.json(
              {
                error: "Settlement failed",
                details: settleResult.errorReason,
              },
              402,
            );
          } else if (res) {
            Object.entries(settleResult.headers).forEach(([key, value]) => {
              res!.headers.set(key, value as string);
            });
          }
        } catch (error) {
          console.error(error);
          res = c.json(
            {
              error: "Settlement failed",
              details: error instanceof Error ? error.message : "Unknown error",
            },
            402,
          );
        }

        c.res = res;
        return;
      }
    }
  };
}
