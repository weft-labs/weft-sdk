import { randomUUID } from "node:crypto";
import {
  access,
  lstat,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const bundledSkill = new URL("../dist/weft-skill/SKILL.md", import.meta.url);
const workspaceSkill = new URL("../../skills/weft/SKILL.md", import.meta.url);
const home = process.env.HOME || process.env.USERPROFILE || homedir();
const targets = [
  ".agents/skills/weft/SKILL.md",
  ".claude/skills/weft/SKILL.md",
  ".cursor/skills/weft/SKILL.md",
  ".cline/skills/weft/SKILL.md",
  ".config/opencode/skills/weft/SKILL.md",
  ".openclaw/skills/weft/SKILL.md",
  ".hermes/skills/weft/SKILL.md",
];

async function containsSymlink(relativeTarget) {
  let current = home;
  for (const part of relativeTarget.split("/")) {
    current = join(current, part);
    try {
      if ((await lstat(current)).isSymbolicLink()) return true;
    } catch (error) {
      if (error.code === "ENOENT") return false;
      throw error;
    }
  }
  return false;
}

if (process.env.WEFT_SKIP_SKILL_INSTALL === "1") {
  console.log("Skipped Weft Skill installation (WEFT_SKIP_SKILL_INSTALL=1).");
  process.exit(0);
}

if (process.env.WEFT_FORCE_SKILL_INSTALL !== "1") {
  const isWorkspaceInstall = await access(workspaceSkill)
    .then(() => true)
    .catch(() => false);
  if (isWorkspaceInstall) process.exit(0);
}

let skill;
try {
  skill = await readFile(bundledSkill, "utf8");
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`Could not read the bundled Weft Skill: ${message}`);
  process.exit(0);
}

for (const relativeTarget of targets) {
  const target = join(home, relativeTarget);
  const temporary = `${target}.${randomUUID()}.tmp`;
  try {
    if (await containsSymlink(relativeTarget)) {
      throw new Error("destination contains a symbolic link");
    }

    const existing = await readFile(target, "utf8").catch((error) => {
      if (error.code === "ENOENT") return undefined;
      throw error;
    });
    if (existing === skill) continue;

    await mkdir(dirname(target), { recursive: true, mode: 0o700 });
    await writeFile(temporary, skill, { mode: 0o600 });
    let backup;
    if (existing !== undefined) {
      backup = `${target}.bak.${Date.now()}.${randomUUID()}`;
      await rename(target, backup);
    }
    try {
      await rename(temporary, target);
    } catch (error) {
      if (backup) await rename(backup, target);
      throw error;
    }
  } catch (error) {
    await rm(temporary, { force: true }).catch(() => {});
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Could not install ${relativeTarget}: ${message}`);
  }
}

console.log(
  `Finished Weft Skill installation for supported agent hosts under ${home}.`,
);
