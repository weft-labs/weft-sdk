import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
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

const SKILL = read("../../skills/weft-cli/SKILL.md");
const README = read("../README.md");
const TYPESCRIPT_README = read("../../typescript/README.md");
const EXAMPLE = read("../examples/agent-bootstrap.sh");
const INVENTORY = read("../../docs/operation-inventory.md");

const BOOTSTRAP_STATES = [
  "pending",
  "claimed",
  "rejected",
  "expired",
  "consumed",
] as const;

const SKILL_TARGETS = [
  ".agents/skills/weft-cli/SKILL.md",
  ".claude/skills/weft-cli/SKILL.md",
  ".cursor/skills/weft-cli/SKILL.md",
  ".cline/skills/weft-cli/SKILL.md",
  ".config/opencode/skills/weft-cli/SKILL.md",
  ".openclaw/skills/weft-cli/SKILL.md",
  ".hermes/skills/weft-cli/SKILL.md",
];

const HOST_ROOTS = [
  ".agents",
  ".claude",
  ".cursor",
  ".cline",
  ".config/opencode",
  ".openclaw",
  ".hermes",
];

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
    const allowed = new Set(await implementedCommands());
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

  it("explains that claimed is consumed inside auth status", () => {
    for (const document of [SKILL, README]) {
      expect(document).toMatch(
        /auth status[\s\S]{0,100}claimed[\s\S]{0,100}consumed/i,
      );
      expect(document).toMatch(/does not emit an intermediate `claimed`/i);
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

  it("keeps the emailed claim link out of CLI handoff instructions", () => {
    expect(SKILL).not.toMatch(/verification URI/i);
    expect(EXAMPLE).not.toMatch(/verification URI/i);
    expect(SKILL).toMatch(/claim link[\s\S]{0,80}only in the email/i);
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

  it("documents claimed-state search and stored OAuth credentials", () => {
    for (const document of [SKILL, README, INVENTORY]) {
      expect(document).toMatch(/claimed[\s\S]{0,100}search/i);
    }
    for (const document of [SKILL, README, TYPESCRIPT_README, INVENTORY]) {
      expect(document).toMatch(/stored[\s\S]{0,100}OAuth/i);
    }
  });

  it("packs and updates package-owned Skills for detected hosts", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-install-"));
    const bundled = new URL("../dist/weft-cli-skill/SKILL.md", import.meta.url);
    const staleBundled = new URL(
      "../dist/weft-skill/SKILL.md",
      import.meta.url,
    );
    mkdirSync(fileURLToPath(new URL("../dist/weft-skill", import.meta.url)), {
      recursive: true,
    });
    writeFileSync(staleBundled, "---\nname: weft\n---\n");
    for (const root of HOST_ROOTS) {
      mkdirSync(join(home, root), { recursive: true });
    }
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);
    expect(readFileSync(bundled, "utf8")).toBe(SKILL);
    expect(() => readFileSync(staleBundled, "utf8")).toThrow();
    const installer = fileURLToPath(
      new URL("../scripts/install-skill.mjs", import.meta.url),
    );
    expect(() =>
      execFileSync(process.execPath, [installer], {
        env: {
          ...process.env,
          HOME: home,
          USERPROFILE: "",
          WEFT_FORCE_SKILL_INSTALL: "1",
        },
      }),
    ).not.toThrow();
    for (const destination of SKILL_TARGETS) {
      expect(readFileSync(join(home, destination), "utf8")).toBe(SKILL);
    }

    const updatedSkill = `${SKILL}\n<!-- updated -->\n`;
    writeFileSync(bundled, updatedSkill);
    execFileSync(process.execPath, [installer], {
      env: {
        ...process.env,
        HOME: home,
        USERPROFILE: "",
        WEFT_FORCE_SKILL_INSTALL: "1",
      },
    });
    for (const destination of SKILL_TARGETS) {
      expect(readFileSync(join(home, destination), "utf8")).toBe(updatedSkill);
    }

    const firstDirectory = join(home, dirname(SKILL_TARGETS[0]));
    const marker = join(firstDirectory, ".weft-cli-owner.json");
    const abandonedBackup = join(firstDirectory, ".weft-cli-backup");
    writeFileSync(marker, JSON.stringify({ sha256: "stale" }));
    writeFileSync(abandonedBackup, "old package copy\n");
    execFileSync(process.execPath, [installer], {
      env: {
        ...process.env,
        HOME: home,
        USERPROFILE: "",
        WEFT_FORCE_SKILL_INSTALL: "1",
      },
    });
    expect(JSON.parse(readFileSync(marker, "utf8"))).toEqual({
      sha256: createHash("sha256").update(updatedSkill).digest("hex"),
    });
    expect(() => readFileSync(abandonedBackup, "utf8")).toThrow();

    const changed = join(home, SKILL_TARGETS[0]);
    writeFileSync(changed, "user-owned\n");
    const nextSkill = `${SKILL}\n<!-- next -->\n`;
    writeFileSync(bundled, nextSkill);
    execFileSync(process.execPath, [installer], {
      env: {
        ...process.env,
        HOME: home,
        USERPROFILE: "",
        WEFT_FORCE_SKILL_INSTALL: "1",
      },
    });
    expect(readFileSync(changed, "utf8")).toBe("user-owned\n");
    for (const destination of SKILL_TARGETS.slice(1)) {
      expect(readFileSync(join(home, destination), "utf8")).toBe(nextSkill);
      expect(
        readdirSync(join(home, dirname(destination))).filter(
          (name) => name.includes(".old.") || name.includes(".bak."),
        ),
      ).toEqual([]);
    }
    rmSync(home, { recursive: true, force: true });
    rmSync(bundled, { force: true });
  });

  it("skips absent, occupied, unsafe, or broken host paths", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-install-safe-"));
    const outside = mkdtempSync(join(tmpdir(), "weft-skill-install-outside-"));
    const installer = fileURLToPath(
      new URL("../scripts/install-skill.mjs", import.meta.url),
    );
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);

    mkdirSync(join(home, ".agents"));
    mkdirSync(join(home, ".claude", "skills", "weft-cli"), {
      recursive: true,
    });
    writeFileSync(
      join(home, ".claude", "skills", "weft-cli", "SKILL.md"),
      "user-owned\n",
    );
    writeFileSync(
      join(home, ".claude", "skills", "weft-cli", "SKILL.md.old.manual"),
      "user backup\n",
    );
    mkdirSync(join(home, ".cursor", "skills"), { recursive: true });
    mkdirSync(join(outside, "weft-cli"));
    symlinkSync(
      join(outside, "weft-cli"),
      join(home, ".cursor", "skills", "weft-cli"),
    );
    mkdirSync(join(home, ".openclaw", "skills", "weft-cli"), {
      recursive: true,
    });
    writeFileSync(
      join(home, ".openclaw", "skills", "weft-cli", ".weft-cli-owner.json"),
      JSON.stringify({
        sha256: createHash("sha256").update(SKILL).digest("hex"),
      }),
    );

    expect(() =>
      execFileSync(process.execPath, [installer], {
        env: {
          ...process.env,
          HOME: home,
          USERPROFILE: "",
          WEFT_FORCE_SKILL_INSTALL: "1",
        },
      }),
    ).not.toThrow();
    expect(
      readFileSync(join(home, ".agents/skills/weft-cli/SKILL.md"), "utf8"),
    ).toBe(SKILL);
    expect(
      readFileSync(
        join(home, ".claude", "skills", "weft-cli", "SKILL.md"),
        "utf8",
      ),
    ).toBe("user-owned\n");
    expect(
      readFileSync(
        join(home, ".claude", "skills", "weft-cli", "SKILL.md.old.manual"),
        "utf8",
      ),
    ).toBe("user backup\n");
    expect(() => readFileSync(join(outside, "weft-cli", "SKILL.md"))).toThrow();
    expect(
      readFileSync(
        join(home, ".openclaw", "skills", "weft-cli", "SKILL.md"),
        "utf8",
      ),
    ).toBe(SKILL);
    expect(() => readFileSync(join(home, ".cline"))).toThrow();
    expect(
      readdirSync(join(home, ".claude", "skills", "weft-cli")).filter((name) =>
        name.includes(".bak."),
      ),
    ).toEqual([]);

    rmSync(home, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
    rmSync(new URL("../dist/weft-cli-skill/SKILL.md", import.meta.url), {
      force: true,
    });
  });

  it("keeps the bootstrap example valid POSIX shell", () => {
    const path = fileURLToPath(
      new URL("../examples/agent-bootstrap.sh", import.meta.url),
    );
    expect(() => execFileSync("sh", ["-n", path])).not.toThrow();
  });

  it("waits before every auth status poll", () => {
    expect(EXAMPLE).toMatch(
      /while :; do\s+sleep "\$POLL_INTERVAL"\s+auth="\$\(weft auth status\)"/,
    );
  });

  it("keeps the bootstrap example credential-free and non-secret-printing", () => {
    expect(EXAMPLE).not.toContain("WEFT_API_KEY");
    expect(EXAMPLE).not.toMatch(/echo\s+.*(wbt_|wk_)/);
    expect(EXAMPLE).toContain("weft bootstrap");
    expect(EXAMPLE).toContain("weft auth status");
  });
});
