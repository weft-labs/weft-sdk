import { copyFile, mkdir, rm } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { skillFiles } from "./skill-paths.mjs";

await rm(new URL("../dist/weft-skill", import.meta.url), {
  recursive: true,
  force: true,
});
await rm(new URL("../dist/weft-cli-skill", import.meta.url), {
  recursive: true,
  force: true,
});
for (const file of skillFiles) {
  const source = new URL(`../../skills/weft/${file}`, import.meta.url);
  const destination = new URL(`../dist/weft-skill/${file}`, import.meta.url);
  await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
  await copyFile(source, destination);
}
