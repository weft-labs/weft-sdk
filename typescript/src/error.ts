import { FetchError, ResponseError } from "./generated";

export interface WeftErrorOptions {
  status: number;
  code: string;
  message: string;
  requestId?: string;
  retryable: boolean;
  details?: unknown;
}

export class WeftError extends Error {
  readonly status: number;
  readonly code: string;
  readonly requestId?: string;
  readonly retryable: boolean;
  readonly details?: unknown;

  constructor(options: WeftErrorOptions) {
    super(options.message);
    this.name = "WeftError";
    this.status = options.status;
    this.code = options.code;
    this.requestId = options.requestId;
    this.retryable = options.retryable;
    this.details = options.details;
  }
}

export async function normalizeWeftError(error: unknown): Promise<unknown> {
  if (error instanceof FetchError) {
    // No HTTP response exists, so the outcome is uncertain. Callers retry
    // with backoff and, for paid fetch, reuse the same idempotency key.
    return new WeftError({
      status: 0,
      code: "NETWORK_ERROR",
      message: `Network failure before a Weft API response: ${
        error.cause?.message ?? error.message
      }`,
      retryable: true,
      details: error.cause,
    });
  }
  if (!(error instanceof ResponseError)) return error;

  let details: unknown;
  try {
    details = await error.response.json();
  } catch {
    details = undefined;
  }
  const body = details as
    | {
        error?:
          | { code?: string; message?: string; request_id?: string }
          | string;
        code?: string;
        message?: string;
        request_id?: string;
      }
    | undefined;
  const nested = typeof body?.error === "object" ? body.error : undefined;
  const status = error.response.status;

  return new WeftError({
    status,
    code:
      nested?.code ??
      body?.code ??
      (typeof body?.error === "string" ? body.error : `HTTP_${status}`),
    message:
      nested?.message ?? body?.message ?? `Weft API returned HTTP ${status}`,
    requestId:
      nested?.request_id ??
      body?.request_id ??
      error.response.headers.get("x-request-id") ??
      undefined,
    retryable: status === 429 || status >= 500,
    details,
  });
}
