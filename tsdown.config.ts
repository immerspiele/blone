import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  minify: true,
  format: ['cjs', 'esm'],
  entry: [
    './src/index.ts',
    './src/parse.ts',
    './src/render.ts',
    './src/filters.ts',
  ],
});
