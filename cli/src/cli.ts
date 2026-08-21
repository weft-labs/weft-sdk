import {
  readStoredCredentials,
  type BootstrapCredentials,
  type OAuthCredentials,
  withCredentialsLock,
  writeStoredCredentials,
} from "./credentials";
import { randomUUID } from "node:crypto";
import {
  type PaidFetchRequest,
  ResponseError,
  WeftClient,
  WeftError,
} from "@weft-labs/sdk";

export const EXIT_SUCCESS = 0;
export const EXIT_USAGE = 2;
export const EXIT_AUTH = 3;
export const EXIT_API = 4;
export const EXIT_INTERNAL = 5;

type Command =
  "bootstrap" | "auth" | "me" | "balance" | "search" | "fetch" | "purchases";

const COMMANDS: Command[] = [
  "bootstrap",
  "auth",
  "me",
  "balance",
  "search",
  "fetch",
  "purchases",
];

const WEFT_API_BASE = "https://weft.network";
const OAUTH_SCOPE = "balance fetch search";
const OAUTH_CLIENT_NAME = "Weft CLI";
const OAUTH_HOST_NAME = "Weft CLI";
const OAUTH_REFRESH_SKEW_MS = 60_000;

const COMMAND_HELP = {
  bootstrap: {
    description: "Bootstrap an agent account",
    usage: "weft bootstrap --email <email> --agent-name <name> --reason <text>",
    options: [
      "--email <email>",
      "--agent-name <name>",
      "--reason <text>",
      "[--base-url <url>]",
    ],
  },
  auth: {
    description: "Check bootstrap status and exchange device token",
    usage: "weft auth status",
    options: ["status"],
  },
  me: {
    description: "Return the authenticated principal",
    usage: "weft me",
    options: [],
  },
  balance: {
    description: "Return wallet balance and spending policy",
    usage: "weft balance",
    options: [],
  },
  search: {
    description: "Search for payable resources",
    usage: "weft search <query> [--max-results <1..50>]",
    options: ["--max-results <1..50>"],
  },
  fetch: {
    description: "Fetch a URL within an explicit spending limit",
    usage:
      "weft fetch <url> --max-cost-usd <amount> [--method <method>] [--idempotency-key <key>]",
    options: [
      "--max-cost-usd <amount>",
      "--method <method>",
      "--idempotency-key <key>",
    ],
  },
  purchases: {
    description: "List purchases or return one purchase by ID",
    usage: "weft purchases [id] [--page <number>] [--per-page <1..100>]",
    options: ["--page <number>", "--per-page <1..100>"],
  },
} satisfies Record<
  Command,
  { description: string; usage: string; options: string[] }
>;

interface BootstrapCreateResponse {
  data: {
    id: string;
    status: string;
    capabilities: unknown;
    expires_at: string;
    temporary_api_key: string;
    device_code: string;
    approval: {
      interval: number;
      expires_in: number;
      method: string;
      user_code: string;
    };
  };
}

interface BootstrapStatus {
  data: {
    id: string;
    status: string;
    expires_at?: string;
    capabilities?: unknown;
  };
}

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const GLOBAL_OPTIONS = ["--api-key-stdin", "--base-url <url>", "--help", "-h"];

export interface CliDependencies {
  env?: Record<string, string | undefined>;
  fetchApi?: typeof fetch;
  readStdin?: () => Promise<string>;
  writeOut?: (value: string) => void;
  writeErr?: (value: string) => void;
  generateIdempotencyKey?: () => string;
}

interface ParsedArgs {
  command: Command;
  apiKeyStdin: boolean;
  baseUrl?: string;
  positionals: string[];
  options: Map<string, string | true>;
}

class CliError extends Error {
  constructor(
    readonly exitCode: number,
    readonly code: string,
    message: string,
    readonly details?: unknown,
  ) {
    super(message);
  }
}

function takeValue(
  args: string[],
  index: number,
  option: string,
): [string, number] {
  const value = args[index + 1];
  if (value == null || value.startsWith("--")) {
    throw new CliError(
      EXIT_USAGE,
      "INVALID_ARGUMENT",
      `${option} requires a value`,
    );
  }
  return [value, index + 1];
}

function rejectUnsafeCredentialArgument(args: string[]): void {
  if (args.some((arg) => arg === "--api-key" || arg.startsWith("--api-key="))) {
    throw new CliError(
      EXIT_USAGE,
      "UNSAFE_CREDENTIAL_ARGUMENT",
      "API keys are accepted only through WEFT_API_KEY or --api-key-stdin",
    );
  }
}

