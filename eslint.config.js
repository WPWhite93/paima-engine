const { FlatCompat } = require('@eslint/eslintrc');
const typescriptEslintEslintPlugin = require('@typescript-eslint/eslint-plugin');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginPromise = require('eslint-plugin-promise');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const typescriptEslintParser = require('@typescript-eslint/parser');
// const nxPlugin = require('@nx/eslint-plugin'); // broken until Nx updates their eslint version
const js = require('@eslint/js');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.extends(
    'airbnb-typescript',
    'plugin:require-extensions/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'prettier'
  ),
  {
    plugins: {
      typescriptEslintEslintPlugin,
      import: eslintPluginImport,
      promise: eslintPluginPromise,
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      // '@nx': nxPlugin // broken until Nx updates their eslint version
    },
  },
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: './packages/*/*/tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        ecmaFeatures: { legacyDecorators: true },
      },
    },
  },
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['@paima/**/src/*'],
          message: "When importing from @paima packages, always use public exports instead of reaching into internals of a package using /src/ otherwise it can lead to module duplication and extremely subtle bugs."
        }]
      }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: null,
          leadingUnderscore: 'allow',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/return-await': ['error', 'always'],
      '@typescript-eslint/explicit-function-return-type': 'error',
      'func-names': 'off',
      'new-cap': 'off',
      'arrow-parens': ['off'],
      'consistent-return': 'off',
      'comma-dangle': 'off',
      'generator-star-spacing': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-dynamic-require': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/prefer-default-export': 'off',
      'import/order': 'off',
      'lines-between-class-members': 'off',
      '@typescript-eslint/lines-between-class-members': 'off',
      'no-else-return': 'off',
      'no-lonely-if': 'off',
      'no-multiple-empty-lines': 'off',
      'no-multi-spaces': 'off',
      'no-restricted-globals': 'off',
      'no-restricted-syntax': 'off',
      'no-return-await': 'off',
      'no-use-before-define': 'off',
      'no-useless-return': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 0,
      'prefer-destructuring': 0,
      'promise/param-names': 2,
      'promise/always-return': 2,
      'promise/catch-or-return': 2,
      'promise/no-native': 0,
      'react/button-has-type': 1,
      'react/destructuring-assignment': 0,
      'react/no-array-index-key': 1,
      'react/jsx-no-bind': 'off',
      'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
      'react/jsx-closing-bracket-location': 1,
      'react/jsx-one-expression-per-line': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/prefer-stateless-function': 'off',
      'react/no-unused-prop-types': 'off',
      'react/prop-types': 0,
      'react/require-default-props': 0,
      'react/sort-comp': 0,
      'react/static-property-placement': ['warn', 'static public field'],
      'react/state-in-constructor': ['warn', 'never'],
      'react/jsx-props-no-spreading': 0,
      'react/jsx-curly-newline': 0,
      'class-methods-use-this': 0,
      'no-continue': 0,
      'no-duplicate-imports': 0,
      'no-param-reassign': 0,
      'no-plusplus': 0,
      'no-bitwise': 0,
      'no-underscore-dangle': 0,
      'no-console': 1,
      'no-mixed-operators': 0,
      'no-multi-assign': 0,
      'no-unneeded-ternary': ['error', { defaultAssignment: true }],
      'un-undef-init': 0,
      'no-void': ['error', { allowAsStatement: true }],
      'prefer-template': 0,
      'no-trailing-spaces': 1,
      'padded-blocks': 0,
      'arrow-body-style': 0,
      'key-spacing': 1,
      'no-empty-function': 0,
      'no-useless-escape': 1,
      'prefer-const': 'off',
      'spaced-comment': 1,
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: true,
        },
      ],
      'import/imports-first': 1,
      'react/jsx-indent': 1,
      'global-require': 'off',
      'no-await-in-loop': 0,
      'no-unused-expressions': 0,
      'no-lone-blocks': 0,
      'max-classes-per-file': 0,
    },
  },
  {
    ignores: [
      // this is a bit overly aggressive, since all we really want to do is turnoff typescript rules for non-ts files
      // but we can't do this until typescript-eslint updates to flat config (https://github.com/typescript-eslint/typescript-eslint/pull/6836)
      '**/*.{js,cjs}',
      'eslint.config.js',
      'packages/admin-panel/**',
      'tools',
      '**/*.d.ts',
      '**/*.queries.ts',
      // Assets bundled into executable - meant to be used in standalone context so issues in paima-engine repository are irrelevant (eg. missing node_modules)
      '**/packaged',
      '**/dist',
      '**/build',
      '**/lib',
      '**/*.tsbuildinfo',
    ],
  },
];
