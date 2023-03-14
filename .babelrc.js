module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env', { modules: false, loose: true }],
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  };
};
