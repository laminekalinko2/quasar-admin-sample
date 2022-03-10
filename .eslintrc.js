module.exports = {
   root: true,
   env: {
      node: true,
   },
   plugins: ['@typescript-eslint'],
   extends: ['plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-essential', 'prettier'],
   parser: 'vue-eslint-parser',
   parserOptions: {
      parser: '@typescript-eslint/parser',
   },
   rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      semi: 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/semi': ['error'],
      indent: ['error', 3],
      'vue/html-indent': [
         'error',
         3,
         {
            baseIndent: 1,
            switchCase: 1,
            ignores: [],
         },
      ],
      'vue/script-indent': [
         'error',
         3,
         {
            baseIndent: 0,
            switchCase: 1,
            ignores: [],
         },
      ],
      'vue/max-len': [
         'error',
         {
            code: 120,
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: false,
            ignoreStrings: true,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: false,
            ignoreHTMLAttributeValues: false,
            ignoreHTMLTextContents: true,
         },
      ],
      'max-len': [
         'error',
         {
            code: 120,
            ignoreComments: false,
            ignoreTrailingComments: false,
            ignoreUrls: false,
            ignoreStrings: true,
            ignoreTemplateLiterals: false,
            ignoreRegExpLiterals: false,
         },
      ],
      'vue/max-attributes-per-line': [
         'error',
         {
            singleline: {
               max: 2,
            },
            multiline: {
               max: 1,
            },
         },
      ],
      'vue/first-attribute-linebreak': [
         'error',
         {
            singleline: 'ignore',
            multiline: 'below',
         },
      ],
      'vue/new-line-between-multi-line-property': [
         'error',
         {
            minLineOfMultilineProperty: 2,
         },
      ],
      'vue/attribute-hyphenation': [
         'error',
         'always',
         {
            ignore: [],
         },
      ],
      'vue/html-closing-bracket-spacing': [
         'error',
         {
            selfClosingTag: 'always',
         },
      ],
      'vue/singleline-html-element-content-newline': [
         'error',
         {
            ignoreWhenNoAttributes: true,
            ignoreWhenEmpty: true,
         },
      ],
      'vue/html-closing-bracket-newline': [
         'error',
         {
            singleline: 'never',
            multiline: 'always',
         },
      ],
   },
   globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly',
   },
};
