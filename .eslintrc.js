module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier', 'only-warn'],
  // add your custom rules here
  rules: {
    'max-len': ['warn', { code: 120 }],
    'comma-dangle': ['warn', 'never']
  }
}
