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

export type ExpressMiddleware = (
  req: ExpressRequest,
  res: ExpressResponse,
  next: ExpressNextFunction
) => Promise<void> | void;

export interface SchemeRegistration {
  network: Network;
  server: SchemeNetworkServer;
}

export interface WeftExpressMiddlewareConfig {
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

export function weftPaymentMiddleware(
  routes: RoutesConfig,
  config?: WeftExpressMiddlewareConfig
): ExpressMiddleware {
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

  return async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
    const adapter = new ExpressAdapter(req);
    const context: HTTPRequestContext = {
      adapter,
      path: req.path,
      method: req.method,
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
        res.status(response.status);
        Object.entries(response.headers).forEach(([key, value]) => {
          const headerValue = Array.isArray(value) ? value.join(",") : String(value);
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
            paymentRequirements
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
            const headerValue = Array.isArray(value) ? value.join(",") : String(value);
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
