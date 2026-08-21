import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile,
} from "node:fs/promises";
import { dirname, join } from "node:path";
import {
  containsSymlink,
  home,
  isDetectedHost,
  targets,
} from "./skill-paths.mjs";

const bundledSkill = new URL("../dist/weft-cli-skill/SKILL.md", import.meta.url);
const workspaceSkill = new URL(
  "../../skills/weft-cli/SKILL.md",
  import.meta.url,
);

if (process.env.WEFT_SKIP_SKILL_INSTALL === "1") {
  console.log("Skipped Weft CLI Skill installation (WEFT_SKIP_SKILL_INSTALL=1).");
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
  console.warn(`Could not read the bundled Weft CLI Skill: ${error.message}`);
  process.exit(0);
}

const skillHash = createHash("sha256").update(skill).digest("hex");
const ownerMarker = JSON.stringify({ sha256: skillHash });
let installed = 0;
for (const [hostRoot, relativeTarget] of targets) {
  const target = join(home, relativeTarget);
  const relativeMarker = join(
    dirname(relativeTarget),
    ".weft-cli-owner.json",
  );
  const markerTarget = join(home, relativeMarker);
  try {
    if (!(await isDetectedHost(hostRoot))) continue;
    if (
      (await containsSymlink(relativeTarget)) ||
      (await containsSymlink(relativeMarker))
    ) {
      console.warn(`Skipped symlinked Skill destination: ${target}`);
      continue;
    }

    const directory = dirname(target);
    const temporary = join(directory, ".weft-cli-next");
    const backup = join(directory, ".weft-cli-backup");
    const existing = await readFile(target, "utf8").catch((error) => {
      if (error.code === "ENOENT") return undefined;
      throw error;
    });
    const marker = await readFile(markerTarget, "utf8").catch((error) => {
      if (error.code === "ENOENT") return undefined;
      throw error;
    });
    if (marker !== undefined) {
      await rm(temporary, { force: true });
      await rm(backup, { force: true });
    }
    if (existing === skill) {
      if (marker !== undefined && marker !== ownerMarker) {
        await writeFile(markerTarget, ownerMarker, {
          encoding: "utf8",
          mode: 0o600,
        });
      }
      continue;
    }

    const existingHash =
      existing === undefined
        ? undefined
        : createHash("sha256").update(existing).digest("hex");

    if (existing !== undefined) {
      if (marker !== JSON.stringify({ sha256: existingHash })) {
        console.warn(
          `Kept existing Skill at ${target}. Remove it and reinstall @weft-labs/cli to use weft-cli.`,
        );
        continue;
      }

      await writeFile(temporary, skill, { encoding: "utf8", mode: 0o600 });
      try {
        await rename(target, backup);
        try {
          await rename(temporary, target);
        } catch (error) {
          await rename(backup, target);
          throw error;
        }
      } finally {
        await rm(temporary, { force: true });
      }
    } else {
      await mkdir(dirname(target), { recursive: true });
      await rm(markerTarget, { force: true });
      await writeFile(markerTarget, ownerMarker, {
        encoding: "utf8",
        flag: "wx",
        mode: 0o600,
      });
      try {
        await writeFile(target, skill, {
          encoding: "utf8",
          flag: "wx",
          mode: 0o600,
        });
      } catch (error) {
        await rm(markerTarget, { force: true });
        throw error;
      }
    }

    await writeFile(markerTarget, ownerMarker, {
      encoding: "utf8",
      mode: 0o600,
    });
    await rm(backup, { force: true });
    installed += 1;
  } catch (error) {
    console.warn(
      `Could not install the Weft CLI Skill at ${target}: ${error.message}`,
    );
  }
}

console.log(
  `Installed the Weft CLI Skill for ${installed} detected agent host(s).`,
);
