import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' },  // React 버전을 명시하여 호환성을 높임
      'import/resolver': {
        node: {
          paths: ['node_modules'],
          extensions: ['.js', '.jsx'],  // .jsx 확장자를 명시적으로 추가
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off',  // prop-types 규칙을 비활성화하여 경고 제거
      'no-unused-vars': [
        'warn',
        { varsIgnorePattern: '^React$', argsIgnorePattern: '^_' },  // 사용하지 않는 React 및 인자 경고 무시
      ],
    },
  },
];
