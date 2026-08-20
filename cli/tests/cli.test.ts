import {
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import {
  EXIT_API,
  EXIT_AUTH,
  EXIT_INTERNAL,
  EXIT_SUCCESS,
  EXIT_USAGE,
  runCli,
} from "../src/cli";
import { resolveCredentialsPath } from "../src/credentials";

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
  it("is the sole package owner of the weft executable", () => {
    const packageJson = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    );
    expect(packageJson.bin).toEqual({ weft: "./bin/weft.mjs" });
    expect(packageJson.dependencies).toEqual({
      "@weft-labs/sdk": "workspace:*",
    });
  });

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

  it("describes all commands as machine-readable JSON without authentication", async () => {
    const io = capture();
    const code = await runCli(["--help"], { ...io, env: {} });

    expect(code).toBe(EXIT_SUCCESS);
    expect(io.err).toEqual([]);
    expect(JSON.parse(io.out[0])).toMatchObject({
      schema_version: "1",
      ok: true,
      command: "help",
      data: {
        usage: "weft <command> [options]",
        commands: [
          { name: "bootstrap" },
          { name: "auth" },
          { name: "me" },
          { name: "balance" },
          { name: "search" },
          { name: "fetch" },
          { name: "purchases" },
        ],
        authentication: ["WEFT_API_KEY", "--api-key-stdin"],
        exit_codes: { success: 0, usage: 2, auth: 3, api: 4, internal: 5 },
      },
    });
  });

  it("describes each command without authentication or a network call", async () => {
    const fetchApi = vi.fn();
    for (const command of [
      "bootstrap",
      "auth",
      "me",
      "balance",
      "search",
      "fetch",
      "purchases",
    ]) {
      const io = capture();
      expect(
        await runCli([command, "--help"], { ...io, env: {}, fetchApi }),
      ).toBe(EXIT_SUCCESS);
      expect(JSON.parse(io.out[0])).toMatchObject({
        schema_version: "1",
        ok: true,
        command: "help",
        data: { command },
      });
    }
    expect(fetchApi).not.toHaveBeenCalled();
  });

  it("bootstraps with correct DCR/create payload and stores bootstrap secrets atomically", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-bootstrap-"));
    const credFile = join(dir, "credentials.json");
    const io = capture();
    const responses = [
      {
        client_id: "oauth-client-id",
      },
      {
        data: {
          id: "boot-id",
          status: "pending",
          capabilities: ["balance", "fetch", "search"],
          expires_at: "2026-01-01T00:00:00Z",
          temporary_api_key: "temp-api-key-123",
          device_code: "device-abc",
          approval: {
            method: "device",
            interval: 7,
            expires_in: 1200,
          },
        },
      },
    ];
    const fetchApi = vi
      .fn()
      .mockImplementation(async (_url: string, init: RequestInit) => {
        const body = (init.body as string) ?? "";
        const item = responses.shift()!;
        if (_url.includes("/oauth/register")) {
          const parsed = JSON.parse(body);
          expect(parsed.client_name).toBe("Weft CLI");
          expect(parsed.redirect_uris).toEqual(["http://localhost/callback"]);
          expect(parsed.grant_types).toEqual([
            "urn:ietf:params:oauth:grant-type:device_code",
            "refresh_token",
          ]);
          expect(parsed.token_endpoint_auth_method).toBe("none");
          expect(parsed.scope).toBe("balance fetch search");
        }
        if (_url.includes("/api/v1/account_bootstraps")) {
          const parsed = JSON.parse(body);
          expect(parsed.oauth_client_id).toBe("oauth-client-id");
          expect(parsed.host_name).toBe("Weft CLI");
          expect(parsed.requested_scopes).toEqual([
            "balance",
            "fetch",
            "search",
          ]);
        }

        return new Response(JSON.stringify(item), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      });

    const code = await runCli(
      [
        "bootstrap",
        "--email",
        "agent@example",
        "--agent-name",
        "agent-name",
        "--reason",
        "demo",
        "--base-url",
        "https://api.example",
      ],
      {
        ...io,
        env: { WEFT_CREDENTIALS_FILE: credFile },
        fetchApi,
      },
    );

    expect(code).toBe(EXIT_SUCCESS);
    expect(fetchApi).toHaveBeenCalledTimes(2);
    const output = JSON.parse(io.out[0]);
    expect(output.data.status).toBe("pending");
    expect(output.data).not.toHaveProperty("temporary_api_key");
    expect(output.data).not.toHaveProperty("device_code");

    const saved = JSON.parse(readFileSync(credFile, "utf8"));
    expect(saved).toMatchObject({
      type: "bootstrap",
      bootstrap_id: "boot-id",
      temporary_api_key: "temp-api-key-123",
      device_code: "device-abc",
      client_id: "oauth-client-id",
      polling_interval: 7,
      expiry: "2026-01-01T00:00:00Z",
    });
    const fileMode = statSync(credFile).mode & 0o777;
    const parentMode = statSync(dir).mode & 0o777;
    expect(fileMode).toBe(0o600);
    expect(parentMode).toBe(0o700);
    rmSync(dir, { recursive: true, force: true });
  });

  it("uses USERPROFILE for the default credential path on Windows", () => {
    expect(resolveCredentialsPath({ USERPROFILE: "C:/Users/agent" })).toBe(
      "C:/Users/agent/.config/weft/credentials.json",
    );
  });

  it("rejects an argv credential even when help is requested", async () => {
    const io = capture();
    expect(
      await runCli(["balance", "--help", "--api-key", "wk_secret"], {
        ...io,
        env: {},
      }),
    ).toBe(EXIT_USAGE);
    expect(io.out).toEqual([]);
    expect(io.err.join("")).not.toContain("wk_secret");
    expect(JSON.parse(io.err[0]).error.code).toBe("UNSAFE_CREDENTIAL_ARGUMENT");
  });

  it("requires an environment or stdin credential", async () => {
    const io = capture();
    expect(await runCli(["me"], { ...io, env: {} })).toBe(EXIT_AUTH);
    expect(JSON.parse(io.err[0]).error.code).toBe("API_KEY_REQUIRED");
  });

  it("uses stored bootstrap temporary key for normal commands", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-stored-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "bootstrap",
        base_url: "https://api.example",
        bootstrap_id: "boot-id",
        temporary_api_key: "stored-temp-key",
        device_code: "dev-code",
        client_id: "client-id",
        expiry: "2026-01-01T00:00:00Z",
        polling_interval: 5,
      }),
    );

    const io = capture();
    const fetchApi = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            principal_type: "agent",
            id: 999,
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        ),
    );

    expect(
      await runCli(["me"], {
        ...io,
        env: { WEFT_CREDENTIALS_FILE: credFile, WEFT_API_KEY: "", HOME: "" },
        fetchApi,
      }),
    ).toBe(EXIT_SUCCESS);
    const auth = new Headers(fetchApi.mock.calls[0][1]?.headers).get(
      "authorization",
    );
    expect(auth).toBe("Bearer stored-temp-key");
    expect(fetchApi.mock.calls[0][0]).toBe("https://api.example/api/v1/me");
    rmSync(dir, { recursive: true, force: true });
  });

  it("does not fall back to stored credentials for empty API key stdin", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-empty-stdin-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "bootstrap",
        base_url: "https://api.example",
        bootstrap_id: "boot-id",
        temporary_api_key: "stored-temp-key",
        device_code: "dev-code",
        client_id: "client-id",
        expiry: "2026-01-01T00:00:00Z",
        polling_interval: 5,
      }),
    );
    const io = capture();
    const fetchApi = vi.fn();

    expect(
      await runCli(["me", "--api-key-stdin"], {
        ...io,
        env: { WEFT_CREDENTIALS_FILE: credFile },
        readStdin: async () => "\n",
        fetchApi,
      }),
    ).toBe(EXIT_AUTH);
    expect(JSON.parse(io.err[0]).error.code).toBe("API_KEY_REQUIRED");
    expect(fetchApi).not.toHaveBeenCalled();
    rmSync(dir, { recursive: true, force: true });
  });

  it("checks auth status and returns pending", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-auth-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "bootstrap",
        base_url: "https://api.example",
        bootstrap_id: "boot-id",
        temporary_api_key: "stored-temp-key",
        device_code: "dev-code",
        client_id: "client-id",
        expiry: "2026-01-01T00:00:00Z",
        polling_interval: 7,
      }),
    );

    const io = capture();
    const fetchApi = vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            data: {
              id: "boot-id",
              status: "pending",
            },
          }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          },
        ),
    );

    expect(
      await runCli(
        ["auth", "status", "--base-url", "https://cli-arg.example"],
        {
          ...io,
          env: { WEFT_CREDENTIALS_FILE: credFile },
          fetchApi,
        },
      ),
    ).toBe(EXIT_SUCCESS);
    expect(JSON.parse(io.out[0])).toMatchObject({
      ok: true,
      data: { status: "pending" },
    });
    expect(fetchApi).toHaveBeenCalledWith(
      "https://api.example/api/v1/account_bootstraps/boot-id",
      expect.objectContaining({ method: "GET" }),
    );
    rmSync(dir, { recursive: true, force: true });
  });

  it("exchanges claimed bootstrap for OAuth tokens and replaces credentials", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-auth-claimed-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "bootstrap",
        base_url: "https://api.example",
        bootstrap_id: "boot-id",
        temporary_api_key: "stored-temp-key",
        device_code: "dev-code",
        client_id: "client-id",
        expiry: "2026-01-01T00:00:00Z",
        polling_interval: 7,
      }),
    );

    const io = capture();
    const fetchApi = vi
      .fn()
      .mockImplementation(async (url: string, init: RequestInit) => {
        if (url.includes("/api/v1/account_bootstraps/")) {
          expect((init.headers as Record<string, string>).authorization).toBe(
            "Bearer stored-temp-key",
          );
          return new Response(
            JSON.stringify({
              data: {
                id: "boot-id",
                status: "claimed",
              },
            }),
            {
              status: 200,
              headers: { "content-type": "application/json" },
            },
          );
        }

        if (url === "https://api.example/oauth/token") {
          const form = new URLSearchParams(init.body as string);
          expect(form.get("grant_type")).toBe(
            "urn:ietf:params:oauth:grant-type:device_code",
          );
          expect(form.get("device_code")).toBe("dev-code");
          expect(form.get("client_id")).toBe("client-id");
          expect(form.get("name")).toBe("Weft CLI");
          return new Response(
            JSON.stringify({
              access_token: "access-token",
              token_type: "Bearer",
              expires_in: 1200,
              refresh_token: "refresh-token",
              scope: "balance fetch search",
            }),
            {
              status: 200,
              headers: {
                "content-type": "application/json",
              },
            },
          );
        }

        throw new Error(`unexpected url: ${url}`);
      });

    expect(
      await runCli(["auth", "status"], {
        ...io,
        env: { WEFT_CREDENTIALS_FILE: credFile },
        fetchApi,
      }),
    ).toBe(EXIT_SUCCESS);
    const output = JSON.parse(io.out[0]);
    expect(output.data).toEqual({
      status: "consumed",
      authentication: "oauth",
      scope: "balance fetch search",
    });
    expect(JSON.stringify(output)).not.toContain("access-token");
    expect(JSON.stringify(output)).not.toContain("refresh-token");

    const after = JSON.parse(readFileSync(credFile, "utf8"));
    expect(after.type).toBe("oauth");
    expect(after.client_id).toBe("client-id");
    expect(after.access_token).toBe("access-token");
    expect(after).not.toHaveProperty("temporary_api_key");
    rmSync(dir, { recursive: true, force: true });
  });

  it("refreshes expired stored OAuth credentials before an API call", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-refresh-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "oauth",
        base_url: "https://api.example",
        client_id: "client-id",
        access_token: "expired-access-token",
        refresh_token: "old-refresh-token",
        token_type: "Bearer",
        scope: "balance fetch search",
        expiry: "2020-01-01T00:00:00.000Z",
      }),
    );
    const io = capture();
    const fetchApi = vi
      .fn()
      .mockImplementation(async (url: string, init: RequestInit) => {
        if (url === "https://api.example/oauth/token") {
          const form = new URLSearchParams(init.body as string);
          expect(form.get("grant_type")).toBe("refresh_token");
          expect(form.get("refresh_token")).toBe("old-refresh-token");
          expect(form.get("client_id")).toBe("client-id");
          return new Response(
            JSON.stringify({
              access_token: "new-access-token",
              refresh_token: "new-refresh-token",
              token_type: "Bearer",
              expires_in: 1200,
              scope: "balance fetch search",
            }),
            { status: 200, headers: { "content-type": "application/json" } },
          );
        }
        expect(new Headers(init.headers).get("authorization")).toBe(
          "Bearer new-access-token",
        );
        return new Response(JSON.stringify({ data: { id: 16 } }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      });

    expect(
      await runCli(["me"], {
        ...io,
        env: { WEFT_CREDENTIALS_FILE: credFile },
        fetchApi,
      }),
    ).toBe(EXIT_SUCCESS);
    expect(fetchApi).toHaveBeenCalledTimes(2);
    expect(io.out.join("")).not.toContain("new-access-token");
    expect(io.out.join("")).not.toContain("new-refresh-token");
    expect(JSON.parse(readFileSync(credFile, "utf8"))).toMatchObject({
      client_id: "client-id",
      access_token: "new-access-token",
      refresh_token: "new-refresh-token",
    });
    rmSync(dir, { recursive: true, force: true });
  });

  it("rotates one refresh token only once across concurrent commands", async () => {
    const dir = mkdtempSync(join(tmpdir(), "weft-cli-refresh-race-"));
    const credFile = join(dir, "credentials.json");
    writeFileSync(
      credFile,
      JSON.stringify({
        version: 1,
        type: "oauth",
        base_url: "https://api.example",
        client_id: "client-id",
        access_token: "expired-access-token",
        refresh_token: "old-refresh-token",
        token_type: "Bearer",
        scope: "balance fetch search",
        expiry: "2020-01-01T00:00:00.000Z",
      }),
    );
    let releaseRefresh!: () => void;
    let markRefreshStarted!: () => void;
    const refreshStarted = new Promise<void>((resolve) => {
      markRefreshStarted = resolve;
    });
    const refreshReleased = new Promise<void>((resolve) => {
      releaseRefresh = resolve;
    });
    let refreshCalls = 0;
    const fetchApi = vi.fn(async (url: string, init: RequestInit) => {
      if (url === "https://api.example/oauth/token") {
        refreshCalls += 1;
        markRefreshStarted();
        await refreshReleased;
        return new Response(
          JSON.stringify({
            access_token: "new-access-token",
            refresh_token: "new-refresh-token",
            token_type: "Bearer",
            expires_in: 1200,
            scope: "balance fetch search",
          }),
          { status: 200, headers: { "content-type": "application/json" } },
        );
      }
      expect(new Headers(init.headers).get("authorization")).toBe(
        "Bearer new-access-token",
      );
      return new Response(JSON.stringify({ data: { id: 16 } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    });
    const dependencies = {
      env: { WEFT_CREDENTIALS_FILE: credFile },
      fetchApi,
    };

    const first = runCli(["me"], { ...capture(), ...dependencies });
    await refreshStarted;
    const second = runCli(["me"], { ...capture(), ...dependencies });
    releaseRefresh();

    expect(await Promise.all([first, second])).toEqual([
      EXIT_SUCCESS,
      EXIT_SUCCESS,
    ]);
    expect(refreshCalls).toBe(1);
    expect(fetchApi).toHaveBeenCalledTimes(3);
    rmSync(dir, { recursive: true, force: true });
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
      error: { code: "NETWORK_ERROR" },
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
