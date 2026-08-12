import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The README seller snippets and the shipped example files are one source.
 *
 * `weft-app` vendors `examples/*.mjs` by digest into the public `/docs` page.
 * If the README could drift from those files, a seller reading the repo and a
 * seller reading weft.network/docs would get different code — the exact
 * failure this test exists to make impossible.
 */

const packageRoot = join(__dirname, "..");

/**
 * Read the fenced code block the README marks for a named example.
 *
 * @param readme - Full README contents
 * @param exampleName - Example file name, e.g. `charge-api.mjs`
 * @returns The code inside the marked fence
 */
function readmeBlockFor(readme: string, exampleName: string): string {
  const start = `<!-- example:${exampleName}:start -->`;
  const end = `<!-- example:${exampleName}:end -->`;
  const startIndex = readme.indexOf(start);
  const endIndex = readme.indexOf(end);
  expect(
    startIndex,
    `README is missing the ${exampleName} start marker`,
  ).toBeGreaterThan(-1);
  expect(
    endIndex,
    `README is missing the ${exampleName} end marker`,
  ).toBeGreaterThan(startIndex);

  const between = readme.slice(startIndex + start.length, endIndex);
  const fence = between.match(/```js\n([\s\S]*?)```/);
  expect(fence, `No js fence between the ${exampleName} markers`).not.toBeNull();
  return (fence as RegExpMatchArray)[1];
}

describe("README seller examples match the shipped example files", () => {
  const readme = readFileSync(join(packageRoot, "README.md"), "utf8");

  it.each(["charge-api.mjs", "charge-api-hono.mjs"])(
    "%s is reproduced verbatim",
    (exampleName) => {
      const shipped = readFileSync(
        join(packageRoot, "examples", exampleName),
        "utf8",
      );
      expect(readmeBlockFor(readme, exampleName)).toBe(shipped);
    },
  );

  it("keeps the buyer and seller key variables apart", () => {
    const seller = readFileSync(
      join(packageRoot, "examples", "charge-api.mjs"),
      "utf8",
    );
    const buyer = readFileSync(
      join(packageRoot, "examples", "quickstart.mjs"),
      "utf8",
    );

    // Both examples land on one generated /docs page. Sharing a variable name
    // there would tell a reader to put a wk_* key where an ax_live_* key
    // belongs.
    expect(seller).toContain("WEFT_SELLER_API_KEY");
    expect(seller).not.toContain("process.env.WEFT_API_KEY");
    expect(buyer).toContain("process.env.WEFT_API_KEY");
    expect(buyer).not.toContain("WEFT_SELLER_API_KEY");
  });
});
