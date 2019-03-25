module.exports = {
  'globals': {
    "Fusion": true
  },
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
    'jquery': true,
    'commonjs': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    "parser": "babel-eslint",
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    "babel",
    "vue"
  ],
  'rules': {
    // 2个空格缩进
    'indent': ['error', 4],

    // 双引号错误提示
    'quotes': [
      'warn',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],

    // 空格和tab混用
    'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],

    // 空语句块
    'no-empty': ['error', {
      'allowEmptyCatch': true // 允许catch语句中空语句
    }],

    // 变量声明后出现空行
    // "newline-after-var": ["warn", "always"],

    // 分号
    'semi': ['warn', 'always'],

    // 分号前后是否有空格
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],

    // 没有使用的变量
    'no-unused-vars': ['error', {
      // 不需要检测的变量，支持正则
      "varsIgnorePattern": "React"
    }],

    // 禁止在代码中出现console
    'no-console': ['error', {
      allow: ['warn', 'error', 'dir', 'log']
    }],
    'no-alert': ['warn'],

    // es6 模版字符串中不出现空格
    'template-curly-spacing': ['error', 'never'],

    // 禁止花括号使用空格
    'object-curly-spacing': ['error', 'never', {
      'objectsInObjects': true
    }],

    // 在数组元素的开始盒末尾不使用空格
    'array-bracket-spacing': ['error', 'never'],

    // 在开始注释的地方后出现一个空格
    'spaced-comment': ['error', 'always', {
      'exceptions': ['-', '+', '/']
    }],

    // 构造函数中的super调用
    'constructor-super': 'error',

    // 禁止或强制圆括号内的空格
    'space-in-parens': ['error', 'never'],

    // 要求中缀操作符周围有空格
    'space-infix-ops': 'error',

    // 不允许出现debugger
    "no-debugger": "error",


    // 将对像的属性分行显示
    "object-property-newline": ["error", {
      "allowAllPropertiesOnSameLine": false
    }],

    // 配置对象属性是否自动换行对象个数 >= 2是自动换行
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 3
      },
      "ObjectPattern": {
        "multiline": true
      },
      "ImportDeclaration": "never",
      "ExportDeclaration": {
        "multiline": true,
        "minProperties": 3
      }

    }],

    // 强制数组方括号中使用一致的空格
    "array-bracket-spacing": ["error", "never"],

    // 强制数组方法的回调函数中有 return 语句
    "array-callback-return": "error",

    // 要求箭头函数体使用大括号
    "arrow-body-style": "off",

    // 要求箭头函数的参数使用圆括号
    "arrow-parens": ["error", "as-needed"],

    // 箭头函数前后有空格
    "arrow-spacing": "error",

    // 箭头函数体是否换行
    "implicit-arrow-linebreak": ["error", "beside"],

    // 强制把变量的使用限制在其定义的作用域范围内
    "block-scoped-var": "warn",

    // 强制在单行代码块使用一致的空格
    "block-spacing": ["error"],

    // 强制在代码块中使用一致的大括号风格
    "brace-style": ["error", "1tbs", {
      "allowSingleLine": true
    }],

    // 强制使用骆驼拼写法命名约定
    "camelcase": ["error", {
      properties: "never"
    }],

    // 强制或禁止一个注释的第一个字母大写
    "capitalized-comments": "off",
    "class-methods-use-this": "off",

    // 要求或禁止末尾逗号
    "comma-dangle": "error",

    // 强制在逗号前后使用一致的空格
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],

    // 强制使用一致的逗号风格
    "comma-style": ["error", "last"],

    // 此规则目的在于通过在项目中设置一个圈复杂度阈值来控制代码的复杂度
    //"complexity": ["warn", 10],

    // 强制在计算的属性的方括号中使用一致的空格
    "computed-property-spacing": ["error", "never"],

    //要求 return 语句要么总是指定返回的值，要么不指定
    //"consistent-return": ["error", { "treatUndefinedAsUnspecified": true }],

    // 当获取当前执行环境的上下文时，强制使用一致的命名
    "consistent-this": "off",

    // 要求在构造函数中有 super() 的调用
    "constructor-super": "error",

    // 强制所有控制语句使用一致的括号风格
    "curly": ["error", "all"],

    // 要求 switch 语句中有 default 分支
    "default-case": "off",

    // 强制在点号之前和之后一致的换行
    "dot-location": ["error", "property"],

    // 要求使用 === 和 !==
    "eqeqeq": ["error", "always", {
      "null": "ignore"
    }],

    // enforce “for” loop update clause moving the counter in the right direction.
    "for-direction": "off",
    "func-call-spacing": ["error", "never"],
    "func-name-matching": "off",
    "func-style": "off",
    "generator-star-spacing": ["error", {
      "before": false,
      "after": true
    }],

    // require语句放在一个文件的首部
    // "global-require": "warn",
    "guard-for-in": "warn",
    "handle-callback-err": "off",
    "id-blacklist": "off",
    "id-length": "off",
    "id-match": "off",
    "indent-legacy": "off",
    "init-declarations": "warn",
    "jsx-quotes": ["error", "prefer-double"],

    // 对象的字面量和值之间有空格
    "key-spacing": ["error", {
      "beforeColon": false,
      "afterColon": true
    }],
    "keyword-spacing": "error", // 在关键字前后有空格 if  function

    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxEOF": 0
    }],


    // 禁止在返回语句中赋值，如果需要使用使用括号将表达式括起来
    "no-return-assign": ["error", "except-parens"],

    "no-trailing-spaces": "error",


    // 禁止不必要的转义
    "no-useless-escape": "error",

    // disallow renaming import, export, and destructured assignments to the same name
    "no-useless-rename": "error",

    // "no-useless-return": "error",
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never"
    }],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": "error",
    "spaced-comment": ["error", "always"],

    "yield-star-spacing": ["error", "after"],

  }
};
