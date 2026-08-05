import { describe, expect, it } from "vitest";
import { WeftClient, WeftError } from "../src";

describe("Weft application errors", () => {
  it("normalizes API envelopes and request identity", async () => {
    const client = new WeftClient({
      apiKey: "wk_test",
      fetchApi: async () =>
        new Response(
          JSON.stringify({
            error: {
              code: "RATE_LIMITED",
              message: "slow down",
              request_id: "req-body",
            },
          }),
          { status: 429, headers: { "content-type": "application/json" } },
        ),
    });

    await expect(client.me()).rejects.toMatchObject<WeftError>({
      status: 429,
      code: "RATE_LIMITED",
      message: "slow down",
      requestId: "req-body",
      retryable: true,
    });
  });

  it("requires caller-owned retry identity for paid fetch", () => {
    const client = new WeftClient({ apiKey: "wk_test" });
    expect(() =>
      client.fetch(
        { url: "https://merchant.example", maxCostUsd: "0.05" },
        { idempotencyKey: "" },
      ),
    ).toThrow("idempotencyKey is required");
  });
});
