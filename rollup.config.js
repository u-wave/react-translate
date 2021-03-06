import babel from '@rollup/plugin-babel';

const meta = require('./package.json');

process.env.BABEL_ENV = 'rollup';

export default {
  input: './src/index.js',
  output: [
    {
      format: 'cjs',
      file: meta.main,
      exports: 'named',
      interop: false,
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
