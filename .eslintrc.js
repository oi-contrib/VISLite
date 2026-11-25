module.exports = {

    //定义ESLint的解析器
    parser: '@typescript-eslint/parser',

    //定义文件继承的子规范
    extends: ['plugin:@typescript-eslint/recommended'],

    //定义了该eslint文件所依赖的插件
    plugins: ['@typescript-eslint'],

    //指定代码的运行环境
    env: {
        browser: true,
        node: false
    },

    // 设置规则
    rules: {
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        // 历史 API（install、渐变工厂等）大量使用 Function 作为回调类型，保持对外签名不变
        "@typescript-eslint/no-unsafe-function-type": "off",
        // 允许未使用的函数参数与 catch 变量（兼容各端差异实现）
        "@typescript-eslint/no-unused-vars": ["error", {
            "args": "none",
            "caughtErrors": "none",
            "ignoreRestSiblings": true
        }],
        "@typescript-eslint/no-this-alias": ["error", {
            "allowedNames": ["_this"]
        }]
    }
}