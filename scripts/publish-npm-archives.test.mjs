import assert from "node:assert/strict";
import { test } from "node:test";
import { publishArchives } from "./publish-npm-archives.mjs";

const packages = () =>
  ["sdk", "cli"].map((name) => ({
    archive: `${name}.tgz`,
    integrity: `sha512-${name}`,
    manifest: {
      name: `@weftlabs/${name}`,
      version: "0.25.0",
      ...(name === "cli"
        ? { dependencies: { "@weftlabs/sdk": "0.25.0" } }
        : {}),
    },
  }));

function registry({
  existing = false,
  mismatch = false,
  absent = false,
  error = false,
} = {}) {
  const published = [];
  return {
    published,
    publish: async (archive) => published.push(archive),
    get: async (path) => {
      if (error) throw new Error("registry unavailable");
      if (!path.includes("/")) return absent ? null : {};
      const name = decodeURIComponent(path).includes("/sdk/") ? "sdk" : "cli";
      return existing || published.includes(`${name}.tgz`)
        ? { dist: { integrity: mismatch ? "different" : `sha512-${name}` } }
        : null;
    },
  };
}

test("publishes the tested archives in SDK then CLI order and checks registry integrity", async () => {
  const api = registry();
  await publishArchives(packages().reverse(), "v0.25.0", api);
  assert.deepEqual(api.published, ["sdk.tgz", "cli.tgz"]);
});

test("recovery skips only existing versions with identical bytes", async () => {
  const api = registry({ existing: true });
  await publishArchives(packages(), "v0.25.0", api);
  assert.deepEqual(api.published, []);
});

test("waits for registry propagation without submitting another publish", async () => {
  const api = registry();
  const get = api.get;
  const reads = new Map();
  const waits = [];
  api.wait = async (ms) => waits.push(ms);
  api.get = async (path) => {
    if (path.includes("/")) {
      reads.set(path, (reads.get(path) ?? 0) + 1);
      if (reads.get(path) < 4) return null;
    }
    return get(path);
  };
  await publishArchives(packages(), "v0.25.0", api);
  assert.deepEqual(api.published, ["sdk.tgz", "cli.tgz"]);
  assert.equal(waits.length, 4);
});

test("stops after bounded readback when a published SDK stays absent", async () => {
  const api = registry();
  const waits = [];
  api.wait = async (ms) => waits.push(ms);
  api.get = async (path) => (path.includes("/") ? null : {});
  await assert.rejects(publishArchives(packages(), "v0.25.0", api));
  assert.deepEqual(api.published, ["sdk.tgz"]);
  assert.equal(waits.length, 5);
});

for (const [label, options] of [
  ["different bytes", { existing: true, mismatch: true }],
  ["missing package bootstrap", { absent: true }],
  ["registry outage", { error: true }],
]) {
  test(`refuses publication on ${label}`, async () => {
    const api = registry(options);
    await assert.rejects(publishArchives(packages(), "v0.25.0", api));
    assert.deepEqual(api.published, []);
  });
}

test("stops before CLI publication if SDK upload has different registry bytes", async () => {
  const api = registry({ mismatch: true });
  await assert.rejects(publishArchives(packages(), "v0.25.0", api));
  assert.deepEqual(api.published, ["sdk.tgz"]);
});

test("rejects a tag mismatch or a CLI dependency outside the new scope", async () => {
  const api = registry();
  await assert.rejects(publishArchives(packages(), "v0.24.0", api));
  const archives = packages();
  archives[1].manifest.dependencies = { "@weft-labs/sdk": "0.25.0" };
  await assert.rejects(publishArchives(archives, "v0.25.0", api));
  assert.deepEqual(api.published, []);
});
