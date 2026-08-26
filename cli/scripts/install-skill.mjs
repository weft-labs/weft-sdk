import { createHash } from "node:crypto";
import {
  access,
  mkdir,
  readFile,
  rename,
  rm,
  rmdir,
  unlink,
  writeFile,
} from "node:fs/promises";
import { basename, dirname, join } from "node:path";
import {
  containsSymlink,
  home,
  isDetectedHost,
  skillFiles,
  targets,
} from "./skill-paths.mjs";

const bundledRoot = "../dist/weft-skill/";
const workspaceSkill = new URL("../../skills/weft/SKILL.md", import.meta.url);

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

const skill = new Map();
try {
  for (const file of skillFiles) {
    skill.set(
      file,
      await readFile(new URL(bundledRoot + file, import.meta.url), "utf8"),
    );
  }
} catch (error) {
  console.warn(`Could not read the bundled Weft Skill: ${error.message}`);
  process.exit(0);
}

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function markerFor(contents) {
  const hashes = {};
  for (const file of skillFiles) {
    const content = contents.get(file);
    if (content !== undefined) hashes[file] = sha256(content);
  }
  return JSON.stringify({ sha256: hashes });
}

const ownerMarker = markerFor(skill);

async function readIfPresent(path) {
  return readFile(path, "utf8").catch((error) => {
    if (error.code === "ENOENT") return undefined;
    throw error;
  });
}

/**
 * Remove a `weft-cli` Skill directory that an earlier version of this
 * package installed next to the new `weft` Skill directory. Only content the
 * package's ownership marker vouches for is removed; a user-owned or
 * user-modified copy stays untouched.
 */
async function removeLegacySkill(skillsRootRelative) {
  const legacyRelative = join(skillsRootRelative, "weft-cli");
  if (await containsSymlink(legacyRelative)) return;
  const legacyDirectory = join(home, legacyRelative);
  const markerPath = join(legacyDirectory, ".weft-cli-owner.json");
  const skillPath = join(legacyDirectory, "SKILL.md");
  const marker = await readIfPresent(markerPath);
  if (marker === undefined) return;
  const legacySkill = await readIfPresent(skillPath);
  if (
    legacySkill !== undefined &&
    marker !== JSON.stringify({ sha256: sha256(legacySkill) })
  ) {
    console.warn(
      `Kept modified legacy Skill at ${skillPath}; remove it manually.`,
    );
    return;
  }
  if (legacySkill !== undefined) await unlink(skillPath);
  await unlink(markerPath);
  await rm(join(legacyDirectory, ".weft-cli-next"), { force: true });
  await rm(join(legacyDirectory, ".weft-cli-backup"), { force: true });
  await rmdir(legacyDirectory).catch((error) => {
    if (error.code !== "ENOTEMPTY") throw error;
    console.warn(
      `Kept non-empty legacy Skill directory at ${legacyDirectory}.`,
    );
  });
}

let installed = 0;
for (const [hostRoot, relativeDirectory] of targets) {
  const directory = join(home, relativeDirectory);
  const markerTarget = join(directory, ".weft-owner.json");
  try {
    if (!(await isDetectedHost(hostRoot))) continue;
    let symlinked = await containsSymlink(relativeDirectory);
    for (const file of [...skillFiles, ".weft-owner.json"]) {
      if (symlinked) break;
      symlinked = await containsSymlink(join(relativeDirectory, file));
    }
    if (symlinked) {
      console.warn(`Skipped symlinked Skill destination: ${directory}`);
      continue;
    }

    const existing = new Map();
    for (const file of skillFiles) {
      existing.set(file, await readIfPresent(join(directory, file)));
    }
    const marker = await readIfPresent(markerTarget);
    if (marker !== undefined) {
      for (const file of skillFiles) {
        await rm(join(dirname(join(directory, file)), `.weft-next-${basename(file)}`), {
          force: true,
        });
      }
    }

    const anyExisting = [...existing.values()].some(
      (content) => content !== undefined,
    );
    const upToDate = skillFiles.every(
      (file) => existing.get(file) === skill.get(file),
    );
    if (upToDate) {
      if (marker !== undefined && marker !== ownerMarker) {
        await writeFile(markerTarget, ownerMarker, {
          encoding: "utf8",
          mode: 0o600,
        });
      }
      await removeLegacySkill(dirname(relativeDirectory));
      continue;
    }

    if (anyExisting) {
      // Every file already on disk must match the hash the ownership marker
      // recorded for it, or the incoming canonical content — the latter is
      // exactly what a crash mid-upgrade leaves behind, so a rerun repairs
      // it. Anything else is user-owned or user-modified and stays.
      let recorded;
      try {
        recorded = marker === undefined ? undefined : JSON.parse(marker).sha256;
      } catch {
        recorded = undefined;
      }
      const packageOwned =
        typeof recorded === "object" &&
        recorded !== null &&
        skillFiles.every((file) => {
          const content = existing.get(file);
          if (content === undefined) return true;
          return (
            recorded[file] === sha256(content) || content === skill.get(file)
          );
        });
      if (!packageOwned) {
        console.warn(
          `Kept existing Skill at ${directory}. Remove it and reinstall @weft-labs/cli to use the weft Skill.`,
        );
        continue;
      }
      // Stage every file first, then rename them all, so a crash never
      // leaves a half-written file and at worst leaves the mixed
      // old/canonical state the ownership check above repairs.
      const staged = [];
      for (const file of skillFiles) {
        const target = join(directory, file);
        await mkdir(dirname(target), { recursive: true });
        const temporary = join(dirname(target), `.weft-next-${basename(file)}`);
        await writeFile(temporary, skill.get(file), {
          encoding: "utf8",
          mode: 0o600,
        });
        staged.push([temporary, target]);
      }
      for (const [temporary, target] of staged) {
        await rename(temporary, target);
      }
    } else {
      await mkdir(directory, { recursive: true });
      await rm(markerTarget, { force: true });
      await writeFile(markerTarget, ownerMarker, {
        encoding: "utf8",
        flag: "wx",
        mode: 0o600,
      });
      try {
        for (const file of skillFiles) {
          const target = join(directory, file);
          await mkdir(dirname(target), { recursive: true });
          await writeFile(target, skill.get(file), {
            encoding: "utf8",
            flag: "wx",
            mode: 0o600,
          });
        }
      } catch (error) {
        await rm(markerTarget, { force: true });
        throw error;
      }
    }

    await writeFile(markerTarget, ownerMarker, {
      encoding: "utf8",
      mode: 0o600,
    });
    installed += 1;
    await removeLegacySkill(dirname(relativeDirectory));
  } catch (error) {
    console.warn(
      `Could not install the Weft Skill at ${directory}: ${error.message}`,
    );
  }
}

console.log(`Installed the Weft Skill for ${installed} detected agent host(s).`);
