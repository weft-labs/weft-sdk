import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
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
 *
 * The `weft` Skill (`skills/weft/`) is vendored byte-identical from
 * weftlabs/skills at the commit pinned in `skills/SKILLS_REF`; CI diffs the
 * copy against that commit. Wording this repo does not own is therefore only
 * checked for the safety invariants, while the repo-authored CLI README
 * carries the full frozen contract.
 */

const SKILL = read("../../skills/weft/SKILL.md");
const CLI_RULES = read("../../skills/weft/rules/cli.md");
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

const SKILL_FILES = ["SKILL.md", "rules/cli.md"];

const HOST_ROOTS = [
  ".agents",
  ".claude",
  ".cursor",
  ".cline",
  ".config/opencode",
  ".openclaw",
  ".hermes",
];

const SKILL_DIRS = HOST_ROOTS.map((root) => `${root}/skills/weft`);

function read(relativePath: string): string {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function markerFor(contents: Record<string, string>): string {
  const hashes: Record<string, string> = {};
  for (const file of SKILL_FILES) {
    if (contents[file] !== undefined) hashes[file] = sha256(contents[file]);
  }
  return JSON.stringify({ sha256: hashes });
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

function runInstaller(home: string): void {
  execFileSync(
    process.execPath,
    [fileURLToPath(new URL("../scripts/install-skill.mjs", import.meta.url))],
    {
      env: {
        ...process.env,
        HOME: home,
        USERPROFILE: "",
        WEFT_FORCE_SKILL_INSTALL: "1",
      },
    },
  );
}

describe("public documents teach the frozen bootstrap lifecycle", () => {
  it("names only implemented or contract-frozen commands", async () => {
    const allowed = new Set(await implementedCommands());
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["rules/cli.md", CLI_RULES],
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
      const found = README.indexOf(step, cursor);
      expect(
        found,
        `cli/README.md is missing or misorders: ${step}`,
      ).toBeGreaterThan(-1);
      cursor = found;
    }
  });

  it("states that wbt_ is secret, temporary, and search-only", () => {
    for (const [label, document] of [
      ["rules/cli.md", CLI_RULES],
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
    }
    for (const capability of ["`search`", "`status`", "`cancel`"]) {
      expect(README).toContain(capability);
    }
  });

  it("documents every bootstrap lifecycle state", () => {
    for (const [label, document] of [
      ["rules/cli.md", CLI_RULES],
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
    expect(README).toMatch(
      /auth status[\s\S]{0,100}claimed[\s\S]{0,100}consumed/i,
    );
    expect(README).toMatch(/does not emit an intermediate `claimed`/i);
  });

  it("forbids the agent from handling the human's password", () => {
    for (const [label, document] of [
      ["rules/cli.md", CLI_RULES],
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
    expect(CLI_RULES).not.toMatch(/verification URI/i);
    expect(EXAMPLE).not.toMatch(/verification URI/i);
    expect(CLI_RULES).toMatch(/claim link[\s\S]{0,80}email only/i);
  });

  it("never implies a subsidy, sponsorship, or promotional balance", () => {
    for (const [label, document] of [
      ["SKILL.md", SKILL],
      ["rules/cli.md", CLI_RULES],
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

  it("names where the human adds money before any paid fetch", () => {
    // Upstream owns the wording, so pin the CONTRACT the agent acts on — a
    // named place to send the human — not the sentence carrying it. The
    // previous regex matched one phrasing and broke on the first reword.
    expect(CLI_RULES).toMatch(/https:\/\/weft\.network\/dashboard\/wallet/);
    expect(README.toLowerCase()).toMatch(/fund the wallet|funded by the human/);
  });

  it("documents claimed-state search and stored OAuth credentials", () => {
    for (const document of [README, INVENTORY]) {
      expect(document).toMatch(/claimed[\s\S]{0,100}search/i);
    }
    for (const document of [CLI_RULES, README, TYPESCRIPT_README, INVENTORY]) {
      expect(document).toMatch(/stored[\s\S]{0,100}OAuth/i);
    }
  });

  it("packs and updates package-owned Skills for detected hosts", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-install-"));
    const bundledRoot = fileURLToPath(
      new URL("../dist/weft-skill", import.meta.url),
    );
    const staleBundled = fileURLToPath(
      new URL("../dist/weft-cli-skill", import.meta.url),
    );
    mkdirSync(staleBundled, { recursive: true });
    writeFileSync(join(staleBundled, "SKILL.md"), "---\nname: weft-cli\n---\n");
    for (const root of HOST_ROOTS) {
      mkdirSync(join(home, root), { recursive: true });
    }
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);
    expect(readFileSync(join(bundledRoot, "SKILL.md"), "utf8")).toBe(SKILL);
    expect(readFileSync(join(bundledRoot, "rules/cli.md"), "utf8")).toBe(
      CLI_RULES,
    );
    expect(existsSync(staleBundled)).toBe(false);

    runInstaller(home);
    for (const directory of SKILL_DIRS) {
      expect(readFileSync(join(home, directory, "SKILL.md"), "utf8")).toBe(
        SKILL,
      );
      expect(readFileSync(join(home, directory, "rules/cli.md"), "utf8")).toBe(
        CLI_RULES,
      );
    }

    const updatedRules = `${CLI_RULES}\n<!-- updated -->\n`;
    writeFileSync(join(bundledRoot, "rules/cli.md"), updatedRules);
    runInstaller(home);
    for (const directory of SKILL_DIRS) {
      expect(readFileSync(join(home, directory, "SKILL.md"), "utf8")).toBe(
        SKILL,
      );
      expect(readFileSync(join(home, directory, "rules/cli.md"), "utf8")).toBe(
        updatedRules,
      );
    }

    const firstDirectory = join(home, SKILL_DIRS[0]);
    const marker = join(firstDirectory, ".weft-owner.json");
    const abandonedTemporary = join(firstDirectory, ".weft-next-SKILL.md");
    writeFileSync(marker, JSON.stringify({ sha256: "stale" }));
    writeFileSync(abandonedTemporary, "old package copy\n");
    runInstaller(home);
    expect(readFileSync(marker, "utf8")).toBe(
      markerFor({ "SKILL.md": SKILL, "rules/cli.md": updatedRules }),
    );
    expect(existsSync(abandonedTemporary)).toBe(false);

    const changed = join(home, SKILL_DIRS[0], "rules/cli.md");
    writeFileSync(changed, "user-owned\n");
    const nextRules = `${CLI_RULES}\n<!-- next -->\n`;
    writeFileSync(join(bundledRoot, "rules/cli.md"), nextRules);
    runInstaller(home);
    expect(readFileSync(changed, "utf8")).toBe("user-owned\n");
    expect(readFileSync(join(home, SKILL_DIRS[0], "SKILL.md"), "utf8")).toBe(
      SKILL,
    );
    for (const directory of SKILL_DIRS.slice(1)) {
      expect(readFileSync(join(home, directory, "rules/cli.md"), "utf8")).toBe(
        nextRules,
      );
      expect(
        readdirSync(join(home, directory)).filter(
          (name) =>
            name.includes(".old.") ||
            name.includes(".bak.") ||
            name.startsWith(".weft-next"),
        ),
      ).toEqual([]);
    }
    rmSync(home, { recursive: true, force: true });
    rmSync(bundledRoot, { recursive: true, force: true });
  });

  it("repairs a crash-interrupted upgrade instead of refusing it", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-repair-"));
    const bundledRoot = fileURLToPath(
      new URL("../dist/weft-skill", import.meta.url),
    );
    mkdirSync(join(home, HOST_ROOTS[0]), { recursive: true });
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);
    runInstaller(home);

    // Simulate a crash mid-upgrade: the bundle moved on, one file was
    // already renamed into place, the other file and the ownership marker
    // still hold the previous version.
    const nextSkill = `${SKILL}\n<!-- v2 -->\n`;
    const nextRules = `${CLI_RULES}\n<!-- v2 -->\n`;
    writeFileSync(join(bundledRoot, "SKILL.md"), nextSkill);
    writeFileSync(join(bundledRoot, "rules/cli.md"), nextRules);
    const directory = join(home, HOST_ROOTS[0], "skills", "weft");
    writeFileSync(join(directory, "SKILL.md"), nextSkill);

    runInstaller(home);
    expect(readFileSync(join(directory, "SKILL.md"), "utf8")).toBe(nextSkill);
    expect(readFileSync(join(directory, "rules/cli.md"), "utf8")).toBe(
      nextRules,
    );
    expect(readFileSync(join(directory, ".weft-owner.json"), "utf8")).toBe(
      markerFor({ "SKILL.md": nextSkill, "rules/cli.md": nextRules }),
    );

    rmSync(home, { recursive: true, force: true });
    rmSync(bundledRoot, { recursive: true, force: true });
  });

  it("skips a Skill directory whose ownership marker is a symlink", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-marker-link-"));
    const outside = mkdtempSync(join(tmpdir(), "weft-skill-marker-out-"));
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);
    const directory = join(home, HOST_ROOTS[0], "skills", "weft");
    mkdirSync(directory, { recursive: true });
    writeFileSync(join(outside, "marker.json"), "{}");
    symlinkSync(
      join(outside, "marker.json"),
      join(directory, ".weft-owner.json"),
    );

    expect(() => runInstaller(home)).not.toThrow();
    expect(existsSync(join(directory, "SKILL.md"))).toBe(false);
    expect(readFileSync(join(outside, "marker.json"), "utf8")).toBe("{}");

    rmSync(home, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
    rmSync(new URL("../dist/weft-skill", import.meta.url), {
      recursive: true,
      force: true,
    });
  });

  it("migrates a package-owned weft-cli Skill and keeps user copies", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-migrate-"));
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);

    // Package-owned legacy install: SKILL.md matches its ownership marker.
    const ownedLegacy = join(home, ".agents", "skills", "weft-cli");
    mkdirSync(ownedLegacy, { recursive: true });
    writeFileSync(join(ownedLegacy, "SKILL.md"), "legacy skill\n");
    writeFileSync(
      join(ownedLegacy, ".weft-cli-owner.json"),
      JSON.stringify({ sha256: sha256("legacy skill\n") }),
    );

    // User-modified legacy copy: content drifted from the marker.
    const modifiedLegacy = join(home, ".claude", "skills", "weft-cli");
    mkdirSync(modifiedLegacy, { recursive: true });
    writeFileSync(join(modifiedLegacy, "SKILL.md"), "hand-edited\n");
    writeFileSync(
      join(modifiedLegacy, ".weft-cli-owner.json"),
      JSON.stringify({ sha256: sha256("legacy skill\n") }),
    );

    // User-owned legacy copy: no ownership marker at all.
    const unownedLegacy = join(home, ".cursor", "skills", "weft-cli");
    mkdirSync(unownedLegacy, { recursive: true });
    writeFileSync(join(unownedLegacy, "SKILL.md"), "user skill\n");

    runInstaller(home);

    for (const root of [".agents", ".claude", ".cursor"]) {
      expect(
        readFileSync(join(home, root, "skills", "weft", "SKILL.md"), "utf8"),
      ).toBe(SKILL);
    }
    expect(existsSync(ownedLegacy)).toBe(false);
    expect(readFileSync(join(modifiedLegacy, "SKILL.md"), "utf8")).toBe(
      "hand-edited\n",
    );
    expect(readFileSync(join(unownedLegacy, "SKILL.md"), "utf8")).toBe(
      "user skill\n",
    );

    rmSync(home, { recursive: true, force: true });
    rmSync(new URL("../dist/weft-skill", import.meta.url), {
      recursive: true,
      force: true,
    });
  });

  it("skips absent, occupied, unsafe, or broken host paths", () => {
    const home = mkdtempSync(join(tmpdir(), "weft-skill-install-safe-"));
    const outside = mkdtempSync(join(tmpdir(), "weft-skill-install-outside-"));
    execFileSync(process.execPath, [
      fileURLToPath(new URL("../scripts/prepare-skill.mjs", import.meta.url)),
    ]);

    mkdirSync(join(home, ".agents"));
    mkdirSync(join(home, ".claude", "skills", "weft"), {
      recursive: true,
    });
    writeFileSync(
      join(home, ".claude", "skills", "weft", "SKILL.md"),
      "user-owned\n",
    );
    writeFileSync(
      join(home, ".claude", "skills", "weft", "SKILL.md.old.manual"),
      "user backup\n",
    );
    mkdirSync(join(home, ".cursor", "skills"), { recursive: true });
    mkdirSync(join(outside, "weft"));
    symlinkSync(join(outside, "weft"), join(home, ".cursor", "skills", "weft"));
    mkdirSync(join(home, ".openclaw", "skills", "weft"), {
      recursive: true,
    });
    writeFileSync(
      join(home, ".openclaw", "skills", "weft", ".weft-owner.json"),
      markerFor({ "SKILL.md": SKILL, "rules/cli.md": CLI_RULES }),
    );

    expect(() => runInstaller(home)).not.toThrow();
    expect(
      readFileSync(join(home, ".agents/skills/weft/SKILL.md"), "utf8"),
    ).toBe(SKILL);
    expect(
      readFileSync(join(home, ".agents/skills/weft/rules/cli.md"), "utf8"),
    ).toBe(CLI_RULES);
    expect(
      readFileSync(join(home, ".claude", "skills", "weft", "SKILL.md"), "utf8"),
    ).toBe("user-owned\n");
    expect(
      readFileSync(
        join(home, ".claude", "skills", "weft", "SKILL.md.old.manual"),
        "utf8",
      ),
    ).toBe("user backup\n");
    expect(existsSync(join(outside, "weft", "SKILL.md"))).toBe(false);
    expect(
      readFileSync(
        join(home, ".openclaw", "skills", "weft", "SKILL.md"),
        "utf8",
      ),
    ).toBe(SKILL);
    expect(existsSync(join(home, ".cline"))).toBe(false);
    expect(
      readdirSync(join(home, ".claude", "skills", "weft")).filter((name) =>
        name.includes(".bak."),
      ),
    ).toEqual([]);

    rmSync(home, { recursive: true, force: true });
    rmSync(outside, { recursive: true, force: true });
    rmSync(new URL("../dist/weft-skill", import.meta.url), {
      recursive: true,
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
