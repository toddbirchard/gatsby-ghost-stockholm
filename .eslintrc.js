module.exports = {
  parser: `@babel/eslint-parser`,
  parserOptions: {
    ecmaVersion: `latest`,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: [
    `react`,
    `promise`,
    `import`,
    `graphql`
  ],
  extends: [
    `plugin:react/recommended`,
    `plugin:promise/recommended`,
    `eslint:recommended`,
  ],
  settings: {
    react: {
      createClass: `createReactClass`,
      pragma: `React`,
      version: `17.0.2`,
      flowVersion: `0.53`,
    },
    propWrapperFunctions: [`forbidExtraProps`],
  },
  env: {
    node: true,
  },
  rules: {
    "ghost/sort-imports-es6-autofix/sort-imports-es6": 0,
    "no-console": `off`,
    skipBlankLines: 0,
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
    semi: [
      `error`, `never`,
    ],
    "object-curly-spacing": [
      `warn`, `always`,
    ],
    "max-lines": `off`,
    "arrow-parens": `off`,
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
