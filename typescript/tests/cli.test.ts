import { describe, expect, it, vi } from "vitest";
import {
  EXIT_API,
  EXIT_AUTH,
  EXIT_INTERNAL,
  EXIT_SUCCESS,
  EXIT_USAGE,
  runCli,
} from "../src/cli";

function capture() {
  const out: string[] = [];
  const err: string[] = [];
  return {
    out,
    err,
    writeOut: (value: string) => out.push(value),
    writeErr: (value: string) => err.push(value),
  };
}

describe("weft CLI", () => {
  it("never accepts an API key in argv", async () => {
    const io = capture();
    const code = await runCli(["balance", "--api-key", "wk_secret"], {
      ...io,
      env: {},
    });
    expect(code).toBe(EXIT_USAGE);
    expect(io.err.join("")).not.toContain("wk_secret");
    expect(JSON.parse(io.err[0])).toMatchObject({
      schema_version: "1",
      error: { code: "UNSAFE_CREDENTIAL_ARGUMENT" },
    });
  });

  it("requires an environment or stdin credential", async () => {
    const io = capture();
    expect(await runCli(["me"], { ...io, env: {} })).toBe(EXIT_AUTH);
    expect(JSON.parse(io.err[0]).error.code).toBe("API_KEY_REQUIRED");
  });

  it("uses stdin auth and emits a stable success envelope", async () => {
    const io = capture();
    const fetchApi = vi.fn(
      async () =>
        new Response(
          JSON.stringify({ data: { principal_type: "user", id: 1 } }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        ),
    );
    const code = await runCli(
      ["me", "--api-key-stdin", "--base-url", "https://api.example"],
      {
        ...io,
        env: {},
        readStdin: async () => "wk_stdin\n",
        fetchApi,
      },
    );
    expect(code).toBe(EXIT_SUCCESS);
    expect(JSON.parse(io.out[0])).toMatchObject({
      schema_version: "1",
      ok: true,
      command: "me",
    });
    expect(
      new Headers(fetchApi.mock.calls[0][1]?.headers).get("authorization"),
    ).toBe("Bearer wk_stdin");
  });

  it("requires a fetch cost and generates an idempotency key", async () => {
    const missing = capture();
    expect(
      await runCli(["fetch", "https://merchant.example"], {
        ...missing,
        env: { WEFT_API_KEY: "wk_test" },
      }),
    ).toBe(EXIT_USAGE);

    const io = capture();
    const fetchApi = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            status: 200,
            headers: {},
            body_base64: "",
            paid_usd: "0",
            held_usd: "0",
            payment_status: "free",
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        ),
    );
    expect(
      await runCli(
        ["fetch", "https://merchant.example", "--max-cost-usd", "0.10"],
        {
          ...io,
          env: {
            WEFT_API_KEY: "wk_test",
            WEFT_BASE_URL: "https://api.example",
          },
          fetchApi,
          generateIdempotencyKey: () => "generated-key",
        },
      ),
    ).toBe(EXIT_SUCCESS);
    expect(
      new Headers(fetchApi.mock.calls[0][1]?.headers).get("idempotency-key"),
    ).toBe("generated-key");
    expect(JSON.parse(io.out[0]).meta).toEqual({
      idempotency_key: "generated-key",
    });
  });

  it("returns the paid-fetch retry identity after an uncertain failure", async () => {
    const io = capture();
    const fetchApi = vi.fn(async () => {
      throw new Error("request timed out");
    });

    expect(
      await runCli(
        ["fetch", "https://merchant.example", "--max-cost-usd", "0.10"],
        {
          ...io,
          env: { WEFT_API_KEY: "wk_test" },
          fetchApi,
          generateIdempotencyKey: () => "retry-after-timeout",
        },
      ),
    ).toBe(EXIT_INTERNAL);
    expect(
      new Headers(fetchApi.mock.calls[0][1]?.headers).get("idempotency-key"),
    ).toBe("retry-after-timeout");
    expect(JSON.parse(io.err[0])).toMatchObject({
      ok: false,
      command: "fetch",
      error: { code: "INTERNAL_ERROR" },
      meta: { idempotency_key: "retry-after-timeout" },
    });
  });

  it("preserves API error details and maps auth status to exit 3", async () => {
    const io = capture();
    const fetchApi = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            error: { code: "POLICY_VIOLATION", message: "limit reached" },
          }),
          { status: 403, headers: { "content-type": "application/json" } },
        ),
    );
    const code = await runCli(["balance"], {
      ...io,
      env: { WEFT_API_KEY: "wk_test" },
      fetchApi,
    });
    expect(code).toBe(EXIT_AUTH);
    expect(JSON.parse(io.err[0])).toMatchObject({
      schema_version: "1",
      ok: false,
      command: "balance",
      error: { code: "POLICY_VIOLATION", message: "limit reached" },
    });
  });

  it("maps other 4xx to exit 4 and 5xx to exit 5", async () => {
    for (const [status, exitCode] of [
      [422, EXIT_API],
      [502, EXIT_INTERNAL],
    ] as const) {
      const io = capture();
      const code = await runCli(["search", "weather"], {
        ...io,
        env: { WEFT_API_KEY: "wk_test" },
        fetchApi: async () =>
          new Response(JSON.stringify({ error: "UPSTREAM_ERROR" }), {
            status,
            headers: { "content-type": "application/json" },
          }),
      });
      expect(code).toBe(exitCode);
    }
  });

  it("enforces search and pagination bounds before calling the API", async () => {
    const fetchApi = vi.fn();
    for (const args of [
      ["search", "weather", "--max-results", "51"],
      ["purchases", "--per-page", "101"],
    ]) {
      const io = capture();
      expect(
        await runCli(args, {
          ...io,
          env: { WEFT_API_KEY: "wk_test" },
          fetchApi,
        }),
      ).toBe(EXIT_USAGE);
    }
    expect(fetchApi).not.toHaveBeenCalled();
  });
});
