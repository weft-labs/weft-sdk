import { createHash } from "node:crypto";
import { AccountApi, Configuration, DefaultApi } from "../typescript/dist/index.mjs";

const basePath = (process.env.WEFT_STAGING_BASE_URL || "").replace(/\/+$/, "");
const expectedOpenapiSha256 = process.env.EXPECTED_OPENAPI_SHA256 || "";

if (!basePath) {
  console.error("WEFT_STAGING_BASE_URL is required");
  process.exit(1);
}

if (!expectedOpenapiSha256) {
  console.error("EXPECTED_OPENAPI_SHA256 is required");
  process.exit(1);
}

const api = new DefaultApi(new Configuration({ basePath }));
const openapi = await api.getApiDocs();
const actualOpenapiSha256 = createHash("sha256").update(openapi).digest("hex");

if (actualOpenapiSha256 !== expectedOpenapiSha256) {
  console.error(
    `OpenAPI SHA-256 mismatch: ${actualOpenapiSha256} != ${expectedOpenapiSha256}`,
  );
  process.exit(1);
}

console.log(`Fetched matching OpenAPI spec from ${basePath}`);

const accountApi = new AccountApi(new Configuration({ basePath, accessToken: "invalid-e2e-token" }));

try {
  await accountApi.getMe();
  console.error("Expected GET /api/v1/me with an invalid token to fail");
  process.exit(1);
} catch (error) {
  if (error?.response?.status === 401) {
    console.log("Generated authenticated client reached staging and received expected 401");
  } else {
    console.error("Unexpected generated client failure", error);
    process.exit(1);
  }
}
