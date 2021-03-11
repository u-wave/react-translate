module.exports = (api) => {
  const isTesting = api.caller((caller) => caller.name === '@babel/register');
  const isBrowserify = api.caller((caller) => caller.name === 'babelify');

  return {
    presets: [
      ['@babel/preset-env', {
        modules: isTesting || isBrowserify ? 'commonjs' : false,
        loose: true,
        targets: isTesting ? { node: 'current' } : null,
      }],
      ['@babel/preset-react', {
        runtime: 'automatic',
      }],
    ],
    plugins: isTesting ? ['istanbul'] : [],
  };
};
