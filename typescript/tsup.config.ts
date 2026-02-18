import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    server: "src/server.ts",
    "facilitator/index": "src/facilitator/index.ts",
    "facilitator/middleware/index": "src/facilitator/middleware/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".js",
      dts: format === "esm" ? ".d.mts" : ".d.ts",
    };
  },
});
