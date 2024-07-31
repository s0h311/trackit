// @ts-check

import esbuild from "esbuild";
import { copyFile } from "node:fs/promises";

const result = await esbuild.build({
  entryPoints: ["./app/pages/index.ts"],
  bundle: true,
  outdir: "./dist",
  tsconfig: "./tsconfig.json",
  format: "esm",
  splitting: true,
  // minify: true,
});

await copyFile("./app/pages/index.html", "./dist/index.html");

console.log(result);
