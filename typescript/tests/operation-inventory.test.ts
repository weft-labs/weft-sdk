import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("operation inventory", () => {
  it("classifies every canonical OpenAPI operation", () => {
    const spec = readFileSync(
      new URL("../../spec/openapi.yaml", import.meta.url),
      "utf8",
    );
    const inventory = readFileSync(
      new URL("../../docs/operation-inventory.md", import.meta.url),
      "utf8",
    );
    const operationIds = [
      ...spec.matchAll(/^\s+operationId:\s+(\S+)\s*$/gm),
    ].map(([, operationId]) => operationId);

    expect(operationIds.length).toBeGreaterThan(0);
    expect(new Set(operationIds).size).toBe(operationIds.length);
    for (const operationId of operationIds) {
      expect(inventory, `missing inventory entry for ${operationId}`).toContain(
        `\`${operationId}\``,
      );
    }
  });

  it("ships a library-only package", () => {
    const packageJson = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    );
    expect(packageJson.bin).toBeUndefined();
    expect(packageJson.files).not.toContain("cli");
  });
});
