module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    ignorePatterns: ['**/*.js'],
    env: {
        jest: true,
        node: true,
    },
    rules: {
        'no-undef': 'error',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prefer-destructuring': ['warn', { array: true, object: true }],
        '@typescript-eslint/explicit-function-return-type': 'warn',
    },
}
