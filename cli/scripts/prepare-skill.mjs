import { copyFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const source = new URL("../../skills/weft/SKILL.md", import.meta.url);
const destination = new URL("../dist/weft-skill/SKILL.md", import.meta.url);

await mkdir(dirname(fileURLToPath(destination)), { recursive: true });
await copyFile(source, destination);
