/**
 * OAuth token passthrough + protected-resource metadata.
 *
 * The MCP server itself does NOT validate tokens. It forwards the incoming
 * `Authorization: Bearer <token>` header verbatim to weft-app's `/api/v1/*`
 * endpoints. weft-app is the authority that resolves either an OAuth access
 * token (spec 09) or an API key (spec 08) into a user/account.
 *
 * The MCP host (Claude.ai, Claude Code, Cursor) discovers the authorization
 * server by fetching `/.well-known/oauth-protected-resource` from this MCP
 * server. The response advertises weft-app's authorization-server metadata
 * URL per the MCP OAuth spec, which itself references RFC 9728 (Protected
 * Resource Metadata) and RFC 8414 (Authorization Server Metadata).
 *
 * Refs:
 *   - https://modelcontextprotocol.io/specification/draft/basic/authorization
 *   - https://datatracker.ietf.org/doc/html/rfc9728
 */

export interface OAuthDiscoveryOptions {
  /**
   * Public origin where this MCP server is hosted, e.g.
   * `https://mcp.weft.network`. Used as `resource` in the metadata doc.
   */
  resourceUrl: string;
  /**
   * Public origin of weft-app's authorization server, e.g.
   * `https://app.weftlabs.com`. The MCP host will fetch
   * `<authServerUrl>/.well-known/oauth-authorization-server` to discover the
   * authorize / token endpoints.
   */
  authServerUrl: string;
  /** Scopes the MCP host should request. */
  scopesSupported?: string[];
}

/**
 * Build the JSON body for `/.well-known/oauth-protected-resource` per RFC 9728.
 *
 * Example output:
 *   {
 *     "resource": "https://mcp.weft.network",
 *     "authorization_servers": ["https://app.weftlabs.com"],
 *     "scopes_supported": ["weft.balance", "weft.search", "weft.fetch"],
 *     "bearer_methods_supported": ["header"],
 *     "resource_documentation": "https://mcp.weft.network/"
 *   }
 */
export function buildProtectedResourceMetadata(
  opts: OAuthDiscoveryOptions,
): Record<string, unknown> {
  const resource = stripTrailingSlash(opts.resourceUrl);
  const authServer = stripTrailingSlash(opts.authServerUrl);
  return {
    resource,
    authorization_servers: [authServer],
    scopes_supported:
      opts.scopesSupported ?? ["weft.balance", "weft.search", "weft.fetch"],
    bearer_methods_supported: ["header"],
    resource_documentation: `${resource}/`,
  };
}

/**
 * Extract the Authorization header value from a Node `IncomingMessage`-style
 * headers bag. Returns `undefined` if missing or empty.
 */
export function extractAuthorization(
  headers: Record<string, string | string[] | undefined>,
): string | undefined {
  const raw = headers["authorization"] ?? headers["Authorization"];
  if (raw === undefined) return undefined;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || value.trim().length === 0) return undefined;
  return value;
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}
