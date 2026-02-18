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
      `Invalid URL format: URL must start with http:// or https://, got: ${url}`
    );
  }
}

export function resolveUrl(config?: WeftFacilitatorConfig): string {
  if (config?.url) {
    return config.url;
  }

  if (typeof process !== "undefined" && process.env?.[X402_FACILITATOR_URL_ENV]) {
    return process.env[X402_FACILITATOR_URL_ENV]!;
  }

  return X402_FACILITATOR_URL;
}

export function createFacilitatorClient(
  config?: WeftFacilitatorConfig
): HTTPFacilitatorClient {
  const url = resolveUrl(config);
  validateUrl(url);

  return new HTTPFacilitatorClient({
    url,
    createAuthHeaders: config?.createAuthHeaders,
  });
}
