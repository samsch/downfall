module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: '2018',
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'array-callback-return': 'warn',
    'eqeqeq': ["error", "always", {"null": "ignore"}],
    'no-empty-function': 'warn',
    'no-eval': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-this': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-return': 'warn',
    'no-void': 'error',
    'no-warning-comments': 'warn',
    'no-with': 'error',
    'prefer-promise-reject-errors': 'error',
    'no-shadow-restricted-names': 'error',
    'no-use-before-define': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-rename': 'error',
    'no-var': 'error',
    'prefer-const': 'error',

    "react/prop-types": ['error', { skipUndeclared: true }],
    'react/jsx-boolean-value': ['error', 'never', { always: [] }],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': ['error', {
      allowAllCaps: true,
      ignore: [],
    }],
    'react/no-deprecated': ['error'],
    'react/no-direct-mutation-state': 'off',
    'react/no-is-mounted': 'error',
    'react/no-multi-comp': ['error', { ignoreStateless: true }],
    'react/no-string-refs': 'error',
    'react/prefer-stateless-function': ['error', { ignorePureComponents: true }],
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-comp': ['error', {
      order: [
        'static-methods',
        'instance-variables',
        'lifecycle',
        '/^on.+$/',
        'getters',
        'setters',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'instance-methods',
        'everything-else',
        'rendering',
      ],
      groups: {
        lifecycle: [
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
          'mixins',
          'statics',
          'defaultProps',
          'constructor',
          'getDefaultProps',
          'getInitialState',
          'state',
          'getChildContext',
          'componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'componentDidUpdate',
          'componentWillUnmount',
        ],
        rendering: [
          '/^render.+$/',
          'render'
        ],
      },
    }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-no-comment-textnodes': 'error',
    'react/no-unused-prop-types': ['error', {
      customValidators: [
      ],
      skipShapeProps: true,
    }],
    'react/void-dom-elements-no-children': 'error',
    'react/no-unused-state': 'error',
    'react/no-typos': 'error',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'error',
    'react/button-has-type': ['error', {
      button: true,
      submit: true,
      reset: false,
    }],
    'react/no-this-in-sfc': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/no-unsafe': 'off',
    
    
    // style rules
    'semi': ['error', 'always'],
    'wrap-iife': ['warn', 'inside'],
    'space-before-function-paren': 'warn',
    'no-trailing-spaces': 'error',
    'quotes': ["warn", "single"],
    'arrow-spacing': 'warn',
  },
};
