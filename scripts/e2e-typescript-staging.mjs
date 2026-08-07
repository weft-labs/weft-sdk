import { createHash } from "node:crypto";
import {
  AccountApi,
  Configuration,
  DefaultApi,
  WeftClient,
} from "../typescript/dist/index.mjs";

const basePath = (process.env.WEFT_STAGING_BASE_URL || "").replace(/\/+$/, "");
const expectedOpenapiSha256 = process.env.EXPECTED_OPENAPI_SHA256 || "";
const apiKey = process.env.WEFT_API_KEY || "";

if (!basePath) {
  console.error("WEFT_STAGING_BASE_URL is required");
  process.exit(1);
}

if (!expectedOpenapiSha256) {
  console.error("EXPECTED_OPENAPI_SHA256 is required");
  process.exit(1);
}

if (!apiKey) {
  console.error("WEFT_API_KEY is required for the positive-auth staging gate");
  process.exit(1);
}

const api = new DefaultApi(new Configuration({ basePath }));
const openapi = await api.getOpenApiDocument();
const actualOpenapiSha256 = createHash("sha256").update(openapi).digest("hex");

if (actualOpenapiSha256 !== expectedOpenapiSha256) {
  console.error(
    `OpenAPI SHA-256 mismatch: ${actualOpenapiSha256} != ${expectedOpenapiSha256}`,
  );
  process.exit(1);
}

console.log(`Fetched matching OpenAPI spec from ${basePath}`);

const client = new WeftClient({ apiKey, baseUrl: basePath });
const account = await client.me();
if (account.data.principalType !== "user") {
  console.error("Staging credential did not resolve to a buyer user");
  process.exit(1);
}

const balance = await client.balance();
if (!balance.wallet || typeof balance.wallet.balanceUsdc !== "string") {
  console.error("Staging balance response did not decode through WeftClient");
  process.exit(1);
}

const query = "weather data API";
const search = await client.search({ query, maxResults: 3 });
if (search.query !== query || !Array.isArray(search.results)) {
  console.error("Staging search response did not decode deterministically");
  process.exit(1);
}

console.log(
  "WeftClient passed valid-auth me, balance, and search staging gates",
);

const accountApi = new AccountApi(
  new Configuration({ basePath, accessToken: "invalid-e2e-token" }),
);

try {
  await accountApi.getMe();
  console.error("Expected GET /api/v1/me with an invalid token to fail");
  process.exit(1);
} catch (error) {
  if (error?.response?.status === 401) {
    console.log(
      "Generated authenticated client reached staging and received expected 401",
    );
  } else {
    console.error("Unexpected generated client failure", error);
    process.exit(1);
  }
}
