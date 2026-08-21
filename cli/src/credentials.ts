import { randomUUID } from "node:crypto";
import {
  chmod,
  mkdir,
  open,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const CREDENTIALS_FILE_MODE = 0o600;
const CREDENTIALS_DIR_MODE = 0o700;
const LOCK_RETRY_MS = 50;
const LOCK_TIMEOUT_MS = 10_000;

export interface BootstrapCredentials {
  version: 1;
  type: "bootstrap";
  base_url: string;
  bootstrap_id: string;
  temporary_api_key: string;
  device_code: string;
  client_id: string;
  expiry: string;
  polling_interval: number;
}

export interface OAuthCredentials {
  version: 1;
  type: "oauth";
  base_url: string;
  client_id: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  scope: string;
  expiry: string;
}

export type StoredCredentials = BootstrapCredentials | OAuthCredentials;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBootstrapCredentials(
  value: Record<string, unknown>,
): BootstrapCredentials | undefined {
  if (
    value.type === "bootstrap" &&
    typeof value.version === "number" &&
    typeof value.base_url === "string" &&
    typeof value.bootstrap_id === "string" &&
    typeof value.temporary_api_key === "string" &&
    typeof value.device_code === "string" &&
    typeof value.client_id === "string" &&
    typeof value.expiry === "string" &&
    typeof value.polling_interval === "number"
  ) {
    return value as BootstrapCredentials;
  }

  return undefined;
}

function isOAuthCredentials(
  value: Record<string, unknown>,
): OAuthCredentials | undefined {
  if (
    value.type === "oauth" &&
    typeof value.version === "number" &&
    typeof value.base_url === "string" &&
    typeof value.client_id === "string" &&
    typeof value.access_token === "string" &&
    typeof value.refresh_token === "string" &&
    typeof value.token_type === "string" &&
    typeof value.scope === "string" &&
    typeof value.expiry === "string"
  ) {
    return value as OAuthCredentials;
  }

  return undefined;
}

export function resolveCredentialsPath(
  env: Record<string, string | undefined>,
): string | undefined {
  if (env.WEFT_CREDENTIALS_FILE) return env.WEFT_CREDENTIALS_FILE;
  if (env.XDG_CONFIG_HOME)
    return `${env.XDG_CONFIG_HOME}/weft/credentials.json`;
  const home = env.HOME || env.USERPROFILE;
  if (!home) return undefined;
  return `${home}/.config/weft/credentials.json`;
}

export async function readStoredCredentials(
  env: Record<string, string | undefined>,
): Promise<StoredCredentials | undefined> {
  const path = resolveCredentialsPath(env);
  if (!path) return undefined;
  try {
    const raw = await readFile(path, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) throw new Error("Stored credentials malformed");
    return isBootstrapCredentials(parsed) ?? isOAuthCredentials(parsed);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
}

export async function writeStoredCredentials(
  env: Record<string, string | undefined>,
  credentials: StoredCredentials,
): Promise<void> {
  const path = resolveCredentialsPath(env);
  if (!path) {
    throw new Error("HOME, USERPROFILE, or WEFT_CREDENTIALS_FILE is required");
  }
  const parent = dirname(path);
  await mkdir(parent, { recursive: true, mode: CREDENTIALS_DIR_MODE });
  await chmod(parent, CREDENTIALS_DIR_MODE);

  const tempPath = `${path}.${randomUUID()}.tmp`;
  try {
    await writeFile(tempPath, JSON.stringify(credentials), {
      mode: CREDENTIALS_FILE_MODE,
    });
    await rename(tempPath, path);
    await chmod(path, CREDENTIALS_FILE_MODE);
  } catch (error) {
    await rm(tempPath, { force: true });
    throw error;
  }
}

export async function withCredentialsLock<T>(
  env: Record<string, string | undefined>,
  action: () => Promise<T>,
): Promise<T> {
  const path = resolveCredentialsPath(env);
  if (!path) {
    throw new Error("HOME, USERPROFILE, or WEFT_CREDENTIALS_FILE is required");
  }
  const lockPath = `${path}.lock`;
  const deadline = Date.now() + LOCK_TIMEOUT_MS;
  await mkdir(dirname(path), { recursive: true, mode: CREDENTIALS_DIR_MODE });

  for (;;) {
    try {
      const lock = await open(lockPath, "wx", CREDENTIALS_FILE_MODE);
      await lock.close();
      break;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      if (Date.now() >= deadline) {
        throw new Error(
          `Timed out waiting for the credential lock; if no Weft CLI process is running, remove ${lockPath}`,
        );
      }
      await delay(LOCK_RETRY_MS);
    }
  }

  try {
    return await action();
  } finally {
    await rm(lockPath, { force: true });
  }
}
