module.exports = {
  extends: [
    'airbnb-typescript',
  ],
  rules: {
    '@typescript-eslint/ban-types': 0,
    'prettier/prettier': 0,
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 0,
    'import/order': 0,
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/alt-text': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-use-before-define': 0,
    'prefer-template': 2,
    'prefer-destructuring': 0,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 0,
    'react/button-has-type': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/jsx-first-prop-new-line': 0,
    'react/jsx-max-props-per-line': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'react/prop-types': 1,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/no-array-index-key': 0,
    'react/static-property-placement': 0,
    'react/display-name': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-curly-newline': 0,
    'require-yield': 0,
    'linebreak-style': 0,
    'arrow-parens': 0,
    'arrow-body-style': 0,
    'object-curly-newline': 0,
    'function-call-argument-newline': 0,
    'brace-style': 0,
    'no-trailing-spaces': 0,
    'no-alert': 0,
    'keyword-spacing': 0,
    'eol-last': 0,
    'global-require': 0,
    'quote-props': 0,
    'object-curly-spacing': 0,
    'object-property-newline': 0,
    'default-case': 0,
    'comma-dangle': 0,
    'operator-linebreak': 0,
    'no-return-await': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    '@typescript-eslint/no-unused-expressions': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/brace-style': 0,
    'no-param-reassign': 1,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'app/'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  'ignorePatterns': [
    '**/*.svg',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.png',
    '**/*.json',
  ],
};
