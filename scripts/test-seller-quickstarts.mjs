/**
 * Packed-artifact acceptance for the seller payment examples.
 *
 * Packs `@weft-labs/sdk`, installs it into a clean consumer directory beside
 * the dependencies the public guide tells a seller to install, then runs
 * `examples/charge-api.mjs` (Express) and `examples/charge-api-hono.mjs`
 * (Hono) against a stub facilitator.
 *
 * SCOPE, STATED PLAINLY: the stub returns `isValid` and `success` without
 * checking a signature. This proves middleware WIRING — an unpaid request
 * gets a 402 challenge, a paid retry reaches the protected handler, and the
 * seller key travels on `/settle`. It does NOT prove settlement correctness
 * or payment validity. The real-money proof lives in the staging first-seller
 * plan, not here.
 */
import { mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const packageDirectory = new URL("../typescript/", import.meta.url);
const temporaryDirectory = await mkdtemp(join(tmpdir(), "weft-sdk-seller-"));

const SELLER_API_KEY = "ax_live_seller_fixture";
const PAY_TO = "0x0000000000000000000000000000000000000001";
const PAYER = "0x0000000000000000000000000000000000000002";
const NETWORK = "eip155:84532";
const SETTLEMENT_TX =
  "0xfeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedfacefeedface";

/**
 * Run a command to completion and capture its output.
 *
 * @param command - Executable to run
 * @param args - Arguments for the executable
 * @param options - Extra spawn options
 * @returns The captured stdout and stderr
 */
function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "pipe", ...options });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve({ stdout, stderr });
      else
        reject(
          new Error(
            `${command} ${args.join(" ")} exited ${code}\n${stdout}${stderr}`,
          ),
        );
    });
  });
}

const facilitatorRequests = [];
const facilitator = createServer(async (request, response) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  facilitatorRequests.push({
    method: request.method,
    url: request.url,
    apiKey: request.headers["x-api-key"],
    authorization: request.headers.authorization,
    body: body ? JSON.parse(body) : undefined,
  });

  response.setHeader("content-type", "application/json");

  if (request.url === "/supported") {
    response.end(
      JSON.stringify({
        kinds: [{ x402Version: 2, scheme: "exact", network: NETWORK }],
      }),
    );
    return;
  }

  if (request.url === "/verify") {
    response.end(
      JSON.stringify({
        isValid: true,
        payer: PAYER,
      }),
    );
    return;
  }

  if (request.url === "/settle") {
    // A real facilitator rejects this call without the seller key. The stub
    // asserts the same rule so a regression that drops the key fails here
    // rather than silently in production.
    if (request.headers["x-api-key"] !== SELLER_API_KEY) {
      response.statusCode = 401;
      response.end(JSON.stringify({ error: "missing seller API key" }));
      return;
    }
    response.end(
      JSON.stringify({
        success: true,
        transaction: SETTLEMENT_TX,
        network: NETWORK,
        payer: PAYER,
      }),
    );
    return;
  }

  response.statusCode = 404;
  response.end(JSON.stringify({ error: "not found" }));
});

/**
 * Reserve a free TCP port and release it.
 *
 * The Express example keeps `app.listen(port)` — the shape a seller copies —
 * so the harness must hand it a concrete port rather than 0.
 *
 * @returns A port that was free a moment ago
 */
async function reservePort() {
  const probe = createServer();
  await new Promise((resolve) => probe.listen(0, "127.0.0.1", resolve));
  const { port } = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

/**
 * Wait for the Express example to print its listening line.
 *
 * @param child - The spawned example process
 * @returns The port the example bound
 */
function waitForListening(child) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      reject(new Error(`Express example did not start\n${stdout}${stderr}`));
    }, 30_000);
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      const match = stdout.match(/\{"listening":(\d+)\}/);
      if (match) {
        clearTimeout(timer);
        resolve(Number(match[1]));
      }
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("exit", (code) => {
      clearTimeout(timer);
      reject(new Error(`Express example exited ${code}\n${stdout}${stderr}`));
    });
  });
}

