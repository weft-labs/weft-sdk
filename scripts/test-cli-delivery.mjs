import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = await mkdtemp(join(tmpdir(), "weft-cli-pipe-"));
const body =
  "START" + "x".repeat(99_995) + "MIDDLE" + "y".repeat(99_992) + "END";
let requests = 0;
const server = createServer(async (request, response) => {
  for await (const _chunk of request) {
    /* Drain the request before replying. */
  }
  requests += 1;
  assert.equal(request.url, "/api/v1/fetch");
  assert.equal(request.headers["idempotency-key"], "pipe-test-key");
  response.setHeader("content-type", "application/json");
  response.end(
    JSON.stringify({
      status: 200,
      headers: { "content-type": "text/plain" },
      body_base64: Buffer.from(body).toString("base64"),
      paid_usd: "0.00",
      held_usd: "0.10",
      payment_status: "pending",
      artifact_id: 42,
    }),
  );
});

async function runFetch(baseUrl, closePipe) {
  const child = spawn(
    process.execPath,
    [
      fileURLToPath(new URL("../cli/bin/weft.mjs", import.meta.url)),
      "fetch",
      "https://merchant.example/data",
      "--max-cost-usd",
      "0.10",
      "--idempotency-key",
      "pipe-test-key",
    ],
    {
      env: {
        ...process.env,
        WEFT_BASE_URL: baseUrl,
        WEFT_API_KEY: "wk_synthetic_pipe_test",
        WEFT_RESULTS_DIR: root,
        WEFT_SKIP_SKILL_INSTALL: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let stdout = "";
  let stderr = "";
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });
  if (closePipe) {
    child.stdout.destroy();
  } else {
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      child.stdout.pause();
      setTimeout(() => child.stdout.resume(), 10);
    });
  }
  const code = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", resolve);
  });
  assert.equal(code, closePipe ? 5 : 0, stderr);
  const output = JSON.parse(closePipe ? stderr : stdout);
  assert.equal(output.meta.idempotency_key, "pipe-test-key");
  assert.equal(await readFile(output.meta.saved_path, "utf8"), body);
  const receipt = JSON.parse(await readFile(output.meta.receipt_path, "utf8"));
  assert.equal(receipt.data.paymentStatus, "pending");
  if (closePipe) {
    assert.equal(output.error.code, "RESULT_OUTPUT_FAILED");
    assert.equal(output.error.details.receipt.artifactId, 42);
    assert.equal(output.error.details.receipt.heldUsd, "0.10");
  } else {
    assert.equal(output.data.body, body);
    assert.equal(stderr, "");
  }
}

try {
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  await runFetch(baseUrl, true);
  await runFetch(baseUrl, false);
  assert.equal(requests, 2, "Each CLI process must send exactly one fetch");
  console.log(
    "CLI delivery: broken-pipe recovery and slow-reader output passed",
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(root, { recursive: true, force: true });
}
