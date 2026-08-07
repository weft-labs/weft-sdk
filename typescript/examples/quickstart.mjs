import { WeftClient } from "@weft-labs/sdk";

const apiKey = process.env.WEFT_API_KEY;
if (!apiKey) {
  throw new Error("Set WEFT_API_KEY to a buyer wk_* API key");
}

const weft = new WeftClient({
  apiKey,
  ...(process.env.WEFT_BASE_URL ? { baseUrl: process.env.WEFT_BASE_URL } : {}),
});

const account = await weft.me();
const search = await weft.search({ query: "weather data API" });

console.log(JSON.stringify({ account: account.data, results: search.results }));
