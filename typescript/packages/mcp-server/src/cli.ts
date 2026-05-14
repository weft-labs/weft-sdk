#!/usr/bin/env node
/**
 * CLI entry point. Reads environment variables and starts the HTTP server.
 *
 * Environment:
 *   WEFT_APP_URL         (required)  origin of weft-app
 *   MCP_PUBLIC_URL       (optional)  this server's public origin; defaults to
 *                                    `http://localhost:<PORT>`. In production
 *                                    (`NODE_ENV=production`) this is required
 *                                    — the server refuses to start without it
 *                                    to avoid advertising `localhost` in the
 *                                    OAuth protected-resource document.
 *   MCP_AUTH_SERVER_URL  (optional)  authorization server origin; defaults to
 *                                    WEFT_APP_URL
 *   MCP_ALLOWED_HOSTS    (optional)  comma-separated `Host` header values for
 *                                    DNS-rebinding protection, e.g.
 *                                    `"mcp.weft.network,localhost:9876"`. In
 *                                    dev when unset we warn at boot and allow
 *                                    all hosts. In production
 *                                    (`NODE_ENV=production`) this is required
 *                                    — the server refuses to start without it.
 *   PORT                 (optional)  port to bind; defaults to 9876
 */
import { startHttpServer } from "./index.js";
import { log } from "./logger.js";

async function main(): Promise<void> {
  const isProd = process.env.NODE_ENV === "production";

  const weftAppUrl = requireEnv("WEFT_APP_URL");
  const port = Number(process.env.PORT ?? "9876");
  if (!Number.isFinite(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT: ${process.env.PORT}`);
  }

  const publicUrlEnv = process.env.MCP_PUBLIC_URL;
  if (!publicUrlEnv) {
    if (isProd) {
      process.stderr.write(
        "[weft-mcp-server] MCP_PUBLIC_URL is required when NODE_ENV=production\n",
      );
      process.exit(2);
    }
    log("warn", "MCP_PUBLIC_URL not set — discovery endpoint will advertise localhost", {
      env: process.env.NODE_ENV ?? "development",
      port,
    });
  }
  const publicUrl = publicUrlEnv ?? `http://localhost:${port}`;
  const authServerUrl = process.env.MCP_AUTH_SERVER_URL;

  const allowedHostsEnv = process.env.MCP_ALLOWED_HOSTS;
  const allowedHosts =
    allowedHostsEnv === undefined
      ? undefined
      : allowedHostsEnv
          .split(",")
          .map((h) => h.trim())
          .filter((h) => h.length > 0);

  if (allowedHosts === undefined || allowedHosts.length === 0) {
    if (isProd) {
      process.stderr.write(
        "[weft-mcp-server] MCP_ALLOWED_HOSTS is required when NODE_ENV=production\n",
      );
      process.exit(2);
    }
    log("warn", "MCP_ALLOWED_HOSTS not set — DNS-rebinding protection disabled (dev only)", {
      env: process.env.NODE_ENV ?? "development",
    });
  }

  const started = await startHttpServer(
    {
      weftAppUrl,
      publicUrl,
      authServerUrl,
      allowedHosts,
    },
    port,
  );

  const shutdown = async (signal: string): Promise<void> => {
    process.stderr.write(`[weft-mcp-server] received ${signal}, shutting down\n`);
    await started.close();
    process.exit(0);
  };
  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    process.stderr.write(`[weft-mcp-server] missing required env var: ${name}\n`);
    process.exit(2);
  }
  return v;
}

main().catch((err: unknown) => {
  const msg = err instanceof Error ? `${err.stack ?? err.message}` : String(err);
  process.stderr.write(`[weft-mcp-server] fatal: ${msg}\n`);
  process.exit(1);
});
