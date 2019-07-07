/*
 * @Author: dyr
 * @Description: eslint+prettier规则配置
 * @Date: 2019-06-08 15:42:19
 * @LastEditors: dyr
 * @LastEditTime: 2019-07-07 13:54:18
 */

module.exports = {
    extends: [
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
      'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
      'plugin:vue/essential'
    ],
    parserOptions: {
      jsx: true,
      useJSXTextNode: true,
      ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    globals: {
      // 这里填入你的项目需要的全局变量
    },
    // 自定义eslint规则
    rules: {
      extensions: ['.js', '.jsx', '.tsx', '.vue'],
      // 自定义 prettier 规则
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
        },
      ],
      // 一个缩进必须用两个空格替代
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          flatTernaryExpressions: true,
        },
      ],
      // 禁止使用console
      'no-console': 'error',
      'no-return-assign': 'warn',
      'array-callback-return': 'warn',
      'guard-for-in': 'off',
      'max-len': ['error', { code: 120 }], // 字符串最大长度
      'import/prefer-default-export': 'off',
      'import/no-commonjs': 'off',
      // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
      '@typescript-eslint/class-name-casing': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-interface': 'off',
    },
  };
  