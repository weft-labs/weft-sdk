import { describe, it, expect } from "vitest";

describe("SDK exports", () => {
  it("exports generated API classes", async () => {
    const sdk = await import("../src/index");

    // Generated API classes
    expect(sdk.AccountApi).toBeDefined();
    expect(sdk.PaymentsApi).toBeDefined();
    expect(sdk.APIKeysApi).toBeDefined();
    expect(sdk.AgentsApi).toBeDefined();
    expect(sdk.AuthApi).toBeDefined();
    expect(sdk.DefaultApi).toBeDefined();
  });

  it("exports Configuration class", async () => {
    const sdk = await import("../src/index");
    expect(sdk.Configuration).toBeDefined();
  });

  it("exports generated model types", async () => {
    const sdk = await import("../src/index");

    // Models should be importable (TypeScript types are erased at runtime,
    // but the fromJSON/toJSON helpers should exist for non-enum models)
    expect(sdk.PaymentFromJSON).toBeDefined();
    expect(sdk.AgentFromJSON).toBeDefined();
    expect(sdk.ApiKeyFromJSON).toBeDefined();
    expect(sdk.UserFromJSON).toBeDefined();
  });

  it("exports facilitator client", async () => {
    const sdk = await import("../src/index");
    expect(sdk.createFacilitatorClient).toBeDefined();
    expect(sdk.X402_FACILITATOR_URL).toBe("https://x402.weft.network");
  });

  it("exports fee helpers", async () => {
    const sdk = await import("../src/index");
    expect(sdk.getFeeInfo).toBeDefined();
    expect(sdk.invalidateFeeCache).toBeDefined();
  });

  it("can instantiate Configuration", async () => {
    const sdk = await import("../src/index");
    const config = new sdk.Configuration({
      basePath: "https://staging.weft.network",
      headers: { Authorization: "Bearer ax_live_test" },
    });
    expect(config.basePath).toBe("https://staging.weft.network");
  });

  it("can instantiate API client with config", async () => {
    const sdk = await import("../src/index");
    const config = new sdk.Configuration({
      basePath: "https://staging.weft.network",
    });
    const payments = new sdk.PaymentsApi(config);
    expect(payments).toBeDefined();
  });
});
