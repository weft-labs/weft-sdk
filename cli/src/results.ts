import { chmod, lstat, mkdir, mkdtemp, open, realpath } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";

export async function reserveResultDirectory(
  env: Record<string, string | undefined>,
): Promise<string> {
  const root = resolve(
    env.WEFT_RESULTS_DIR ||
      join(env.HOME || env.USERPROFILE || homedir(), ".weft-results"),
  );
  await mkdir(root, { recursive: true, mode: 0o700 });
  const stat = await lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink()) {
    throw new Error(
      "The result storage root must be a directory, not a symlink",
    );
  }
  if (
    process.platform !== "win32" &&
    ((stat.mode & 0o022) !== 0 || stat.uid !== process.getuid?.())
  ) {
    throw new Error(
      "The result storage root must be owned by this user and not writable by others",
    );
  }
  // A private child keeps payloads protected without changing an existing parent.
  const directory = await mkdtemp(join(await realpath(root), "result-"));
  await chmod(directory, 0o700);
  return directory;
}

export async function writeResultFile(
  path: string,
  contents: string | Buffer,
): Promise<void> {
  const file = await open(path, "wx", 0o600);
  try {
    await file.chmod(0o600);
    await file.writeFile(contents);
    await file.sync();
  } finally {
    await file.close();
  }
}

export function readableBody(
  bytes: Buffer,
  headers: Record<string, string>,
): {
  media_type: string | null;
  body_encoding: "utf-8" | "file";
  body?: string;
} {
  const header = (name: string) =>
    Object.entries(headers).find(([key]) => key.toLowerCase() === name)?.[1];
  const contentType = header("content-type")?.toLowerCase() ?? "";
  const mediaType = contentType.split(";", 1)[0].trim();
  const charset = /(?:^|;)\s*charset\s*=\s*"?([^;"\s]+)/.exec(contentType)?.[1];
  const encoding = header("content-encoding")?.trim().toLowerCase();
  const file = {
    media_type: mediaType || null,
    body_encoding: "file" as const,
  };
  const textual =
    mediaType.startsWith("text/") ||
    /^application\/(?:json|xml|javascript|x-ndjson|x-www-form-urlencoded|[^;]+\+(?:json|xml))$/.test(
      mediaType,
    );
  if (
    (encoding && encoding !== "identity") ||
    (charset && !["utf-8", "utf8", "us-ascii"].includes(charset)) ||
    (!textual && !(bytes.length === 0 && !mediaType))
  )
    return file;
  try {
    // Keep a UTF-8 BOM and JSON spelling exactly as delivered.
    const body = new TextDecoder("utf-8", {
      fatal: true,
      ignoreBOM: true,
    }).decode(bytes);
    return { media_type: mediaType || null, body_encoding: "utf-8", body };
  } catch {
    return file;
  }
}
