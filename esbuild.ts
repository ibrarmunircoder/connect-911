import * as fs from 'fs';
import * as path from 'path';
import * as esbuild from 'esbuild';

const functionsDir = 'src/functions';
const outDir = 'dist';
const entryPoints = fs
  .readdirSync(path.join(__dirname, functionsDir))
  .map((entry) => `${functionsDir}/${entry}/index.ts`);

esbuild.build({
  entryPoints: entryPoints,
  bundle: true,
  outdir: path.join(__dirname, outDir),
  outbase: 'src',
  platform: 'node',
  tsconfig: './tsconfig.json',
});