/**
 * Decode the x402 challenge the resource server puts on the 402 response.
 *
 * The challenge travels in the `PAYMENT-REQUIRED` header as base64 JSON; the
 * 402 body is empty. A buyer client uses `decodePaymentRequiredHeader` from
 * `@x402/core/http` — this harness decodes directly so it stays runnable from
 * the repo root, where the consumer's dependencies are not resolvable.
 *
 * @param header - The raw `payment-required` header value
 * @returns The decoded challenge
 */
function decodeChallenge(header) {
  if (!header) {
    throw new Error("402 response carried no PAYMENT-REQUIRED header");
  }
  return JSON.parse(Buffer.from(header, "base64").toString("utf8"));
}

/**
 * Build the payment payload a buyer would send for the given requirements.
 *
 * The signature is fixture bytes: the stub facilitator is what accepts or
 * rejects a payment, and this harness deliberately does not reimplement
 * EIP-3009 signing.
 *
 * @param requirements - One entry from the 402 challenge's `accepts`
 * @returns A payment payload in the shape the exact EVM scheme carries
 */
function buildPaymentPayload(requirements) {
  const now = Math.floor(Date.now() / 1000);
  return {
    x402Version: 2,
    scheme: requirements.scheme,
    network: requirements.network,
    // The resource server matches this against the challenge entry it issued.
    accepted: requirements,
    payload: {
      signature: `0x${"11".repeat(65)}`,
      authorization: {
        from: PAYER,
        to: requirements.payTo,
        value: requirements.amount,
        validAfter: String(now - 60),
        validBefore: String(now + 3600),
        nonce: `0x${"22".repeat(32)}`,
      },
    },
  };
}

