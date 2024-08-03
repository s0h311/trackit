// @ts-check

import esbuild from 'esbuild'
import { copyFile } from 'node:fs/promises'

/**
 * @type {esbuild.BuildOptions}
 */
const options = {
  entryPoints: ['./app/pages/index.ts'],
  bundle: true,
  outdir: './dist',
  tsconfig: './tsconfig.json',
  format: 'esm',
  splitting: true,
  // minify: true
}

const context = await esbuild.context(options)

await copyFile('./app/pages/index.html', './dist/index.html')

await context.watch()
