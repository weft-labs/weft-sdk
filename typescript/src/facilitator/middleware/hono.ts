import {
  HTTPRequestContext,
  PaywallConfig,
  PaywallProvider,
  x402HTTPResourceServer,
  x402ResourceServer,
  RoutesConfig,
  HTTPAdapter,
} from "@x402/core/server";
import { SchemeNetworkServer, Network } from "@x402/core/types";
import { createFacilitatorClient, WeftFacilitatorConfig } from "../client";

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
  next: () => Promise<void>
) => Promise<Response | void>;

export interface SchemeRegistration {
  network: Network;
  server: SchemeNetworkServer;
}

export interface WeftHonoMiddlewareConfig {
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

export function weftPaymentMiddlewareHono(
  routes: RoutesConfig,
  config?: WeftHonoMiddlewareConfig
): HonoMiddleware {
  const facilitatorClient = createFacilitatorClient(config?.facilitator);
  const resourceServer = new x402ResourceServer(facilitatorClient);

  if (config?.schemes) {
    config.schemes.forEach(({ network, server: schemeServer }) => {
      resourceServer.register(network, schemeServer);
    });
  }

  const httpServer = new x402HTTPResourceServer(resourceServer, routes);

  if (config?.paywall) {
    httpServer.registerPaywallProvider(config.paywall);
  }

  const syncOnStart = config?.syncFacilitatorOnStart ?? true;
  let initPromise: Promise<void> | null = syncOnStart
    ? httpServer.initialize()
    : null;

  return async (c: HonoContext, next: () => Promise<void>) => {
    const adapter = new HonoAdapter(c);
    const context: HTTPRequestContext = {
      adapter,
      path: c.req.path,
      method: c.req.method,
      paymentHeader: adapter.getHeader("payment-signature") || adapter.getHeader("x-payment"),
    };

    if (!httpServer.requiresPayment(context)) {
      return next();
    }

    if (initPromise) {
      await initPromise;
      initPromise = null;
    }

    const result = await httpServer.processHTTPRequest(context, config?.paywallConfig);

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
            paymentRequirements
          );

          if (!settleResult.success) {
            res = c.json(
              {
                error: "Settlement failed",
                details: settleResult.errorReason,
              },
              402
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
            402
          );
        }

        c.res = res;
        return;
      }
    }
  };
}
