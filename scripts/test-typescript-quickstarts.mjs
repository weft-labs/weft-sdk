import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { delimiter, join, resolve } from "node:path";
import { spawn } from "node:child_process";

const repositoryRoot = new URL("..", import.meta.url);
const sdkDirectory = new URL("../typescript/", import.meta.url);
const cliDirectory = new URL("../cli/", import.meta.url);
const temporaryDirectory = await mkdtemp(
  join(tmpdir(), "weft-sdk-quickstart-"),
);
// CI retains these exact archives for the publisher job.
const archiveDirectory = process.env.WEFT_PACKAGE_ARCHIVES
  ? resolve(process.env.WEFT_PACKAGE_ARCHIVES)
  : temporaryDirectory;

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "pipe",
      ...options,
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(
          new Error(
            `${command} ${args.join(" ")} exited ${code}\n${stdout}${stderr}`,
          ),
        );
      }
    });
  });
}

const requests = [];
const server = createServer(async (request, response) => {
  let body = "";
  for await (const chunk of request) body += chunk;
  requests.push({
    method: request.method,
    url: request.url,
    authorization: request.headers.authorization,
    body,
  });

  response.setHeader("content-type", "application/json");
  if (request.url === "/api/v1/me") {
    response.end(
      JSON.stringify({
        data: {
          principal_type: "user",
          id: 1,
          email: "developer@example.com",
        },
      }),
    );
    return;
  }
  if (request.url === "/api/v1/search") {
    response.end(
      JSON.stringify({
        query_trace_id: "quickstart-trace",
        query: "weather data API",
        embedder_model: "fixture",
        candidates_considered: 0,
        warnings: [],
        results: [],
      }),
    );
    return;
  }
  response.statusCode = 404;
  response.end(JSON.stringify({ error: "not found" }));
});

