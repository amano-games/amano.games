/* eslint filenames/match-regex: 0 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'filenames', 'react-hooks'],
  rules: {
    'arrow-body-style': 0,
    'no-console': 0,

    'import/prefer-default-export': 'off',
    'filenames/match-exported': [2, ['kebab']],
    'filenames/match-regex': [2, '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$', true],
    'jsx-a11y/anchor-is-valid': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['./'],
      },
    },
  },
};