function requestedHelp(args: string[]): Command | "all" | undefined {
  const isHelp = (value: string) => value === "--help" || value === "-h";
  if (args.length === 1 && isHelp(args[0])) return "all";
  if (
    args.length === 2 &&
    COMMANDS.includes(args[0] as Command) &&
    isHelp(args[1])
  ) {
    return args[0] as Command;
  }
  return undefined;
}

function helpData(command: Command | "all") {
  if (command !== "all") {
    return {
      command,
      ...COMMAND_HELP[command],
      global_options: GLOBAL_OPTIONS,
    };
  }
  return {
    usage: "weft <command> [options]",
    commands: COMMANDS.map((name) => ({ name, ...COMMAND_HELP[name] })),
    global_options: GLOBAL_OPTIONS,
    authentication: ["WEFT_API_KEY", "--api-key-stdin"],
    exit_codes: { success: 0, usage: 2, auth: 3, api: 4, internal: 5 },
  };
}

function parseArgs(args: string[]): ParsedArgs {
  let command: Command | undefined;
  let apiKeyStdin = false;
  let baseUrl: string | undefined;
  const positionals: string[] = [];
  const options = new Map<string, string | true>();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--api-key-stdin") {
      apiKeyStdin = true;
    } else if (arg === "--base-url") {
      [baseUrl, index] = takeValue(args, index, arg);
    } else if (arg.startsWith("--")) {
      const [value, nextIndex] = takeValue(args, index, arg);
      options.set(arg.slice(2), value);
      index = nextIndex;
    } else if (!command) {
      if (!COMMANDS.includes(arg as Command)) {
        throw new CliError(
          EXIT_USAGE,
          "UNKNOWN_COMMAND",
          `Unknown command: ${arg}`,
        );
      }
      command = arg as Command;
    } else {
      positionals.push(arg);
    }
  }

  if (!command) {
    throw new CliError(
      EXIT_USAGE,
      "COMMAND_REQUIRED",
      "Command required: bootstrap, auth, me, balance, search, fetch, or purchases",
    );
  }

  return { command, apiKeyStdin, baseUrl, positionals, options };
}

function positiveInteger(
  value: string | true | undefined,
  option: string,
  maximum?: number,
): number | undefined {
  if (value == null) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new CliError(
      EXIT_USAGE,
      "INVALID_ARGUMENT",
      `${option} must be a positive integer`,
    );
  }
  if (maximum != null && parsed > maximum) {
    throw new CliError(
      EXIT_USAGE,
      "INVALID_ARGUMENT",
      `${option} must be at most ${maximum}`,
    );
  }
  return parsed;
}

function requiredOption(
  options: Map<string, string | true>,
  name: string,
): string {
  const value = options.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new CliError(EXIT_USAGE, "MISSING_ARGUMENT", `--${name} is required`);
  }
  return value;
}

function baseApiUrl(
  baseUrl: string | undefined,
  env: Record<string, string | undefined>,
): string {
  const raw = baseUrl ?? env.WEFT_BASE_URL ?? WEFT_API_BASE;
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function resolveApiKeyFromStored(
  credentials?:
    | {
        temporary_api_key: string;
        type: "bootstrap";
      }
    | {
        access_token: string;
        type: "oauth";
      },
): string | undefined {
  if (!credentials) return undefined;
  if (credentials.type === "oauth" && credentials.access_token.trim()) {
    return credentials.access_token;
  }
  if (
    credentials.type === "bootstrap" &&
    credentials.temporary_api_key.trim()
  ) {
    return credentials.temporary_api_key;
  }
  return undefined;
}

function oauthNeedsRefresh(credentials: OAuthCredentials): boolean {
  const expiry = Date.parse(credentials.expiry);
  return (
    !Number.isFinite(expiry) || expiry <= Date.now() + OAUTH_REFRESH_SKEW_MS
  );
}

async function refreshOAuthCredentials(
  fetchApi: typeof fetch,
  env: Record<string, string | undefined>,
  stored: OAuthCredentials,
): Promise<OAuthCredentials> {
  const token = await requestJson<OAuthTokenResponse>(
    fetchApi,
    `${stored.base_url}/oauth/token`,
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: stored.refresh_token,
        client_id: stored.client_id,
      }).toString(),
    },
    true,
  );
  const refreshed: OAuthCredentials = {
    ...stored,
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    token_type: token.token_type,
    scope: token.scope,
    expiry: new Date(Date.now() + token.expires_in * 1000).toISOString(),
  };
  await writeStoredCredentials(env, refreshed);
  return refreshed;
}

