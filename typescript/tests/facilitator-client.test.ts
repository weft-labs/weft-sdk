import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  validateUrl,
  resolveUrl,
  X402_FACILITATOR_URL,
  X402_FACILITATOR_URL_ENV,
} from "../src/facilitator/client";

describe("validateUrl", () => {
  it("accepts https URLs", () => {
    expect(() => validateUrl("https://x402.weft.network")).not.toThrow();
  });

  it("accepts http URLs", () => {
    expect(() => validateUrl("http://localhost:7676")).not.toThrow();
  });

  it("rejects empty string", () => {
    expect(() => validateUrl("")).toThrow("URL cannot be empty");
  });

  it("rejects whitespace-only string", () => {
    expect(() => validateUrl("   ")).toThrow("URL cannot be empty");
  });

  it("rejects URLs without protocol", () => {
    expect(() => validateUrl("x402.weft.network")).toThrow(
      "URL must start with http:// or https://"
    );
  });

  it("rejects ftp protocol", () => {
    expect(() => validateUrl("ftp://x402.weft.network")).toThrow(
      "URL must start with http:// or https://"
    );
  });
});

describe("resolveUrl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env[X402_FACILITATOR_URL_ENV];
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns config URL when provided", () => {
    expect(resolveUrl({ url: "https://custom.example.com" })).toBe(
      "https://custom.example.com"
    );
  });

  it("returns env var URL when no config", () => {
    process.env[X402_FACILITATOR_URL_ENV] = "https://env.example.com";
    expect(resolveUrl()).toBe("https://env.example.com");
  });

  it("prefers config URL over env var", () => {
    process.env[X402_FACILITATOR_URL_ENV] = "https://env.example.com";
    expect(resolveUrl({ url: "https://config.example.com" })).toBe(
      "https://config.example.com"
    );
  });

  it("returns default URL when no config and no env", () => {
    expect(resolveUrl()).toBe(X402_FACILITATOR_URL);
  });

  it("returns default URL when config has no url field", () => {
    expect(resolveUrl({})).toBe(X402_FACILITATOR_URL);
  });
});
