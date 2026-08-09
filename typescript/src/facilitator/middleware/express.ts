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
import { buildHandshakeHeaders } from "./handshake";
import {
  applyProductIdentity,
  WeftProductIdentity,
  WeftRoutesConfig,
} from "./product";

interface ExpressRequest {
  method: string;
  path: string;
  protocol: string;
  headers: Record<string, string | string[] | undefined>;
  query: Record<string, string | string[] | undefined>;
  body?: unknown;
  header(name: string): string | string[] | undefined;
}

interface ExpressResponse {
  status(code: number): ExpressResponse;
  setHeader(name: string, value: string): ExpressResponse;
  send(body: unknown): ExpressResponse;
  json(body: unknown): ExpressResponse;
  statusCode: number;
  writeHead: (...args: unknown[]) => ExpressResponse;
  write: (...args: unknown[]) => boolean;
  end: (...args: unknown[]) => ExpressResponse;
  flushHeaders: () => void;
}

type ExpressNextFunction = (err?: unknown) => void;

/**
 * Floor between background facilitator re-sync attempts.
 *
 * Without it, a sustained facilitator outage on a busy server couples retry
 * (and warn) volume to request rate: a refused connection settles in
 * milliseconds, so every protected request would launch a fresh `/supported`
 * call for the whole outage. One attempt per floor interval bounds both.
 */
const FACILITATOR_SYNC_RETRY_FLOOR_MS = 30_000;

export type ExpressMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction,
) => Promise<void> | void;

export interface SchemeRegistration {
  network: Network;
  server: SchemeNetworkServer;
}

/**
 * Configuration for the Express payment middleware.
 *
 * Extends {@link WeftProductIdentity}, so `name`, `type`, `tags` and `iconUrl`
 * are declared once here and applied to every protected route.
 */
export interface WeftExpressMiddlewareConfig extends WeftProductIdentity {
  /**
   * The seller's Weft API key.
   *
   * Sent as `Authorization: Bearer <key>` on the construction-time
   * `/supported` handshake, which is how the dashboard learns an SDK is
   * deployed before any payment has happened. Optional: without it the
   * handshake is anonymous and everything else works unchanged.
   */
  apiKey?: string;
  facilitator?: WeftFacilitatorConfig;
  schemes?: SchemeRegistration[];
  paywallConfig?: PaywallConfig;
  paywall?: PaywallProvider;
  syncFacilitatorOnStart?: boolean;
}

class ExpressAdapter implements HTTPAdapter {
  constructor(private req: ExpressRequest) {}

  getHeader(name: string): string | undefined {
    const value = this.req.header(name);
    return Array.isArray(value) ? value[0] : value;
  }

  getMethod(): string {
    return this.req.method;
  }

  getPath(): string {
    return this.req.path;
  }

  getUrl(): string {
    const host = this.req.headers.host || "localhost";
    return `${this.req.protocol}://${host}${this.req.path}`;
  }

  getAcceptHeader(): string {
    return this.getHeader("Accept") || "";
  }

  getUserAgent(): string {
    return this.getHeader("User-Agent") || "";
  }

  getQueryParams(): Record<string, string | string[]> {
    return this.req.query as Record<string, string | string[]>;
  }

  getQueryParam(name: string): string | string[] | undefined {
    return this.req.query[name] as string | string[] | undefined;
  }

  getBody(): unknown {
    return this.req.body;
  }
}

/**
 * Create an Express middleware that requires x402 payment for the given routes.
 *
 * Product identity declared on `config` (`name`, `type`, `tags`, `iconUrl`) is
 * merged into every route, so it travels on the 402 challenge's `resource` and
 * from there onto the buyer's payment payload and the settlement event.
 *
 * @param routes - Route configuration, either a path map or a single route;
 *   each route may declare its own `type` to override the product's
 * @param config - Facilitator, scheme, paywall and product identity settings
 * @returns An Express middleware function
 */
