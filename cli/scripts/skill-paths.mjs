import { lstat } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

export const home = process.env.HOME || process.env.USERPROFILE || homedir();

export const targets = [
  [".agents", ".agents/skills/weft-cli/SKILL.md"],
  [".claude", ".claude/skills/weft-cli/SKILL.md"],
  [".cursor", ".cursor/skills/weft-cli/SKILL.md"],
  [".cline", ".cline/skills/weft-cli/SKILL.md"],
  [".config/opencode", ".config/opencode/skills/weft-cli/SKILL.md"],
  [".openclaw", ".openclaw/skills/weft-cli/SKILL.md"],
  [".hermes", ".hermes/skills/weft-cli/SKILL.md"],
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
