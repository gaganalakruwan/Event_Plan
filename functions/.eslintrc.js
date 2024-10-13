module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  extends: [ 'eslint:recommended', 'google' ],
  rules: {
    'no-restricted-globals': [ 'error', 'name', 'length' ],
    'prefer-arrow-callback': 'error',
    'quotes': [ 'error', 'single', { allowTemplateLiterals: true } ],
    'indent': [ 'error', 2 ], // Enforce 2-space indentation
    'max-len': [ 'error', { code: 80 } ], // Prevent long lines
    'no-trailing-spaces': [ 'error' ], // No trailing spaces
    'object-curly-spacing': [ 'error', 'always' ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'semi': [ 'error', 'always' ],
  },
  overrides: [
    {
      files: [ '**/*.spec.*' ],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