export function weftPaymentMiddleware(
  routes: WeftRoutesConfig,
  config?: WeftExpressMiddlewareConfig,
): ExpressMiddleware {
  const facilitatorClient = createFacilitatorClient(
    config?.facilitator,
    buildHandshakeHeaders("express", config?.apiKey, config ?? {}),
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

  return async (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction,
  ) => {
    const adapter = new ExpressAdapter(req);
    const context: HTTPRequestContext = {
      adapter,
      path: req.path,
      method: req.method,
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

    let result;
    try {
      result = await httpServer.processHTTPRequest(
        context,
        config?.paywallConfig,
      );
    } catch (error) {
      // Express 4 does not catch a rejection from an async middleware; under
      // Node's default policy that takes the whole process down. Routing the
      // failure through next(error) keeps it inside Express's own error
      // handling, whatever left the resource server unable to answer.
      return next(error);
    }

    switch (result.type) {
      case "no-payment-required":
        return next();

      case "payment-error": {
        const { response } = result;
        res.status(response.status);
        Object.entries(response.headers).forEach(([key, value]) => {
          const headerValue = Array.isArray(value)
            ? value.join(",")
            : String(value);
          res.setHeader(key, headerValue);
        });
        if (response.isHtml) {
          res.send(response.body);
        } else {
          res.json(response.body || {});
        }
        return;
      }

      case "payment-verified": {
        const { paymentPayload, paymentRequirements } = result;

        const originalWriteHead = res.writeHead.bind(res);
        const originalWrite = res.write.bind(res);
        const originalEnd = res.end.bind(res);
        const originalFlushHeaders = res.flushHeaders.bind(res);

        type BufferedCall =
          | ["writeHead", unknown[]]
          | ["write", unknown[]]
          | ["end", unknown[]]
          | ["flushHeaders", []];
        let bufferedCalls: BufferedCall[] = [];
        let settled = false;

        let endCalled: () => void;
        const endPromise = new Promise<void>((resolve) => {
          endCalled = resolve;
        });

        res.writeHead = function (...args: unknown[]) {
          if (!settled) {
            bufferedCalls.push(["writeHead", args]);
            return res;
          }
          return originalWriteHead(...args);
        } as typeof res.writeHead;

        res.write = function (...args: unknown[]) {
          if (!settled) {
            bufferedCalls.push(["write", args]);
            return true;
          }
          return originalWrite(...args);
        } as typeof res.write;

        res.end = function (...args: unknown[]) {
          if (!settled) {
            bufferedCalls.push(["end", args]);
            endCalled();
            return res;
          }
          return originalEnd(...args);
        } as typeof res.end;

        res.flushHeaders = function () {
          if (!settled) {
            bufferedCalls.push(["flushHeaders", []]);
            return;
          }
          return originalFlushHeaders();
        };

        next();

        await endPromise;

        if (res.statusCode >= 400) {
          settled = true;
          res.writeHead = originalWriteHead;
          res.write = originalWrite;
          res.end = originalEnd;
          res.flushHeaders = originalFlushHeaders;

          for (const [method, args] of bufferedCalls) {
            if (method === "writeHead") originalWriteHead(...args);
            else if (method === "write") originalWrite(...args);
            else if (method === "end") originalEnd(...args);
            else if (method === "flushHeaders") originalFlushHeaders();
          }
          bufferedCalls = [];
          return;
        }

        try {
          const settleResult = await httpServer.processSettlement(
            paymentPayload,
            paymentRequirements,
          );

          if (!settleResult.success) {
            bufferedCalls = [];
            res.status(402).json({
              error: "Settlement failed",
              details: settleResult.errorReason,
            });
            return;
          }

          Object.entries(settleResult.headers).forEach(([key, value]) => {
            const headerValue = Array.isArray(value)
              ? value.join(",")
              : String(value);
            res.setHeader(key, headerValue);
          });
        } catch (error) {
          console.error(error);
          bufferedCalls = [];
          res.status(402).json({
            error: "Settlement failed",
            details: error instanceof Error ? error.message : "Unknown error",
          });
          return;
        } finally {
          settled = true;
          res.writeHead = originalWriteHead;
          res.write = originalWrite;
          res.end = originalEnd;
          res.flushHeaders = originalFlushHeaders;

          for (const [method, args] of bufferedCalls) {
            if (method === "writeHead") originalWriteHead(...args);
            else if (method === "write") originalWrite(...args);
            else if (method === "end") originalEnd(...args);
            else if (method === "flushHeaders") originalFlushHeaders();
          }
          bufferedCalls = [];
        }
        return;
      }
    }
  };
}
