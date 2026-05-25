// Agent-economy CLI smoke. Exercises the full buyer-runtime loop end-to-end
// against a deployed Weft API: balance -> search -> paid fetch -> balance.
// Pairs with weft-app's Playwright dashboard suite (different surface, same
// staging accounts). Sibling to scripts/e2e-typescript-staging.mjs, which
// only verifies the generated client reaches staging and gets a 401.
//
// Run:
//   WEFT_STAGING_BASE_URL=https://staging.weft.network \
//   E2E_BUYER_API_KEY=wk_... \
//   node scripts/weft-smoke.mjs
//
// Soft-skips (exit 0) when E2E_BUYER_API_KEY is unset, so the script is
// safe to invoke from CI workflows that don't always have the secret.

import {
  BalanceApi,
  Configuration,
  FetchApi,
  SearchApi,
} from "../typescript/dist/index.mjs";

const basePath = (process.env.WEFT_STAGING_BASE_URL || "https://staging.weft.network").replace(/\/+$/, "");
const accessToken = process.env.E2E_BUYER_API_KEY;

// StableEnrich / Apollo people-search — Base Sepolia, $0.02, 98.5% success rate
// (from the live search ranking signal). Override via E2E_FETCH_TARGET_URL +
// E2E_FETCH_TARGET_BODY when the catalog shifts.
const fetchTargetUrl = process.env.E2E_FETCH_TARGET_URL
  || "https://stableenrich.dev/api/apollo/people-search";
const fetchTargetBody = process.env.E2E_FETCH_TARGET_BODY
  || JSON.stringify({ q_organization_titles: ["VP Engineering"], page: 1, per_page: 1 });
const maxCostUsd = process.env.E2E_MAX_COST_USD || "0.05";

if (!accessToken) {
  console.log("[skip] E2E_BUYER_API_KEY unset — agent-economy smoke skipped");
  process.exit(0);
}

const cfg = new Configuration({ basePath, accessToken });
const balanceApi = new BalanceApi(cfg);
const searchApi = new SearchApi(cfg);
const fetchApi = new FetchApi(cfg);

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

// Wrap an SDK call so a ResponseError surfaces as one readable line instead
// of a generated-client stack trace. Reads the response body if the client
// hasn't already consumed it (401/4xx envelopes carry useful detail).
async function step(label, fn) {
  try {
    return await fn();
  } catch (err) {
    const status = err?.response?.status;
    let body = "";
    try {
      body = (await err?.response?.text?.()) ?? "";
    } catch {
      // body already consumed by the generated client — best-effort
    }
    fail(`${label}: status=${status ?? "?"} ${body.slice(0, 300)}${err?.message ? ` (${err.message})` : ""}`);
  }
}

console.log(`weft-smoke: ${basePath}`);

// 1. Balance before
const before = await step("balance(before)", () => balanceApi.getBalance());
const beforeUsdc = parseFloat(before.wallet.balanceUsdc);
console.log(
  `[1/4] balance before: wallet=$${before.wallet.balanceUsdc} (${before.wallet.network}) `
  + `promo=$${before.promo.balanceUsd} spent_today=$${before.spentTodayUsd}`,
);
if (!Number.isFinite(beforeUsdc)) fail(`balance.wallet.balanceUsdc not a number: ${before.wallet.balanceUsdc}`);

// 2. Search
const search = await step("search", () => searchApi.search({
  searchRequest: { query: "agent enrichment", limit: 3 },
}));
if (!Array.isArray(search.results) || search.results.length === 0) {
  fail(`search returned 0 results (mock=${search.mock ?? false})`);
}
console.log(`[2/4] search: ${search.results.length} results (mock=${search.mock ?? false})`);

// 3. Paid fetch
const fetched = await step("fetch", () => fetchApi.fetch({
  fetchRequest: {
    url: fetchTargetUrl,
    method: "POST",
    body: fetchTargetBody,
    headers: { "content-type": "application/json" },
    maxCostUsd,
  },
}));

const paid = parseFloat(fetched.paidUsd ?? "0");
console.log(
  `[3/4] fetch: upstream=${fetched.status} paid=$${fetched.paidUsd ?? "0.00"} `
  + `tx=${fetched.txHash ?? "n/a"} bytes=${(fetched.bodyBase64 ?? "").length}`,
);
if (fetched.status < 200 || fetched.status >= 500) {
  fail(`upstream status ${fetched.status} indicates Weft-side failure, not merchant`);
}
if (paid <= 0) fail(`fetch returned paidUsd=${fetched.paidUsd} — expected a settled payment`);
if (!fetched.txHash) fail(`fetch returned no txHash — settlement did not happen`);

// 4. Balance after
const after = await step("balance(after)", () => balanceApi.getBalance());
const afterUsdc = parseFloat(after.wallet.balanceUsdc);
const delta = beforeUsdc - afterUsdc;
console.log(
  `[4/4] balance after: wallet=$${after.wallet.balanceUsdc} `
  + `(delta=$${delta.toFixed(6)}, expected=$${paid.toFixed(6)})`,
);

// Settlement may not be reflected in cached balance instantly — allow a tiny
// tolerance and the delta may also be 0 if the gateway hasn't observed the
// transfer yet. Treat "decreased by roughly the paid amount" as the success
// signal; warn (don't fail) when the cache lags.
const tolerance = Math.max(paid * 0.05, 0.0001);
if (delta < 0) fail(`balance went UP after paid fetch (delta=$${delta.toFixed(6)})`);
if (delta === 0) {
  console.warn(`[warn] balance unchanged after paid fetch — settlement may be pending`);
} else if (Math.abs(delta - paid) > tolerance) {
  console.warn(`[warn] balance delta $${delta.toFixed(6)} differs from paid $${paid.toFixed(6)} by >${(tolerance * 100 / paid).toFixed(1)}%`);
}

console.log("ok: agent-economy smoke passed");
