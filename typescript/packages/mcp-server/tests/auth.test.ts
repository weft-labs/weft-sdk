import { describe, it, expect } from "vitest";
import {
  extractAuthorization,
  buildProtectedResourceMetadata,
} from "../src/auth/oauth.js";
import { normalizeAuthorization, looksLikeApiKey } from "../src/auth/api-key.js";
import { hashTokenPrefix } from "../src/logger.js";

describe("extractAuthorization", () => {
  it("reads lowercase header", () => {
    expect(extractAuthorization({ authorization: "Bearer abc" })).toBe(
      "Bearer abc",
    );
  });
  it("reads capitalized header", () => {
    expect(extractAuthorization({ Authorization: "Bearer abc" })).toBe(
      "Bearer abc",
    );
  });
  it("returns undefined when missing", () => {
    expect(extractAuthorization({})).toBeUndefined();
  });
  it("returns undefined when empty", () => {
    expect(extractAuthorization({ authorization: "   " })).toBeUndefined();
  });
  it("handles array-valued headers", () => {
    expect(extractAuthorization({ authorization: ["Bearer x", "Bearer y"] })).toBe(
      "Bearer x",
    );
  });
});

describe("normalizeAuthorization", () => {
  it("keeps a Bearer header as-is shape", () => {
    expect(normalizeAuthorization("Bearer abc.def")).toBe("Bearer abc.def");
  });
  it("rewrites ApiKey scheme to Bearer", () => {
    expect(normalizeAuthorization("ApiKey wk_live_xyz")).toBe(
      "Bearer wk_live_xyz",
    );
  });
  it("wraps a bare Weft API key", () => {
    expect(normalizeAuthorization("wk_live_xyz")).toBe("Bearer wk_live_xyz");
  });
  it("wraps a bare test-mode key", () => {
    expect(normalizeAuthorization("wk_test_xyz")).toBe("Bearer wk_test_xyz");
  });
  it("rejects unknown bare strings (no scheme, no Weft prefix)", () => {
    expect(normalizeAuthorization("opaque-token")).toBeUndefined();
  });
  it("returns undefined for empty/undefined input", () => {
    expect(normalizeAuthorization(undefined)).toBeUndefined();
    expect(normalizeAuthorization("")).toBeUndefined();
    expect(normalizeAuthorization("   ")).toBeUndefined();
  });
});

describe("looksLikeApiKey", () => {
  it("recognizes live keys", () => {
    expect(looksLikeApiKey("Bearer wk_live_abc")).toBe(true);
  });
  it("recognizes test keys", () => {
    expect(looksLikeApiKey("Bearer wk_test_abc")).toBe(true);
  });
  it("returns false for OAuth-style opaque tokens", () => {
    expect(looksLikeApiKey("Bearer eyJhbGc...")).toBe(false);
  });
  it("returns false for undefined", () => {
    expect(looksLikeApiKey(undefined)).toBe(false);
  });
});

describe("hashTokenPrefix", () => {
  it("returns anon for missing", () => {
    expect(hashTokenPrefix(undefined)).toBe("anon");
    expect(hashTokenPrefix("")).toBe("anon");
    expect(hashTokenPrefix("Bearer ")).toBe("anon");
  });
  it("hashes a token to a short stable prefix", () => {
    const a = hashTokenPrefix("Bearer abc");
    const b = hashTokenPrefix("Bearer abc");
    expect(a).toBe(b);
    expect(a).toMatch(/^sha256:[0-9a-f]{8}$/);
  });
  it("strips the Bearer scheme before hashing", () => {
    expect(hashTokenPrefix("Bearer abc")).toBe(hashTokenPrefix("abc"));
  });
  it("different tokens hash differently", () => {
    expect(hashTokenPrefix("Bearer one")).not.toBe(
      hashTokenPrefix("Bearer two"),
    );
  });
});

describe("buildProtectedResourceMetadata", () => {
  it("publishes RFC 9728 shape with the right fields", () => {
    const doc = buildProtectedResourceMetadata({
      resourceUrl: "https://mcp.weft.network/",
      authServerUrl: "https://app.weftlabs.com/",
    });
    expect(doc).toMatchObject({
      resource: "https://mcp.weft.network",
      authorization_servers: ["https://app.weftlabs.com"],
      bearer_methods_supported: ["header"],
    });
    expect(doc.scopes_supported).toEqual([
      "weft.balance",
      "weft.search",
      "weft.fetch",
    ]);
  });
  it("allows scope override", () => {
    const doc = buildProtectedResourceMetadata({
      resourceUrl: "https://mcp.weft.network",
      authServerUrl: "https://app.weftlabs.com",
      scopesSupported: ["weft.read"],
    });
    expect(doc.scopes_supported).toEqual(["weft.read"]);
  });
});
