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

type Command = "me" | "balance" | "search" | "fetch" | "purchases";

const COMMANDS: Command[] = ["me", "balance", "search", "fetch", "purchases"];

const COMMAND_HELP = {
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
      "Command required: me, balance, search, fetch, or purchases",
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
      { error?: { code?: string; message?: string } | string } | undefined;
    const nested = typeof body?.error === "object" ? body.error : undefined;
    const code =
      nested?.code ??
      (typeof body?.error === "string"
        ? body.error
        : `HTTP_${error.response.status}`);
    const message =
      nested?.message ?? `Weft API returned HTTP ${error.response.status}`;
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
    const rawKey = parsed.apiKeyStdin
      ? await (dependencies.readStdin ?? defaultReadStdin)()
      : env.WEFT_API_KEY;
    const apiKey = rawKey?.trim();
    if (!apiKey) {
      throw new CliError(
        EXIT_AUTH,
        "API_KEY_REQUIRED",
        "Set WEFT_API_KEY or pass --api-key-stdin",
      );
    }

    const client = new WeftClient({
      apiKey,
      baseUrl: parsed.baseUrl ?? env.WEFT_BASE_URL,
      fetchApi: dependencies.fetchApi,
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
