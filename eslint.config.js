import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  ...tseslint.configs.recommended, // TypeScript ESLint recommended rules
  ...eslintPluginAstro.configs['flat/recommended'], // Astro plugin recommended rules
  ...eslintPluginVue.configs['flat/recommended'], // Vue plugin recommended rules
  {
    languageOptions: {
      globals: {
        ...globals.browser
        // Add other globals if needed, e.g., Node.js globals for server-side code
      },
      parser: tseslint.parser, // Default parser for JS/TS files
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // Specify your tsconfig.json if using TypeScript
        extraFileExtensions: ['.vue', '.astro'] // Allow parsing .vue and .astro files
      }
    }
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser, // Use Astro parser for .astro files
      parserOptions: {
        parser: tseslint.parser // Use TypeScript parser within Astro files
      }
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueEslintParser, // Use Vue parser for .vue files
      parserOptions: {
        parser: tseslint.parser // Use TypeScript parser within Vue files
      }
    }
  }
  // Add custom rules or overrides as needed
]

// export default [
//   // add more generic rule sets here, such as:
//   // js.configs.recommended,
//   ...eslintPluginAstro.configs.recommended,
//   {
//     rules: {
//       // override/add rules settings here, such as:
//       // "astro/no-set-html-directive": "error"
//     }
//   }
// ];
