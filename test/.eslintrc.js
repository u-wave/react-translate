module.exports = {
  extends: '../.eslintrc.js',
  env: {
    mocha: true,
  },
  rules: {
    // We have good reasons to do it
    'react/jsx-props-no-spreading': 'off',
  },
};