function noSecretFields(
  data: Record<string, unknown>,
): Record<string, unknown> {
  return {
    ...data,
    temporary_api_key: undefined,
    device_code: undefined,
    access_token: undefined,
    refresh_token: undefined,
    client_secret: undefined,
  };
}

async function requestJson<T>(
  fetchApi: typeof fetch,
  url: string,
  init: RequestInit,
  redactError = false,
): Promise<T> {
  const response = await fetchApi(url, init);
  if (!response.ok) {
    if (redactError) {
      throw new CliError(
        response.status === 401 || response.status === 403
          ? EXIT_AUTH
          : response.status >= 500
            ? EXIT_INTERNAL
            : EXIT_API,
        "OAUTH_TOKEN_ERROR",
        `OAuth token request failed with HTTP ${response.status}`,
      );
    }
    throw new ResponseError(response);
  }

  return (await response.json()) as T;
}

function withCredentials(
  headers: Record<string, string>,
  apiKey: string,
): Record<string, string> {
  return {
    ...headers,
    authorization: `Bearer ${apiKey}`,
  };
}

function ensureOnly(
  options: Map<string, string | true>,
  allowed: string[],
): void {
  for (const name of options.keys()) {
    if (!allowed.includes(name)) {
      throw new CliError(
        EXIT_USAGE,
        "UNKNOWN_OPTION",
        `Unknown option: --${name}`,
      );
    }
  }
}

async function responseDetails(error: ResponseError): Promise<unknown> {
  try {
    return await error.response.json();
  } catch {
    return undefined;
  }
}

async function normalizeError(error: unknown): Promise<CliError> {
  if (error instanceof CliError) return error;
  if (error instanceof WeftError) {
    // status 0 is a transport failure with no API response; it exits like an
    // internal failure, not an API rejection.
    const exitCode =
      error.status === 401 || error.status === 403
        ? EXIT_AUTH
        : error.status >= 500 || error.status === 0
          ? EXIT_INTERNAL
          : EXIT_API;
    return new CliError(exitCode, error.code, error.message, error.details);
  }
  if (error instanceof ResponseError) {
    const details = await responseDetails(error);
    const body = details as
      | {
          error?: { code?: string; message?: string } | string;
          error_description?: string;
        }
      | undefined;
    const nested = typeof body?.error === "object" ? body.error : undefined;
    const code =
      nested?.code ??
      (typeof body?.error === "string"
        ? body.error
        : `HTTP_${error.response.status}`);
    const message =
      nested?.message ??
      body?.error_description ??
      `Weft API returned HTTP ${error.response.status}`;
    const exitCode =
      error.response.status === 401 || error.response.status === 403
        ? EXIT_AUTH
        : error.response.status >= 500
          ? EXIT_INTERNAL
          : EXIT_API;
    return new CliError(exitCode, code, message, details);
  }
  const message = error instanceof Error ? error.message : String(error);
  return new CliError(EXIT_INTERNAL, "INTERNAL_ERROR", message);
}

