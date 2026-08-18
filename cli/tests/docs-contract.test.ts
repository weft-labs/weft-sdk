import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { EXIT_SUCCESS, runCli } from "../src/cli";

/**
 * Executable text contract for the public agent-facing documents.
 *
 * The Skill, the CLI README, and the packed example teach one subsidy-free
 * lifecycle. These assertions fail when a document drifts from the frozen
 * contract: an invented command name, a missing lifecycle state, a softened
 * `wbt_` secrecy rule, or any wording that implies promotional money.
 */

const SKILL = read("../../skills/weft/SKILL.md");
const README = read("../README.md");
const EXAMPLE = read("../examples/agent-bootstrap.sh");
const INVENTORY = read("../../docs/operation-inventory.md");

const BOOTSTRAP_STATES = [
  "pending",
  "claimed",
  "rejected",
  "expired",
  "consumed",
] as const;

/** Frozen by the contract; the implementation lands with T3. */
const CONTRACT_ONLY_COMMANDS = ["bootstrap", "auth"];

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

/** Every fenced block and inline span, so prose never looks like a command. */
function codeSpans(document: string): string[] {
  return [
    ...(document.match(/```[\s\S]*?```/g) ?? []),
    ...(document.match(/`[^`\n]+`/g) ?? []),
  ];
}

function invokedCommands(document: string): string[] {
  const invocations = new Set<string>();
  for (const span of codeSpans(document)) {
    // The lookahead skips a URL argument, as in `weft https://weft.network`.
    for (const [, name] of span.matchAll(
      /\bweft\s+([a-z][a-z-]*)(?![a-z:/])/g,
    )) {
      invocations.add(name);
    }
  }
  return [...invocations];
}

function sentences(document: string): string[] {
  // Rejoin wrapped prose lines first so a sentence keeps its negation.
  const unwrapped = document.replace(/([^\n])\n(?=[^\n|\-*#\s])/g, "$1 ");
  return unwrapped.split(/(?<=[.!?])\s+|\n/);
}

async function implementedCommands(): Promise<string[]> {
  const out: string[] = [];
  const code = await runCli(["--help"], {
    env: {},
    writeOut: (value) => out.push(value),
    writeErr: () => {
      throw new Error("weft --help must not write to stderr");
    },
  });
  expect(code).toBe(EXIT_SUCCESS);
  return JSON.parse(out.join("")).data.commands.map(
    (entry: { name: string }) => entry.name,
  );
}

describe("public documents teach the frozen bootstrap lifecycle", () => {
  it("names only implemented or contract-frozen commands", async () => {
    const allowed = new Set([
      ...(await implementedCommands()),
      ...CONTRACT_ONLY_COMMANDS,
    ]);
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["cli/README.md", README],
      ["agent-bootstrap.sh", EXAMPLE],
      ["operation-inventory.md", INVENTORY],
    ] as const) {
      for (const command of invokedCommands(document)) {
        expect(
          allowed.has(command),
          `${label} documents an unknown command: weft ${command}`,
        ).toBe(true);
      }
    }
  });

  it("teaches install, email-only setup, bootstrap, and claim in order", () => {
    const steps = [
      "@weft-labs/cli",
      "email address",
      "weft bootstrap",
      "weft search",
      "claim email",
      "weft auth status",
      "OAuth",
      "fund the wallet",
    ];
    let cursor = 0;
    for (const step of steps) {
      const found = SKILL.indexOf(step, cursor);
      expect(
        found,
        `SKILL.md is missing or misorders: ${step}`,
      ).toBeGreaterThan(-1);
      cursor = found;
    }
  });

  it("states that wbt_ is secret, temporary, and search-only", () => {
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["cli/README.md", README],
    ] as const) {
      expect(document, `${label} must name the wbt_ credential`).toContain(
        "wbt_",
      );
      expect(document.toLowerCase()).toMatch(/secret/);
      expect(document.toLowerCase()).toMatch(/temporary/);
      expect(document.toLowerCase()).toMatch(/search-only/);
      expect(
        document.toLowerCase(),
        `${label} must give the 30-minute expiry`,
      ).toMatch(/30 minutes|30-minute/);
      for (const capability of ["`search`", "`status`", "`cancel`"]) {
        expect(document).toContain(capability);
      }
    }
  });

  it("documents every bootstrap lifecycle state", () => {
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["cli/README.md", README],
    ] as const) {
      for (const state of BOOTSTRAP_STATES) {
        expect(document, `${label} does not document ${state}`).toContain(
          `\`${state}\``,
        );
      }
      expect(document.toLowerCase()).toMatch(/terminal/);
    }
  });

  it("forbids the agent from handling the human's password", () => {
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["cli/README.md", README],
      ["agent-bootstrap.sh", EXAMPLE],
    ] as const) {
      const prohibitions = sentences(document).filter(
        (sentence) =>
          /password/i.test(sentence) &&
          /\bnever\b|\bno\b|\bnot\b/i.test(sentence),
      );
      expect(
        prohibitions.length,
        `${label} must prohibit agent handling of the password`,
      ).toBeGreaterThan(0);
    }
  });

  it("never implies a subsidy, sponsorship, or promotional balance", () => {
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["cli/README.md", README],
      ["agent-bootstrap.sh", EXAMPLE],
      ["operation-inventory.md", INVENTORY],
    ] as const) {
      const claims = sentences(document).filter(
        (sentence) =>
          /subsid|sponsor|promotional|free credit|treasury|entitlement/i.test(
            sentence,
          ) && !/\bno\b|\bnot\b|\bnever\b|\bwithout\b/i.test(sentence),
      );
      expect(claims, `${label} implies promotional money`).toEqual([]);
    }
  });

  it("requires human wallet funding before any paid fetch", () => {
    expect(SKILL.toLowerCase()).toMatch(/fund the wallet before/);
    expect(README.toLowerCase()).toMatch(/fund the wallet|funded by the human/);
  });

  it("keeps the bootstrap example valid POSIX shell", () => {
    const path = fileURLToPath(
      new URL("../examples/agent-bootstrap.sh", import.meta.url),
    );
    expect(() => execFileSync("sh", ["-n", path])).not.toThrow();
  });

  it("keeps the bootstrap example credential-free and non-secret-printing", () => {
    expect(EXAMPLE).not.toContain("WEFT_API_KEY");
    expect(EXAMPLE).not.toMatch(/echo\s+.*(wbt_|wk_)/);
    expect(EXAMPLE).toContain("weft bootstrap");
    expect(EXAMPLE).toContain("weft auth status");
  });
});
