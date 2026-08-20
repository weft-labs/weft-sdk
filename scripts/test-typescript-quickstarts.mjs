import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";
import { spawn } from "node:child_process";

const repositoryRoot = new URL("..", import.meta.url);
const sdkDirectory = new URL("../typescript/", import.meta.url);
const cliDirectory = new URL("../cli/", import.meta.url);
const temporaryDirectory = await mkdtemp(
  join(tmpdir(), "weft-sdk-quickstart-"),
);

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
  await run("pnpm", ["pack", "--pack-destination", temporaryDirectory], {
    cwd: sdkDirectory,
  });
  await run("pnpm", ["pack", "--pack-destination", temporaryDirectory], {
    cwd: cliDirectory,
  });
  const archives = (await readdir(temporaryDirectory)).filter((name) =>
    name.endsWith(".tgz"),
  );
  const sdkArchive = join(
    temporaryDirectory,
    archives.find((name) => name.includes("sdk")),
  );
  const cliArchive = join(
    temporaryDirectory,
    archives.find((name) => name.includes("cli")),
  );

  await writeFile(
    join(temporaryDirectory, "package.json"),
    JSON.stringify({
      name: "weft-artifact-consumer",
      private: true,
      dependencies: {
        "@weft-labs/cli": `file:${cliArchive}`,
        "@weft-labs/sdk": `file:${sdkArchive}`,
      },
      pnpm: {
        onlyBuiltDependencies: ["@weft-labs/cli"],
        overrides: {
          "@weft-labs/sdk": `file:${sdkArchive}`,
        },
      },
    }),
  );

  const skillHome = join(temporaryDirectory, "skill-home");
  await run("pnpm", ["install"], {
    cwd: temporaryDirectory,
    env: { ...process.env, HOME: skillHome, USERPROFILE: "" },
  });

  const publicSkill = await readFile(
    new URL("../skills/weft/SKILL.md", import.meta.url),
    "utf8",
  );
  for (const destination of [
    ".agents/skills/weft/SKILL.md",
    ".claude/skills/weft/SKILL.md",
    ".cursor/skills/weft/SKILL.md",
    ".cline/skills/weft/SKILL.md",
    ".config/opencode/skills/weft/SKILL.md",
    ".openclaw/skills/weft/SKILL.md",
    ".hermes/skills/weft/SKILL.md",
  ]) {
    if (
      (await readFile(join(skillHome, destination), "utf8")) !== publicSkill
    ) {
      throw new Error(`Packed CLI did not install ${destination}`);
    }
  }

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
    "@weft-labs",
    "sdk",
  );
  const installedCli = join(
    temporaryDirectory,
    "node_modules",
    "@weft-labs",
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
    requests.length !== 4 ||
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
  const sdkDependency = cliPackageJson.dependencies?.["@weft-labs/sdk"];
  if (!/^\d+\.\d+\.\d+$/.test(sdkDependency)) {
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
