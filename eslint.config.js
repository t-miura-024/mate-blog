// @ts-check
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist/', 'coverage/', 'storybook-static/', '.astro/', 'node_modules/'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: {
          allowDefaultProject: ['.storybook/*.ts'],
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 10,
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // oxlint でカバー済みの構文ベースルールは eslint 側で off（重複回避）
      'no-console': 'off',
      eqeqeq: 'off',
      'no-var': 'off',
      'prefer-const': 'off',
      curly: 'off',
      'no-param-reassign': 'off',
      'object-shorthand': 'off',
      'no-duplicate-imports': 'off',
      'no-throw-literal': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-restricted-imports': 'off',

      // 型情報依存ルール（typescript-eslint が担う責務）
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
          allowIIFEs: false,
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: true,
        },
      ],
      '@typescript-eslint/require-await': 'error',

      // oxlint で担えない構文・意味的ルール（eslint が担う）
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
        { selector: 'parameter', format: ['camelCase', 'PascalCase'], leadingUnderscore: 'allow' },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase'] },
        { selector: 'method', format: ['camelCase'], leadingUnderscore: 'allow' },
        // 外部 I/F のキー名はリネーム不可のため property はチェックしない
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'IfStatement[alternate]',
          message: 'else禁止: early return / 三項演算子 / テーブル駆動で記述してください',
        },
        {
          selector: 'SwitchStatement',
          message: 'switch禁止: if連鎖 / オブジェクトマップで記述してください',
        },
        { selector: 'WhileStatement', message: 'while禁止: for-of / 再帰で記述してください' },
        { selector: 'DoWhileStatement', message: 'do-while禁止: while同様に置換してください' },
        {
          selector: 'ClassDeclaration',
          message: 'class禁止: type + 関数ファクトリで記述してください',
        },
        {
          selector: 'ClassExpression',
          message: 'class禁止: type + 関数ファクトリで記述してください',
        },
      ],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    // JS 系ファイル（設定ファイル等）は型チェック対象外
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {},
  },
  {
    files: ['*.config.*', 'vitest.setup.ts', '.storybook/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
  {
    // Storybook の viteFinal は公式イディオムで引数変異・async を使うため緩和
    files: ['.storybook/**/*.ts'],
    rules: {
      '@typescript-eslint/require-await': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/naming-convention': 'off',
      'no-restricted-syntax': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
);