let expressProcess;
try {
  await run("pnpm", ["pack", "--pack-destination", temporaryDirectory], {
    cwd: packageDirectory,
  });
  const archive = join(
    temporaryDirectory,
    (await readdir(temporaryDirectory)).find((name) => name.endsWith(".tgz")),
  );
  await writeFile(
    join(temporaryDirectory, "package.json"),
    JSON.stringify({ name: "weft-seller-artifact-consumer", private: true }),
  );

  // Exactly what the public guide tells a seller to install.
  await run(
    "pnpm",
    [
      "add",
      "--ignore-scripts",
      `file:${archive}`,
      "express",
      "hono",
      "@x402/evm",
    ],
    { cwd: temporaryDirectory },
  );

  await new Promise((resolve) => facilitator.listen(0, "127.0.0.1", resolve));
  const facilitatorAddress = facilitator.address();
  const facilitatorUrl = `http://127.0.0.1:${facilitatorAddress.port}`;

  const installedPackage = join(
    temporaryDirectory,
    "node_modules",
    "@weft-labs",
    "sdk",
  );
  const env = {
    ...process.env,
    WEFT_SELLER_API_KEY: SELLER_API_KEY,
    WEFT_PAY_TO: PAY_TO,
    WEFT_NETWORK: NETWORK,
    X402_FACILITATOR_URL: facilitatorUrl,
    PORT: String(await reservePort()),
  };

  // ---- Express, driven over real HTTP ----------------------------------
  expressProcess = spawn(
    process.execPath,
    [join(installedPackage, "examples", "charge-api.mjs")],
    { cwd: temporaryDirectory, env, stdio: "pipe" },
  );
  const port = await waitForListening(expressProcess);
  const base = `http://127.0.0.1:${port}`;

  const unpaid = await fetch(`${base}/v1/quote`);
  if (unpaid.status !== 402) {
    throw new Error(
      `Express example did not challenge an unpaid caller: ${unpaid.status}`,
    );
  }
  const requirements = decodeChallenge(unpaid.headers.get("payment-required"))
    .accepts?.[0];
  if (!requirements) {
    throw new Error("Express 402 challenge carried no payment requirements");
  }
  if (requirements.payTo !== PAY_TO) {
    throw new Error(
      `Express challenge named the wrong payee: ${requirements.payTo}`,
    );
  }

  const paymentHeader = Buffer.from(
    JSON.stringify(buildPaymentPayload(requirements)),
    "utf8",
  ).toString("base64");
  const paid = await fetch(`${base}/v1/quote`, {
    headers: { "payment-signature": paymentHeader },
  });
  if (paid.status !== 200) {
    throw new Error(
      `Paid Express retry did not reach the handler: ${paid.status} ${await paid.text()}`,
    );
  }
  const quote = await paid.json();
  if (quote.symbol !== "ACME") {
    throw new Error("Paid Express retry did not return the handler payload");
  }

  // ---- Hono, driven through its own fetch handler ----------------------
  const honoDriver = join(temporaryDirectory, "drive-hono.mjs");
  const examplePath = join(installedPackage, "examples", "charge-api-hono.mjs");
  await writeFile(
    honoDriver,
    `const PAY_TO = ${JSON.stringify(PAY_TO)};
const PAYER = ${JSON.stringify(PAYER)};
const buildPaymentPayload = ${buildPaymentPayload.toString()};
const decodeChallenge = ${decodeChallenge.toString()};
const { default: app } = await import(${JSON.stringify(examplePath)});

const url = "https://api.acme.test/v1/quote";
const unpaid = await app.fetch(new Request(url));
const requirements = decodeChallenge(
  unpaid.headers.get("payment-required"),
).accepts?.[0];

const header = Buffer.from(
  JSON.stringify(buildPaymentPayload(requirements)),
  "utf8",
).toString("base64");
const paid = await app.fetch(
  new Request(url, { headers: { "payment-signature": header } }),
);

console.log(
  JSON.stringify({
    unpaidStatus: unpaid.status,
    paidStatus: paid.status,
    body: await paid.json(),
    payTo: requirements?.payTo,
  }),
);
`,
    "utf8",
  );

  const honoResult = await run(process.execPath, [honoDriver], {
    cwd: temporaryDirectory,
    env,
  });
  const hono = JSON.parse(honoResult.stdout.trim().split("\n").pop());
  if (hono.unpaidStatus !== 402) {
    throw new Error(
      `Hono example did not challenge an unpaid caller: ${hono.unpaidStatus}`,
    );
  }
  if (hono.paidStatus !== 200 || hono.body?.symbol !== "ACME") {
    throw new Error(
      `Paid Hono retry did not reach the handler: ${hono.paidStatus}`,
    );
  }
  if (hono.payTo !== PAY_TO) {
    throw new Error(`Hono challenge named the wrong payee: ${hono.payTo}`);
  }

  // ---- What the facilitator actually saw --------------------------------
  const settlements = facilitatorRequests.filter(
    (request) => request.url === "/settle",
  );
  if (settlements.length !== 2) {
    throw new Error(
      `Expected one settlement per adapter, saw ${settlements.length}`,
    );
  }
  if (settlements.some((request) => request.apiKey !== SELLER_API_KEY)) {
    throw new Error("A settlement went out without the seller API key");
  }
  const verifications = facilitatorRequests.filter(
    (request) => request.url === "/verify",
  );
  if (verifications.length !== 2) {
    throw new Error(
      `Expected one verification per adapter, saw ${verifications.length}`,
    );
  }
  if (verifications.some((request) => request.apiKey !== SELLER_API_KEY)) {
    throw new Error(
      "A verification went out without the seller API key, so the funnel " +
        "would not attribute it",
    );
  }

  console.log(
    "Packed seller examples passed: Express and Hono both challenged an " +
      "unpaid caller, admitted a paid retry, and settled with the seller key.",
  );
} finally {
  expressProcess?.kill("SIGKILL");
  await new Promise((resolve) => facilitator.close(resolve));
  await rm(temporaryDirectory, { recursive: true, force: true });
}
