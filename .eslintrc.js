module.exports = {
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    plugins: ['eslint-plugin-react-compiler'],
    rules: {
        'react-compiler/react-compiler': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                argsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
            },
        ],
    },
}
