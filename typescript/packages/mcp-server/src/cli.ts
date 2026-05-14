#!/usr/bin/env node
/**
 * CLI entry point. Reads environment variables and starts the HTTP server.
 *
 * Environment:
 *   WEFT_APP_URL       (required)  origin of weft-app
 *   MCP_PUBLIC_URL     (optional)  this server's public origin; defaults to
 *                                  `http://localhost:<PORT>`
 *   MCP_AUTH_SERVER_URL (optional) authorization server origin; defaults to
 *                                  WEFT_APP_URL
 *   PORT               (optional)  port to bind; defaults to 9876
 */
import { startHttpServer } from "./index.js";

async function main(): Promise<void> {
  const weftAppUrl = requireEnv("WEFT_APP_URL");
  const port = Number(process.env.PORT ?? "9876");
  if (!Number.isFinite(port) || port < 0 || port > 65535) {
    throw new Error(`Invalid PORT: ${process.env.PORT}`);
  }
  const publicUrl = process.env.MCP_PUBLIC_URL ?? `http://localhost:${port}`;
  const authServerUrl = process.env.MCP_AUTH_SERVER_URL;

  const started = await startHttpServer(
    {
      weftAppUrl,
      publicUrl,
      authServerUrl,
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
