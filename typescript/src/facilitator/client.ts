import { HTTPFacilitatorClient, FacilitatorConfig } from "@x402/core/server";

export const X402_FACILITATOR_URL = "https://x402.weft.network";
export const X402_FACILITATOR_URL_ENV = "X402_FACILITATOR_URL";

export interface WeftFacilitatorConfig {
  url?: string;
  createAuthHeaders?: FacilitatorConfig["createAuthHeaders"];
}

export function validateUrl(url: string): void {
  if (!url || url.trim() === "") {
    throw new Error("Invalid URL: URL cannot be empty");
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    throw new Error(
      `Invalid URL format: URL must start with http:// or https://, got: ${url}`,
    );
  }
}

export function resolveUrl(config?: WeftFacilitatorConfig): string {
  if (config?.url) {
    return config.url;
  }

  if (
    typeof process !== "undefined" &&
    process.env?.[X402_FACILITATOR_URL_ENV]
  ) {
    return process.env[X402_FACILITATOR_URL_ENV]!;
  }

  return X402_FACILITATOR_URL;
}

type AuthHeadersByPath = Awaited<
  ReturnType<NonNullable<FacilitatorConfig["createAuthHeaders"]>>
>;

/**
 * Reject a flat headers object the way `@x402/core` itself would.
 *
 * Upstream's `HTTPFacilitatorClient` throws when `createAuthHeaders` returns
 * `{ Authorization: ... }` instead of `{ supported: { Authorization: ... } }`,
 * because silently dropping auth on every request is worse than failing loud.
 * Merging the handshake's own `supported` headers in would mask that check —
 * the merged object always has a path key — so the check runs here first,
 * with the same failure mode a misconfigured seller sees today.
 *
 * @param headers - What the seller's `createAuthHeaders` returned
 */
function assertPathKeyedAuthHeaders(headers: AuthHeadersByPath): void {
  const isHeaderObject = (value: unknown): boolean =>
    typeof value === "object" && value !== null && !Array.isArray(value);

  const hasPathKey = ["verify", "settle", "supported", "bazaar"].some((key) =>
    isHeaderObject(headers[key as keyof AuthHeadersByPath]),
  );
  const looksFlat =
    !hasPathKey &&
    Object.values(headers).some((value) => !isHeaderObject(value));

  if (looksFlat) {
    throw new Error(
      "createAuthHeaders must return an object keyed by facilitator path, " +
        'e.g. { verify: { Authorization: "..." }, settle: { ... }, ' +
        "supported: { ... } }, but received a flat headers object.",
    );
  }
}

export function createFacilitatorClient(
  config?: WeftFacilitatorConfig,
  supportedHeaders?: Record<string, string>,
): HTTPFacilitatorClient {
  const url = resolveUrl(config);
  validateUrl(url);

  const sellerCreateAuthHeaders = config?.createAuthHeaders;

  const createAuthHeaders =
    supportedHeaders && Object.keys(supportedHeaders).length > 0
      ? async (): Promise<AuthHeadersByPath> => {
          const sellerHeaders = sellerCreateAuthHeaders
            ? await sellerCreateAuthHeaders()
            : undefined;
          if (sellerHeaders) {
            assertPathKeyedAuthHeaders(sellerHeaders);
          }
          // The seller's own headers win on conflict: an explicit
          // createAuthHeaders is a more deliberate act than `apiKey`. The
          // conflict check is case-insensitive because header names are —
          // a plain spread would keep both spellings as distinct keys, and
          // the HTTP layer folds those into one comma-joined value, garbling
          // the credential the seller meant to send.
          const supported: Record<string, string> = { ...supportedHeaders };
          for (const [name, value] of Object.entries(
            sellerHeaders?.supported ?? {},
          )) {
            for (const existing of Object.keys(supported)) {
              if (existing.toLowerCase() === name.toLowerCase()) {
                delete supported[existing];
              }
            }
            supported[name] = value;
          }
          return { ...sellerHeaders, supported };
        }
      : sellerCreateAuthHeaders;

  return new HTTPFacilitatorClient({
    url,
    createAuthHeaders,
  });
}
