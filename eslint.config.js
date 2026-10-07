import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import globals from 'globals'
export default [
  { ignores: ['dist/**', '.astro/**', 'src/astro_tmp_pages_*/**', 'node_modules/**'] },
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  ...vue.configs['flat/recommended'],
  { rules: { 'vue/max-attributes-per-line': ['warn', { singleline: 3, multiline: 1 }] } },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  { files: ['src/env.d.ts'], rules: { '@typescript-eslint/triple-slash-reference': 'off' } },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.vue'] }
    }
  },
  { files: ['**/*.astro'], languageOptions: { parserOptions: { parser: tseslint.parser } } }
]
