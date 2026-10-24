const typescript = require('@rollup/plugin-typescript')
const tsconfig = require('../tsconfig.json')
const pluginNodeResolve = require("@rollup/plugin-node-resolve")
const pluginCommonjs = require("@rollup/plugin-commonjs")

tsconfig.compilerOptions.sourceMap = false
tsconfig.compilerOptions.removeComments = true

module.exports = {
    output: {
        format: "umd"
    },
    plugins: [
        typescript(tsconfig),

        // 去掉TS编译头部提示
        (function () {
            return {
                transform(code) {
                    // 正则：匹配 /*  */ 多行注释
                    // [\s\S]*? 匹配任意字符非贪婪；?=*/ 结尾
                    const result = code.replace(/\/\*[\s\S]*?Microsoft Corporation[\s\S]*?\*\//g, "");
                    return {
                        code: result,
                        map: null
                    };
                }
            }
        })(),

        pluginNodeResolve(),
        pluginCommonjs(),

        // 着色器
        (function () {
            return {
                transform(source, path) {
                    if (/\.c$/.test(path)) {
                        return require('./shader-loader.js')(source)
                    } return
                }
            }
        })()
    ]
}
