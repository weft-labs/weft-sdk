/**
 * Typed HTTP client for the weft-app `/api/v1` surface used by the hosted MCP
 * relay. The client is intentionally tiny: it forwards the inbound
 * `Authorization` header verbatim, posts JSON, parses JSON, and surfaces
 * structured error payloads so the tool layer can map them to MCP errors.
 *
 * No logging of request/response bodies happens here (see `logger.ts`). All
 * state lives in weft-app; this client owns no caches.
 */

export interface WeftAppClientOptions {
  /** Base URL for weft-app, e.g. `https://app.weftlabs.com`. */
  baseUrl: string;
  /** Optional `fetch` injection — primarily for tests. Defaults to global. */
  fetchImpl?: typeof fetch;
  /** Per-request timeout in ms. */
  timeoutMs?: number;
}

/**
 * Shape of the structured-error payload weft-app returns for policy / budget
 * rejections. The MCP tool layer maps this into a user-facing MCP error.
 *
 * Example:
 *   {
 *     "error": "POLICY_VIOLATION_MAX_TX",
 *     "details": { "limit_usd": "0.50", "attempted_usd": "1.20" },
 *     "dashboard_url": "https://app.weftlabs.com/account/policy"
 *   }
 */
export interface WeftAppStructuredError {
  error: string;
  details?: Record<string, unknown>;
  dashboard_url?: string;
  message?: string;
}

export class WeftAppError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: Record<string, unknown>;
  readonly dashboardUrl?: string;

  constructor(status: number, payload: WeftAppStructuredError) {
    super(payload.message ?? payload.error);
    this.name = "WeftAppError";
    this.status = status;
    this.code = payload.error;
    this.details = payload.details;
    this.dashboardUrl = payload.dashboard_url;
  }
}

export interface BalanceResponse {
  balance_usd: string;
  promo_credit_usd: string;
  spent_today_usd: string;
  spent_week_usd: string;
  policy: {
    max_tx_usd: string;
    daily_cap_usd: string;
    weekly_cap_usd: string;
  };
}

export interface SearchHit {
  url: string;
  title?: string;
  snippet?: string;
  price_usd?: string;
  merchant?: string;
}

export interface SearchResponse {
  query: string;
  hits: SearchHit[];
}

export interface FetchParams {
  url: string;
  max_cost_usd: string;
  method?: "GET" | "POST";
  body?: string;
  headers?: Record<string, string>;
}

export interface FetchResponse {
  status: number;
  body: string;
  payment?: {
    receipt_id: string;
    amount_usd: string;
    facilitator: string;
  };
  merchant_reputation?: {
    score: number;
    sample_size: number;
  };
}

export class WeftAppClient {
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;
  private readonly timeoutMs: number;

  constructor(opts: WeftAppClientOptions) {
    if (!opts.baseUrl) {
      throw new Error("WeftAppClient: baseUrl is required");
    }
    this.baseUrl = opts.baseUrl.replace(/\/+$/, "");
    this.fetchImpl = opts.fetchImpl ?? globalThis.fetch.bind(globalThis);
    this.timeoutMs = opts.timeoutMs ?? 30_000;
  }

  async balance(authorization: string): Promise<BalanceResponse> {
    return this.post<BalanceResponse>("/api/v1/balance", {}, authorization);
  }

  async search(
    authorization: string,
    params: { query: string; limit?: number },
  ): Promise<SearchResponse> {
    return this.post<SearchResponse>("/api/v1/search", params, authorization);
  }

  async fetchResource(
    authorization: string,
    params: FetchParams,
  ): Promise<FetchResponse> {
    return this.post<FetchResponse>("/api/v1/fetch", params, authorization);
  }

  private async post<T>(
    path: string,
    body: unknown,
    authorization: string,
  ): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await this.fetchImpl(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          authorization,
          "user-agent": "weft-mcp-server/0.1.0",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const text = await res.text();
      const parsed: unknown = text.length > 0 ? safeJson(text) : undefined;

      if (!res.ok) {
        const payload = isStructuredError(parsed)
          ? parsed
          : {
              error: `HTTP_${res.status}`,
              message: `weft-app returned ${res.status}`,
            };
        throw new WeftAppError(res.status, payload);
      }

      return parsed as T;
    } finally {
      clearTimeout(timer);
    }
  }
}

function safeJson(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function isStructuredError(v: unknown): v is WeftAppStructuredError {
  return (
    typeof v === "object" &&
    v !== null &&
    typeof (v as { error?: unknown }).error === "string"
  );
}
