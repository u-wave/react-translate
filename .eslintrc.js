module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
  },
  rules: {
    // I disagree
    'react/jsx-filename-extension': 'off',
    // I disagree
    'react/require-default-props': 'off',
    // Our babel config doesn't use the class properties transform
    'react/state-in-constructor': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
