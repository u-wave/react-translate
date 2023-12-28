import * as fs from 'node:fs';
import babel from '@rollup/plugin-babel';

const meta = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export default {
  input: './src/index.jsx',
  output: [
    {
      format: 'cjs',
      file: meta.main,
      exports: 'named',
      interop: 'esModule',
    },
    { format: 'es', file: meta.module },
  ],

  external: Object.keys(meta.dependencies)
    .concat(Object.keys(meta.peerDependencies))
    .concat(['react/jsx-runtime']),
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
  ],
};
