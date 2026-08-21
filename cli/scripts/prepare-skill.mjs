import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const source = new URL("../../skills/weft-cli/SKILL.md", import.meta.url);
const destination = new URL("../dist/weft-cli-skill/SKILL.md", import.meta.url);

await rm(new URL("../dist/weft-skill", import.meta.url), {
  recursive: true,
  force: true,
});
await rm(new URL("../dist/weft-cli-skill", import.meta.url), {
  recursive: true,
  force: true,
});
await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
await copyFile(source, destination);