try {
  await mkdir(archiveDirectory, { recursive: true });
  await run("pnpm", ["pack", "--pack-destination", archiveDirectory], {
    cwd: sdkDirectory,
  });
  await run("pnpm", ["pack", "--pack-destination", archiveDirectory], {
    cwd: cliDirectory,
  });
  const archives = (await readdir(archiveDirectory)).filter((name) =>
    name.endsWith(".tgz"),
  );
  const sdkArchive = join(
    archiveDirectory,
    archives.find((name) => name.includes("sdk")),
  );
  const cliArchive = join(
    archiveDirectory,
    archives.find((name) => name.includes("cli")),
  );

  await writeFile(
    join(temporaryDirectory, "package.json"),
    JSON.stringify({
      name: "weft-artifact-consumer",
      private: true,
      dependencies: {
        "@weftlabs/cli": `file:${cliArchive}`,
        "@weftlabs/sdk": `file:${sdkArchive}`,
      },
      pnpm: {
        overrides: {
          "@weftlabs/sdk": `file:${sdkArchive}`,
        },
      },
    }),
  );

  const hostRoots = [
    ".agents",
    ".claude",
    ".cursor",
    ".cline",
    ".config/opencode",
    ".openclaw",
    ".hermes",
  ];

  async function agentHome(name) {
    const directory = join(temporaryDirectory, name);
    for (const root of hostRoots) {
      await mkdir(join(directory, root), { recursive: true });
    }
    return directory;
  }

  async function assertSkillInstalled(home, label) {
    for (const file of ["SKILL.md", "rules/cli.md"]) {
      const publicSkill = await readFile(
        new URL(`../skills/weft/${file}`, import.meta.url),
        "utf8",
      );
      for (const root of hostRoots) {
        const destination = join(root, "skills", "weft", file);
        const installed = await readFile(join(home, destination), "utf8").catch(
          (error) => {
            if (error.code === "ENOENT") return undefined;
            throw error;
          },
        );
        if (installed !== publicSkill) {
          throw new Error(
            `${label} did not install ${destination} (${
              installed === undefined ? "missing" : "content differs"
            })`,
          );
        }
      }
    }
  }

  const skillHome = await agentHome("skill-home");
  // The quickstart install gets its own pnpm store. Sharing the caller's store
  // would make this gate depend on whether that store is warm, which is state
  // no commit controls.
  await run(
    "pnpm",
    ["install", "--store-dir", join(temporaryDirectory, "pnpm-store")],
    {
      cwd: temporaryDirectory,
      env: { ...process.env, HOME: skillHome, USERPROFILE: "" },
    },
  );

  // Installing the package must not touch the machine on its own. The Skill
  // arrives from `weft skill install` or from the first ordinary command, so
  // no package manager or store state can silently skip it.
  const untouched = await readFile(
    join(skillHome, ".agents", "skills", "weft", "SKILL.md"),
    "utf8",
  ).catch((error) => {
    if (error.code === "ENOENT") return undefined;
    throw error;
  });
  if (untouched !== undefined) {
    throw new Error("Packed CLI installed the Skill from a package hook");
  }

  const weftBinary = join(temporaryDirectory, "node_modules", ".bin", "weft");
  await run(weftBinary, ["skill", "install"], {
    cwd: temporaryDirectory,
    env: { ...process.env, HOME: skillHome, USERPROFILE: "" },
  });
  await assertSkillInstalled(skillHome, "weft skill install");

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Quickstart fixture server did not expose a TCP address");
  }
  const env = {
    ...process.env,
    WEFT_API_KEY: "wk_quickstart_fixture",
    WEFT_BASE_URL: `http://127.0.0.1:${address.port}`,
  };
  const installedPackage = join(
    temporaryDirectory,
    "node_modules",
    "@weftlabs",
    "sdk",
  );
  const installedCli = join(
    temporaryDirectory,
    "node_modules",
    "@weftlabs",
    "cli",
  );

  const nodeResult = await run(
    process.execPath,
    [join(installedPackage, "examples", "quickstart.mjs")],
    { cwd: temporaryDirectory, env },
  );
  const nodeOutput = JSON.parse(nodeResult.stdout);
  if (nodeOutput.account?.principalType !== "user") {
    throw new Error("Packed TypeScript quickstart did not decode account data");
  }

  // The safety net: an ordinary command installs the Skill for a user who
  // never runs `weft skill install`.
  const firstRunHome = await agentHome("first-run-home");
  await run(weftBinary, ["me"], {
    cwd: temporaryDirectory,
    env: { ...env, HOME: firstRunHome, USERPROFILE: "" },
  });
  await assertSkillInstalled(firstRunHome, "first weft command");

  const cliResult = await run(
    "sh",
    [join(installedCli, "examples", "cli-quickstart.sh")],
    {
      cwd: temporaryDirectory,
      env: {
        ...env,
        PATH: `${join(temporaryDirectory, "node_modules", ".bin")}${delimiter}${process.env.PATH ?? ""}`,
      },
    },
  );
  const cliLines = cliResult.stdout.trim().split("\n").map(JSON.parse);
  if (cliLines.length !== 2 || cliLines.some((result) => result.ok !== true)) {
    throw new Error(
      "Packed CLI quickstart did not return two success envelopes",
    );
  }

  if (
    requests.length !== 5 ||
    requests.some(
      (request) => request.authorization !== "Bearer wk_quickstart_fixture",
    )
  ) {
    throw new Error(
      "Packed quickstarts did not authenticate all expected calls",
    );
  }

  const sdkPackageJson = JSON.parse(
    await readFile(join(installedPackage, "package.json"), "utf8"),
  );
  const cliPackageJson = JSON.parse(
    await readFile(join(installedCli, "package.json"), "utf8"),
  );
  if (sdkPackageJson.bin != null) {
    throw new Error("Packed SDK must not expose a CLI binary");
  }
  if (cliPackageJson.bin?.weft !== "./bin/weft.mjs") {
    throw new Error("Packed CLI does not expose the weft binary");
  }
  const sdkDependency = cliPackageJson.dependencies?.["@weftlabs/sdk"];
  if (
    sdkDependency !== sdkPackageJson.version ||
    cliPackageJson.version !== sdkPackageJson.version ||
    sdkPackageJson.name !== "@weftlabs/sdk" ||
    cliPackageJson.name !== "@weftlabs/cli" ||
    Object.keys(cliPackageJson.dependencies).some((name) =>
      name.startsWith("@weft-labs/"),
    )
  ) {
    throw new Error(
      `Packed CLI leaked a non-registry SDK dependency: ${sdkDependency}`,
    );
  }
  console.log(
    `Packed quickstarts passed for ${sdkPackageJson.name}@${sdkPackageJson.version} and ${cliPackageJson.name}@${cliPackageJson.version}.`,
  );
} finally {
  await new Promise((resolve) => server.close(resolve));
  await rm(temporaryDirectory, { recursive: true, force: true });
}
