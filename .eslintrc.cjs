module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:storybook/recommended',
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module',
        'project': ['./tsconfig.json', './tsconfig.node.json'],
        'tsconfigRootDir': __dirname,
    },
    'plugins': [
        '@typescript-eslint',
        'react'
    ],
    'rules': {
       'react/react-in-jsx-scope': 'off',
       'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.ts', '.tsx'] }],
       'react/jsx-uses-react': 'error',
       'react/jsx-uses-vars': 'error',
       '@typescript-eslint/no-non-null-assertion': 'off',
      }
}
