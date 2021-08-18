module.exports = {
  parser: `@babel/eslint-parser`,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    `ghost`,
    `react`,
    `promise`,
    `import`,
  ],
  extends: [
    `plugin:ghost/node`,
    `plugin:react/recommended`,
    `plugin:promise/recommended`,
    `eslint:recommended`,
  ],
  settings: {
    react: {
      version: `detect`,
    },
    propWrapperFunctions: [`forbidExtraProps`],
  },
  env: {
    node: true,
  },
  rules: {
    "ghost/sort-imports-es6-autofix/sort-imports-es6": 0,
    "no-console": `off`,
    indent: [
      `error`, 2,
    ],
    "no-inner-declarations": `off`,
    "valid-jsdoc": `off`,
    "require-jsdoc": `off`,
    quotes: [
      `error`, `backtick`,
    ],
    "consistent-return": [`error`],
    "arrow-body-style": [
      `error`,
      `as-needed`, {
        requireReturnForObjectLiteral: true,
      },
    ],
    "jsx-quotes": [
      `error`, `prefer-double`,
    ],
    semi: [
      `error`, `never`,
    ],
    "object-curly-spacing": [
      `error`, `always`,
    ],
    "comma-dangle": [
      `error`, {
        arrays: `always-multiline`,
        objects: `always-multiline`,
        imports: `always-multiline`,
        exports: `always-multiline`,
        functions: `ignore`,
      },
    ],
    "react/display-name": `off`,
    "react/prop-types": [
      `warn`, {
        ignore: [`children`],
      },
    ],
  },
}
