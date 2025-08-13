import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'], plugins: { js, '@stylistic': stylistic }, extends: ['js/recommended'], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    pluginVue.configs['flat/essential'],
    {
        rules: {
            'vue/multi-word-component-names': ['off'],
        },
    },
    { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
    stylistic.configs.customize({
        indent: 4,
        quotes: 'single',
        semi: true,
    }),
]);
