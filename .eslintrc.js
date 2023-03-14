module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    browser: true,
  },
  rules: {
    // I disagree
    'react/require-default-props': 'off',
    // Our babel config doesn't use the class properties transform
    'react/state-in-constructor': 'off',
    'react/function-component-definition': ['error', {
      namedComponents: 'function-declaration',
      unnamedComponents: 'arrow-function',
    }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
};
