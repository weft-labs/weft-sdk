import { lstat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

export const home = process.env.HOME || process.env.USERPROFILE || homedir();

/** Files that make up the `weft` Skill, relative to the skill directory. */
export const skillFiles = ["SKILL.md", "rules/cli.md"];

/** [detection root, skill directory] pairs, both relative to `home`. */
export const targets = [
  [".agents", ".agents/skills/weft"],
  [".claude", ".claude/skills/weft"],
  [".cursor", ".cursor/skills/weft"],
  [".cline", ".cline/skills/weft"],
  [".config/opencode", ".config/opencode/skills/weft"],
  [".openclaw", ".openclaw/skills/weft"],
  [".hermes", ".hermes/skills/weft"],
];

export async function isDetectedHost(relativeRoot) {
  try {
    return (await lstat(join(home, relativeRoot))).isDirectory();
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export async function containsSymlink(relativeTarget) {
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