async function defaultReadStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function runCli(
  args: string[],
  dependencies: CliDependencies = {},
): Promise<number> {
  const writeOut =
    dependencies.writeOut ?? ((value) => process.stdout.write(value));
  const writeErr =
    dependencies.writeErr ?? ((value) => process.stderr.write(value));
  let command = "unknown";
  let idempotencyKey: string | undefined;
  const fetchApi = dependencies.fetchApi ?? fetch;

  try {
    rejectUnsafeCredentialArgument(args);
    const help = requestedHelp(args);
    if (help !== undefined) {
      command = "help";
      writeOut(
        `${JSON.stringify({
          schema_version: "1",
          ok: true,
          command,
          data: helpData(help),
        })}\n`,
      );
      return EXIT_SUCCESS;
    }

    const parsed = parseArgs(args);
    command = parsed.command;
    const env = dependencies.env ?? process.env;
    const baseUrl = baseApiUrl(parsed.baseUrl, env);

    if (parsed.command === "bootstrap") {
      ensureOnly(parsed.options, ["email", "agent-name", "reason"]);
      if (parsed.positionals.length !== 0) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "bootstrap does not accept positional arguments",
        );
      }
      const email = requiredOption(parsed.options, "email");
      const agentName = requiredOption(parsed.options, "agent-name");
      const reason = requiredOption(parsed.options, "reason");

      const register = await requestJson<{ client_id: string }>(
        fetchApi,
        `${baseUrl}/oauth/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            client_name: OAUTH_CLIENT_NAME,
            redirect_uris: ["http://localhost/callback"],
            grant_types: [
              "urn:ietf:params:oauth:grant-type:device_code",
              "refresh_token",
            ],
            token_endpoint_auth_method: "none",
            scope: OAUTH_SCOPE,
          }),
        },
      );

      const clientId = register.client_id;
      const bootstrap = await requestJson<BootstrapCreateResponse>(
        fetchApi,
        `${baseUrl}/api/v1/account_bootstraps`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            agent_name: agentName,
            host_name: OAUTH_HOST_NAME,
            reason,
            oauth_client_id: clientId,
            requested_scopes: ["balance", "fetch", "search"],
          }),
        },
      );

      const stored: BootstrapCredentials = {
        version: 1,
        type: "bootstrap",
        base_url: baseUrl,
        bootstrap_id: bootstrap.data.id,
        temporary_api_key: bootstrap.data.temporary_api_key,
        device_code: bootstrap.data.device_code,
        client_id: clientId,
        expiry: bootstrap.data.expires_at,
        polling_interval: bootstrap.data.approval.interval,
      };

      await writeStoredCredentials(env, stored);

      writeOut(
        `${JSON.stringify({
          schema_version: "1",
          ok: true,
          command,
          data: noSecretFields({
            ...bootstrap.data,
            client_id: clientId,
            base_url: baseUrl,
            polling_interval: bootstrap.data.approval.interval,
          }),
        })}\n`,
      );
      return EXIT_SUCCESS;
    }

    if (parsed.command === "auth") {
      ensureOnly(parsed.options, []);
      if (
        parsed.positionals.length !== 1 ||
        parsed.positionals[0] !== "status"
      ) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "auth requires 'status'",
        );
      }

      const stored = await readStoredCredentials(env);
      if (stored?.type === "oauth") {
        writeOut(
          `${JSON.stringify({
            schema_version: "1",
            ok: true,
            command,
            data: {
              status: "consumed",
              authentication: "oauth",
              scope: stored.scope,
            },
          })}\n`,
        );
        return EXIT_SUCCESS;
      }
      if (!stored) {
        throw new CliError(
          EXIT_AUTH,
          "BOOTSTRAP_REQUIRED",
          "Run weft bootstrap before auth status",
        );
      }

      const statusBaseUrl = stored.base_url;
      const status = await requestJson<BootstrapStatus>(
        fetchApi,
        `${statusBaseUrl}/api/v1/account_bootstraps/${stored.bootstrap_id}`,
        {
          method: "GET",
          headers: withCredentials({}, stored.temporary_api_key),
        },
      );

      const statusValue = status.data.status;
      if (statusValue !== "claimed" && statusValue !== "consumed") {
        writeOut(
          `${JSON.stringify({
            schema_version: "1",
            ok: true,
            command,
            data: { status: statusValue },
          })}\n`,
        );
        return EXIT_SUCCESS;
      }

      const token = await requestJson<OAuthTokenResponse>(
        fetchApi,
        `${statusBaseUrl}/oauth/token`,
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:device_code",
            device_code: stored.device_code,
            client_id: stored.client_id,
            name: OAUTH_CLIENT_NAME,
          }).toString(),
        },
        true,
      );

      const oauth: OAuthCredentials = {
        version: 1,
        type: "oauth",
        base_url: statusBaseUrl,
        client_id: stored.client_id,
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        token_type: token.token_type,
        scope: token.scope,
        expiry: new Date(Date.now() + token.expires_in * 1000).toISOString(),
      };
      await writeStoredCredentials(env, oauth);

      writeOut(
        `${JSON.stringify({
          schema_version: "1",
          ok: true,
          command,
          data: {
            status: "consumed",
            authentication: "oauth",
            scope: token.scope,
          },
        })}\n`,
      );
      return EXIT_SUCCESS;
    }

    const rawKey = parsed.apiKeyStdin
      ? await (dependencies.readStdin ?? defaultReadStdin)()
      : env.WEFT_API_KEY;
    let apiKey = rawKey?.trim();
    let authenticatedBaseUrl = baseUrl;
    if (parsed.apiKeyStdin && !apiKey) {
      throw new CliError(
        EXIT_AUTH,
        "API_KEY_REQUIRED",
        "--api-key-stdin requires a non-empty API key",
      );
    }
    if (!apiKey && !parsed.apiKeyStdin) {
      let stored = await readStoredCredentials(env);
      if (stored?.type === "oauth" && oauthNeedsRefresh(stored)) {
        stored = await withCredentialsLock(env, async () => {
          const current = await readStoredCredentials(env);
          if (current?.type === "oauth" && oauthNeedsRefresh(current)) {
            return refreshOAuthCredentials(fetchApi, env, current);
          }
          return current;
        });
      }
      apiKey = resolveApiKeyFromStored(stored);
      if (stored) authenticatedBaseUrl = stored.base_url;
    }

    if (!apiKey) {
      throw new CliError(
        EXIT_AUTH,
        "API_KEY_REQUIRED",
        "Set WEFT_API_KEY, pass --api-key-stdin, or store credentials",
      );
    }

    const client = new WeftClient({
      apiKey,
      baseUrl: authenticatedBaseUrl,
      fetchApi,
    });

    let data: unknown;
    let meta: Record<string, unknown> | undefined;
    if (parsed.command === "me") {
      ensureOnly(parsed.options, []);
      data = await client.me();
    } else if (parsed.command === "balance") {
      ensureOnly(parsed.options, []);
      data = await client.balance();
    } else if (parsed.command === "search") {
      ensureOnly(parsed.options, ["max-results"]);
      if (parsed.positionals.length !== 1) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "search requires exactly one query",
        );
      }
      data = await client.search({
        query: parsed.positionals[0],
        maxResults: positiveInteger(
          parsed.options.get("max-results"),
          "--max-results",
          50,
        ),
      });
    } else if (parsed.command === "fetch") {
      ensureOnly(parsed.options, ["max-cost-usd", "method", "idempotency-key"]);
      if (parsed.positionals.length !== 1) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "fetch requires exactly one URL",
        );
      }
      const maxCostUsd = requiredOption(parsed.options, "max-cost-usd");
      if (!/^\d+(?:\.\d+)?$/.test(maxCostUsd) || Number(maxCostUsd) <= 0) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "--max-cost-usd must be a positive decimal",
        );
      }
      const method = parsed.options.get("method");
      const request: PaidFetchRequest = {
        url: parsed.positionals[0],
        maxCostUsd,
        method:
          typeof method === "string"
            ? (method.toUpperCase() as PaidFetchRequest["method"])
            : undefined,
      };
      const explicitKey = parsed.options.get("idempotency-key");
      idempotencyKey =
        typeof explicitKey === "string"
          ? explicitKey
          : (dependencies.generateIdempotencyKey ?? randomUUID)();
      data = await client.fetch(request, { idempotencyKey });
      meta = { idempotency_key: idempotencyKey };
    } else {
      ensureOnly(parsed.options, ["page", "per-page"]);
      if (parsed.positionals.length > 1) {
        throw new CliError(
          EXIT_USAGE,
          "INVALID_ARGUMENT",
          "purchases accepts at most one purchase ID",
        );
      }
      data = parsed.positionals[0]
        ? await client.purchase(
            positiveInteger(parsed.positionals[0], "purchase ID")!,
          )
        : await client.purchases({
            page: positiveInteger(parsed.options.get("page"), "--page"),
            perPage: positiveInteger(
              parsed.options.get("per-page"),
              "--per-page",
              100,
            ),
          });
    }

    writeOut(
      `${JSON.stringify({
        schema_version: "1",
        ok: true,
        command,
        data,
        ...(meta === undefined ? {} : { meta }),
      })}\n`,
    );
    return EXIT_SUCCESS;
  } catch (error) {
    const normalized = await normalizeError(error);
    writeErr(
      `${JSON.stringify({
        schema_version: "1",
        ok: false,
        command,
        error: {
          code: normalized.code,
          message: normalized.message,
          ...(normalized.details === undefined
            ? {}
            : { details: normalized.details }),
        },
        ...(idempotencyKey === undefined
          ? {}
          : { meta: { idempotency_key: idempotencyKey } }),
      })}\n`,
    );
    return normalized.exitCode;
  }
}
